import { NextResponse } from 'next/server'
import { z } from 'zod'

import { releaseCheckoutReservation } from '@/lib/checkout-reservation-server'
import { logger } from '@/lib/logger'
import { getStripeClient } from '@/lib/stripe'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const cancelCheckoutSchema = z
  .object({
    reservationId: z.string().trim().min(1).max(128),
    productIds: z.array(z.string().trim().min(1).max(128)).min(1).max(20),
    sessionId: z.string().trim().min(1).max(128).optional(),
  })
  .strict()

export async function POST(req: Request) {
  let body: unknown

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload JSON invalide.' }, { status: 400 })
  }

  const parsed = cancelCheckoutSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Payload invalide.' }, { status: 400 })
  }

  let sanity
  try {
    sanity = getSanityWriteClient()
  } catch (error) {
    logger.error('Sanity write client creation failed during checkout cancel', error)
    return NextResponse.json(
      { error: 'Configuration stock manquante cote serveur.' },
      { status: 500 }
    )
  }

  const { reservationId, productIds, sessionId } = parsed.data

  try {
    const result = await releaseCheckoutReservation({
      sanity,
      pieceIds: Array.from(new Set(productIds)),
      reservationId,
    })

    if (sessionId) {
      const stripe = getStripeClient()

      if (stripe) {
        try {
          await stripe.checkout.sessions.expire(sessionId)
        } catch (error) {
          logger.warn('Failed to expire Stripe checkout session after cart removal', {
            sessionId,
            reservationId,
            error,
          })
        }
      }
    }

    return NextResponse.json({ success: true, released: result.released })
  } catch {
    return NextResponse.json(
      { error: 'Erreur lors de la liberation de la reservation.' },
      { status: 500 }
    )
  }
}
