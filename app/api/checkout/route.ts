import { NextResponse } from 'next/server'
import { groq } from 'next-sanity'
import type Stripe from 'stripe'
import { z } from 'zod'

import { getStripeClient } from '@/lib/stripe'
import { client } from '@/sanity/lib/client'

const checkoutRequestSchema = z
  .object({
    productIds: z.array(z.string()),
  })
  .strict()

type PieceForCheckout = {
  _id: string
  title: string
  price?: number
  status?: string
  image?: string
}

const piecesPricingQuery = groq`
  *[_type == "piece" && _id in $ids]{
    _id,
    title,
    price,
    status,
    "image": mainImage.asset->url
  }
`

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
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

  try {
    const pieces = await client.fetch<PieceForCheckout[]>(
      piecesPricingQuery,
      { ids: uniqueIds },
      { cache: 'no-store' }
    )

    const foundIds = new Set(pieces.map((piece) => piece._id))
    const missingIds = uniqueIds.filter((id) => !foundIds.has(id))

    if (missingIds.length > 0) {
      return NextResponse.json(
        { error: 'Certains produits sont introuvables.' },
        { status: 404 }
      )
    }

    const unavailablePieces = pieces.filter(
      (piece) =>
        piece.status !== 'available' ||
        typeof piece.price !== 'number' ||
        piece.price <= 0
    )

    if (unavailablePieces.length > 0) {
      return NextResponse.json(
        { error: 'Certains produits ne sont plus disponibles.' },
        { status: 400 }
      )
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
      return NextResponse.json(
        { error: 'Configuration Stripe manquante.' },
        { status: 500 }
      )
    }

    const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin
    const pieceIdsValue = uniqueIds.join(',')

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pieces`,
      invoice_creation: { enabled: true },
      metadata: { pieceIds: pieceIdsValue },
      payment_intent_data: { metadata: { pieceIds: pieceIdsValue } },
    })

    if (!session.url) {
      return NextResponse.json(
        { error: 'Impossible de generer le lien de paiement.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ url: session.url, id: session.id })
  } catch (error) {
    console.error('Stripe checkout session error', error)
    return NextResponse.json(
      { error: 'Erreur lors de la creation de la session de paiement.' },
      { status: 500 }
    )
  }
}
