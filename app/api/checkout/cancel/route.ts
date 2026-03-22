import { NextResponse } from 'next/server'
import { z } from 'zod'

import { releaseCheckoutReservation } from '@/lib/checkout-reservation-server'
import { logger } from '@/lib/logger'
import { rateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/request'
import { validateInternalJsonRequest } from '@/lib/request-security'
import { getStripeClient } from '@/lib/stripe'
import { getSanityWriteClient } from '@/sanity/lib/write-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CHECKOUT_CANCEL_RATE_LIMIT = {
  limit: 20,
  windowMs: 10 * 60 * 1000,
} as const

const cancelCheckoutSchema = z
  .object({
    reservationId: z.string().trim().min(1).max(128),
    productIds: z.array(z.string().trim().min(1).max(128)).min(1).max(20),
    sessionId: z.string().trim().min(1).max(128).optional(),
  })
  .strict()

export async function POST(req: Request) {
  const securityError = validateInternalJsonRequest(req)
  if (securityError) {
    return securityError
  }

  const ip = getClientIp(req)
  const ipLimit = await rateLimit({
    key: `checkout-cancel:${ip}`,
    ...CHECKOUT_CANCEL_RATE_LIMIT,
  })

  if (!ipLimit.allowed) {
    return NextResponse.json(
      { error: 'Trop de demandes de liberation. Reessayez plus tard.' },
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
          if (isAlreadyClosedCheckoutSessionError(error)) {
            logger.info('Stripe checkout session already closed during cart removal', {
              sessionId,
              reservationId,
            })
          } else {
            logger.warn('Failed to expire Stripe checkout session after cart removal', {
              sessionId,
              reservationId,
              error,
            })
          }
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

function isAlreadyClosedCheckoutSessionError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false
  }

  const maybeStripeError = error as {
    type?: string
    raw?: { message?: string }
    message?: string
  }

  const message =
    maybeStripeError.raw?.message?.toLowerCase() ??
    maybeStripeError.message?.toLowerCase() ??
    ''

  return (
    maybeStripeError.type === 'StripeInvalidRequestError' &&
    message.includes('only checkout sessions with a status in') &&
    message.includes('status of `expired`')
  )
}
