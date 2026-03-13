import { randomUUID } from 'node:crypto'

import { NextResponse } from 'next/server'
import { groq } from 'next-sanity'
import type Stripe from 'stripe'
import { z } from 'zod'

import { revalidatePieceTag } from '@/lib/cache'
import { logger } from '@/lib/logger'
import {
  createReservationExpiry,
  isReservationExpired,
  RESERVATION_WINDOW_MINUTES,
} from '@/lib/pieces'
import { rateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/request'
import { getStripeClient } from '@/lib/stripe'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

const MAX_CHECKOUT_ITEMS = 10
const CHECKOUT_RATE_LIMIT = {
  limit: 12,
  windowMs: 10 * 60 * 1000,
} as const

const checkoutRequestSchema = z
  .object({
    productIds: z.array(z.string().trim().min(1).max(128)).min(1).max(20),
  })
  .strict()

type PieceForCheckout = {
  _id: string
  _rev: string
  title: string
  price?: number
  status?: string
  image?: string
  reservationId?: string
  reservationExpiresAt?: string
}

const piecesPricingQuery = groq`
  *[_type == "piece" && _id in $ids]{
    _id,
    _rev,
    title,
    price,
    status,
    reservationId,
    reservationExpiresAt,
    "image": mainImage.asset->url
  }
`

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const ipLimit = rateLimit({
    key: `checkout:${ip}`,
    ...CHECKOUT_RATE_LIMIT,
  })

  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Trop de tentatives de paiement. Réessayez dans quelques minutes.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(ipLimit.retryAfterSeconds),
        },
      }
    )
  }

  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide.' }, { status: 400 })
  }

  const parsedBody = checkoutRequestSchema.safeParse(body)

  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Payload invalide.' }, { status: 400 })
  }

  const productIds = parsedBody.data.productIds
    .map((id) => id.trim())
    .filter(Boolean)

  if (productIds.length === 0) {
    return NextResponse.json({ error: 'Aucun produit fourni.' }, { status: 400 })
  }

  const uniqueIds = Array.from(new Set(productIds))

  if (uniqueIds.length > MAX_CHECKOUT_ITEMS) {
    return NextResponse.json(
      { error: 'Le panier dépasse la limite autorisée.' },
      { status: 400 }
    )
  }

  let sanity
  try {
    sanity = getSanityWriteClient()
  } catch (error) {
    logger.error('Sanity write client creation failed during checkout', error)
    return NextResponse.json(
      { error: 'Configuration stock manquante côté serveur.' },
      { status: 500 }
    )
  }

  try {
    let pieces = await fetchPiecesForCheckout(sanity, uniqueIds)

    const now = Date.now()
    const repairedExpiredReservations = await repairExpiredReservations({
      sanity,
      pieces,
      now,
    })

    if (repairedExpiredReservations) {
      pieces = await fetchPiecesForCheckout(sanity, uniqueIds)
    }

    const foundIds = new Set(pieces.map((piece) => piece._id))
    const missingIds = uniqueIds.filter((id) => !foundIds.has(id))

    if (missingIds.length > 0) {
      return NextResponse.json(
        { error: 'Certains produits sont introuvables.' },
        { status: 404 }
      )
    }
    const unavailablePieces = pieces.filter((piece) => {
      const reservedAndActive =
        piece.status === 'reserved' &&
        !isReservationExpired(piece.reservationExpiresAt, now)

      return (
        piece.status === 'sold' ||
        reservedAndActive ||
        typeof piece.price !== 'number' ||
        piece.price <= 0
      )
    })

    if (unavailablePieces.length > 0) {
      return NextResponse.json(
        { error: 'Certains produits ne sont plus disponibles.' },
        { status: 409 }
      )
    }

    const reservationId = randomUUID()
    const reservedAt = new Date(now).toISOString()
    const reservationExpiresAt = createReservationExpiry(now)
    const reservationExpiresAtIso = reservationExpiresAt.toISOString()

    const reserveTx = sanity.transaction()
    pieces.forEach((piece) => {
      reserveTx.patch(piece._id, (patch) =>
        patch
          .ifRevisionId(piece._rev)
          .set({
            status: 'reserved',
            reservationId,
            reservedAt,
            reservationExpiresAt: reservationExpiresAtIso,
          })
          .unset(['orderSessionId', 'paymentIntentId', 'soldAt', 'orderProcessedAt'])
      )
    })

    try {
      await reserveTx.commit({ visibility: 'sync' })
      revalidatePieceTag()
    } catch (error) {
      logger.warn('Piece reservation conflict during checkout', { error, productIds: uniqueIds })

      if (isRevisionConflictError(error)) {
        return NextResponse.json(
          { error: 'Une pièce vient d’être réservée par quelqu’un d’autre.' },
          { status: 409 }
        )
      }

      throw error
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = pieces.map(
      (piece) => ({
        quantity: 1,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(piece.price! * 100),
          product_data: {
            name: piece.title,
            images: piece.image ? [piece.image] : undefined,
            metadata: {
              pieceId: piece._id,
            },
          },
        },
      })
    )

    const stripe = getStripeClient()
    if (!stripe) {
      await releaseReservation({
        sanity,
        pieceIds: uniqueIds,
        reservationId,
      })

      return NextResponse.json(
        { error: 'Configuration Stripe manquante.' },
        { status: 500 }
      )
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin
    const pieceIdsValue = uniqueIds.join(',')

    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: lineItems,
        success_url: `${origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pieces`,
        invoice_creation: { enabled: true },
        client_reference_id: reservationId,
        expires_at: Math.floor(reservationExpiresAt.getTime() / 1000),
        metadata: {
          pieceIds: pieceIdsValue,
          reservationId,
        },
        payment_intent_data: {
          metadata: {
            pieceIds: pieceIdsValue,
            reservationId,
          },
        },
      })

      if (!session.url) {
        throw new Error('Missing checkout session URL')
      }

      return NextResponse.json({
        url: session.url,
        id: session.id,
        expiresAt: reservationExpiresAtIso,
      })
    } catch (error) {
      await releaseReservation({
        sanity,
        pieceIds: uniqueIds,
        reservationId,
      })

      logger.error('Stripe checkout session error', error, {
        productIds: uniqueIds,
        reservationWindowMinutes: RESERVATION_WINDOW_MINUTES,
      })

      return NextResponse.json(
        { error: 'Erreur lors de la creation de la session de paiement.' },
        { status: 500 }
      )
    }
  } catch (error) {
    logger.error('Checkout route failed', error, { productIds: uniqueIds })
    return NextResponse.json(
      { error: 'Erreur lors de la creation de la session de paiement.' },
      { status: 500 }
    )
  }
}

async function releaseReservation({
  sanity,
  pieceIds,
  reservationId,
}: {
  sanity: ReturnType<typeof getSanityWriteClient>
  pieceIds: string[]
  reservationId: string
}) {
  try {
    const pieces = await sanity.fetch<
      Array<{
        _id: string
        _rev: string
        status?: string
        reservationId?: string
      }>
    >(
      groq`
        *[_type == "piece" && _id in $ids]{
          _id,
          _rev,
          status,
          reservationId
        }
      `,
      { ids: pieceIds },
      { cache: 'no-store' }
    )

    const releasablePieces = pieces.filter(
      (piece) => piece.status === 'reserved' && piece.reservationId === reservationId
    )

    if (releasablePieces.length === 0) {
      return
    }

    const tx = sanity.transaction()
    releasablePieces.forEach((piece) => {
      tx.patch(piece._id, (patch) =>
        patch
          .ifRevisionId(piece._rev)
          .set({ status: 'available' })
          .unset(['reservationId', 'reservedAt', 'reservationExpiresAt'])
      )
    })

    await tx.commit({ visibility: 'sync' })
    revalidatePieceTag()
  } catch (error) {
    logger.error('Failed to release reservation after checkout error', error, {
      pieceIds,
      reservationId,
    })
  }
}

function isRevisionConflictError(error: unknown) {
  if (!(error instanceof Error)) {
    return false
  }

  const message = error.message.toLowerCase()
  return (
    message.includes('revision') ||
    message.includes('conflict') ||
    message.includes('documentrevisionidmismatch')
  )
}

async function fetchPiecesForCheckout(
  sanity: ReturnType<typeof getSanityWriteClient>,
  ids: string[]
) {
  return sanity.fetch<PieceForCheckout[]>(
    piecesPricingQuery,
    { ids },
    { cache: 'no-store' }
  )
}

async function repairExpiredReservations({
  sanity,
  pieces,
  now,
}: {
  sanity: ReturnType<typeof getSanityWriteClient>
  pieces: PieceForCheckout[]
  now: number
}) {
  const expiredPieces = pieces.filter(
    (piece) =>
      piece.status === 'reserved' &&
      isReservationExpired(piece.reservationExpiresAt, now)
  )

  if (expiredPieces.length === 0) {
    return false
  }

  const tx = sanity.transaction()
  expiredPieces.forEach((piece) => {
    tx.patch(piece._id, (patch) =>
      patch
        .ifRevisionId(piece._rev)
        .set({ status: 'available' })
        .unset(['reservationId', 'reservedAt', 'reservationExpiresAt'])
    )
  })

  try {
    await tx.commit({ visibility: 'sync' })
    revalidatePieceTag()
    logger.info('Released expired reservations before checkout', {
      pieceIds: expiredPieces.map((piece) => piece._id),
    })
    return true
  } catch (error) {
    if (isRevisionConflictError(error)) {
      logger.warn('Expired reservation repair hit a revision conflict', {
        pieceIds: expiredPieces.map((piece) => piece._id),
      })
      return true
    }

    throw error
  }
}
