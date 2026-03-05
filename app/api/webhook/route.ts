import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { groq } from 'next-sanity'
import Stripe from 'stripe'
import { Resend } from 'resend'

import { logger } from '@/lib/logger'
import { getStripeClient } from '@/lib/stripe'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

const HANDLED_EVENT_TYPES = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
])

type PieceForFulfillment = {
  _id: string
  _rev: string
  status?: string
  reservationId?: string
  orderSessionId?: string
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: 'Signature Stripe manquante ou configuration incomplete.' },
      { status: 400 }
    )
  }

  const rawBody = await req.text()

  const stripe = getStripeClient()
  if (!stripe) {
    return NextResponse.json(
      { error: 'Configuration Stripe manquante.' },
      { status: 500 }
    )
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err: unknown) {
    logger.error('Stripe webhook signature verification failed', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed.' },
      { status: 400 }
    )
  }

  if (!HANDLED_EVENT_TYPES.has(event.type)) {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session
  if (session.payment_status !== 'paid') {
    logger.info('Ignoring unpaid checkout webhook event', {
      eventType: event.type,
      sessionId: session.id,
      paymentStatus: session.payment_status,
    })
    return NextResponse.json({ received: true, pending: true })
  }

  let paymentIntent: Stripe.PaymentIntent | null = null
  try {
    if (typeof session.payment_intent === 'string') {
      paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
    } else if (session.payment_intent && typeof session.payment_intent === 'object') {
      paymentIntent = session.payment_intent as Stripe.PaymentIntent
    }
  } catch (error) {
    logger.error('Unable to retrieve payment intent', error, {
      sessionId: session.id,
    })
  }

  const reservationId = getMetadataValue('reservationId', session, paymentIntent)
  const pieceIds = parsePieceIdsFromMetadata(session, paymentIntent)

  if (!reservationId || pieceIds.length === 0) {
    logger.warn('Missing reservation metadata on checkout webhook', {
      sessionId: session.id,
      reservationId,
      pieceIds,
    })
    return NextResponse.json({
      received: true,
      warning: 'Missing reservation metadata. Manual review required.',
    })
  }

  let sanity
  try {
    sanity = getSanityWriteClient()
  } catch (error) {
    logger.error('Sanity write client creation failed', error)
    return NextResponse.json(
      { error: 'Configuration Sanity manquante pour les ecritures.' },
      { status: 500 }
    )
  }

  const pieces = await sanity.fetch<PieceForFulfillment[]>(
    groq`
      *[_type == "piece" && _id in $ids]{
        _id,
        _rev,
        status,
        reservationId,
        orderSessionId
      }
    `,
    { ids: pieceIds },
    { cache: 'no-store' }
  )

  const foundIds = new Set(pieces.map((piece) => piece._id))
  const missingIds = pieceIds.filter((id) => !foundIds.has(id))

  if (missingIds.length > 0) {
    logger.error('Stripe webhook references missing pieces', undefined, {
      sessionId: session.id,
      reservationId,
      missingIds,
    })
    return NextResponse.json({
      received: true,
      warning: 'Piece IDs missing. Manual review required.',
    })
  }

  if (hasBeenProcessed(pieces, session.id)) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  const conflictingPieces = pieces.filter(
    (piece) => piece.status !== 'reserved' || piece.reservationId !== reservationId
  )

  if (conflictingPieces.length > 0) {
    logger.error('Checkout webhook state conflict', undefined, {
      sessionId: session.id,
      reservationId,
      conflictingPieceIds: conflictingPieces.map((piece) => piece._id),
    })

    return NextResponse.json({
      received: true,
      warning: 'Checkout state conflict. Manual review required.',
    })
  }

  const processedAt = new Date().toISOString()
  const paymentIntentId =
    paymentIntent?.id ??
    (typeof session.payment_intent === 'string' ? session.payment_intent : undefined)

  const fulfillmentTx = sanity.transaction()
  pieces.forEach((piece) => {
    fulfillmentTx.patch(piece._id, (patch) =>
      patch
        .ifRevisionId(piece._rev)
        .set({
          status: 'sold',
          soldAt: processedAt,
          orderProcessedAt: processedAt,
          orderSessionId: session.id,
          paymentIntentId,
        })
        .unset(['reservationId', 'reservedAt', 'reservationExpiresAt'])
    )
  })

  try {
    await fulfillmentTx.commit({ visibility: 'sync' })
    revalidateTag('piece', 'default')
  } catch (error) {
    if (isRevisionConflictError(error)) {
      const latestPieces = await sanity.fetch<PieceForFulfillment[]>(
        groq`
          *[_type == "piece" && _id in $ids]{
            _id,
            _rev,
            status,
            reservationId,
            orderSessionId
          }
        `,
        { ids: pieceIds },
        { cache: 'no-store' }
      )

      if (hasBeenProcessed(latestPieces, session.id)) {
        return NextResponse.json({ received: true, duplicate: true })
      }
    }

    logger.error('Failed to update Sanity pieces to sold', error, {
      sessionId: session.id,
      reservationId,
      pieceIds,
    })

    return NextResponse.json(
      { error: 'Mise a jour Sanity echouee.' },
      { status: 500 }
    )
  }

  const customerEmail = session.customer_details?.email ?? session.customer_email

  if (customerEmail) {
    try {
      const resend = getResendClient()
      const fromEmail = process.env.RESEND_FROM_EMAIL

      if (!fromEmail) {
        throw new Error('Missing environment variable: RESEND_FROM_EMAIL')
      }

      await resend.emails.send({
        from: fromEmail,
        to: customerEmail,
        subject: 'Confirmation de commande - Flor D Coutellerie',
        text: [
          'Merci pour votre commande !',
          '',
          'Votre paiement a bien ete recu et vos pieces sont reservees.',
          '',
          'Un grand merci pour votre confiance.',
        ].join('\n'),
      })
    } catch (error) {
      logger.error('Failed to send confirmation email via Resend', error, {
        sessionId: session.id,
      })
    }
  } else {
    logger.warn('No customer email found on checkout session', { sessionId: session.id })
  }

  return NextResponse.json({ received: true })
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('Missing environment variable: RESEND_API_KEY')
  }

  return new Resend(apiKey)
}

function getMetadataValue(
  key: string,
  session: Stripe.Checkout.Session,
  paymentIntent?: Stripe.PaymentIntent | null
) {
  return session.metadata?.[key] ?? paymentIntent?.metadata?.[key] ?? null
}

function parsePieceIdsFromMetadata(
  session: Stripe.Checkout.Session,
  paymentIntent?: Stripe.PaymentIntent | null
) {
  const ids: string[] = []

  const append = (value?: string | null) => {
    if (!value) return

    value
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean)
      .forEach((id) => ids.push(id))
  }

  append(getMetadataValue('pieceIds', session, paymentIntent))

  return Array.from(new Set(ids))
}

function hasBeenProcessed(pieces: PieceForFulfillment[], sessionId: string) {
  return (
    pieces.length > 0 &&
    pieces.every(
      (piece) => piece.status === 'sold' && piece.orderSessionId === sessionId
    )
  )
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
