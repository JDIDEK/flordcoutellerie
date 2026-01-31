import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import Stripe from 'stripe'
import { Resend } from 'resend'

import { getStripeClient } from '@/lib/stripe'
import { apiVersion, dataset, projectId } from '@/sanity/env'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function getSanityWriteClient() {
  const token = process.env.SANITY_WRITE_TOKEN

  if (!token) {
    throw new Error('Missing environment variable: SANITY_WRITE_TOKEN')
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('Missing environment variable: RESEND_API_KEY')
  }

  return new Resend(apiKey)
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

  append(session.metadata?.pieceIds)
  append(paymentIntent?.metadata?.pieceIds)

  return Array.from(new Set(ids))
}

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
  } catch (err: any) {
    console.error('Stripe webhook signature verification failed', err)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  let paymentIntent: Stripe.PaymentIntent | null = null
  try {
    if (typeof session.payment_intent === 'string') {
      paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent)
    } else if (session.payment_intent && typeof session.payment_intent === 'object') {
      paymentIntent = session.payment_intent as Stripe.PaymentIntent
    }
  } catch (error) {
    console.error('Unable to retrieve payment intent', error)
  }

  const pieceIds = parsePieceIdsFromMetadata(session, paymentIntent)

  if (pieceIds.length === 0) {
    console.warn('No piece IDs found in metadata for session', session.id)
    return NextResponse.json({ received: true, warning: 'No piece IDs found.' })
  }

  let sanity
  try {
    sanity = getSanityWriteClient()
  } catch (error) {
    console.error('Sanity write client creation failed', error)
    return NextResponse.json(
      { error: 'Configuration Sanity manquante pour les ecritures.' },
      { status: 500 }
    )
  }

  try {
    const tx = sanity.transaction()
    pieceIds.forEach((id) => tx.patch(id, { set: { status: 'sold' } }))
    await tx.commit()
  } catch (error) {
    console.error('Failed to update Sanity pieces to sold', error)
    return NextResponse.json(
      { error: 'Mise a jour Sanity echouee.' },
      { status: 500 }
    )
  }

  const customerEmail = session.customer_details?.email

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
      console.error('Failed to send confirmation email via Resend', error)
    }
  } else {
    console.warn('No customer email found on checkout session', session.id)
  }

  return NextResponse.json({ received: true })
}
