import Stripe from 'stripe'

import { logger } from '@/lib/logger'

let stripeClient: Stripe | null = null

export function getStripeClient() {
  if (stripeClient) return stripeClient

  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    logger.error('Missing environment variable: STRIPE_SECRET_KEY')
    return null
  }

  stripeClient = new Stripe(secretKey)
  return stripeClient
}
