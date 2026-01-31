import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripeClient() {
  if (stripeClient) return stripeClient

  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    console.error('Missing environment variable: STRIPE_SECRET_KEY')
    return null
  }

  stripeClient = new Stripe(secretKey)
  return stripeClient
}
