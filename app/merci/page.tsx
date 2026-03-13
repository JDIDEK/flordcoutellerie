import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { MerciContent } from '@/components/pages/MerciContent'
import { logger } from '@/lib/logger'
import {
  getVerifiedOrderState,
  getVerifiedOrderSummary,
  type VerifiedOrderSummary,
} from '@/lib/order-summary'
import { getStripeClient } from '@/lib/stripe'

export const metadata: Metadata = {
  title: 'Merci | Flo RD Coutellerie',
  description: 'Verification de commande Flo RD Coutellerie.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type MerciPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

type MerciPageState =
  | 'missing'
  | 'invalid'
  | 'expired'
  | 'pending'
  | 'paid'
  | 'error'

export default async function MerciPage({ searchParams }: MerciPageProps) {
  const { session_id: sessionId } = await searchParams
  const { state, orderSummary } = await resolveMerciPageState(sessionId)

  return (
    <>
      <Navigation />
      <MerciContent state={state} orderSummary={orderSummary} />
    </>
  )
}

async function resolveMerciPageState(sessionId?: string): Promise<{
  state: MerciPageState
  orderSummary: VerifiedOrderSummary | null
}> {
  if (!sessionId) {
    return { state: 'missing', orderSummary: null }
  }

  const stripe = getStripeClient()
  if (!stripe) {
    return { state: 'error', orderSummary: null }
  }

  try {
    const orderSummary = await getVerifiedOrderSummary(stripe, sessionId)

    if (!orderSummary) {
      return { state: 'invalid', orderSummary: null }
    }

    const state = getVerifiedOrderState(orderSummary)

    return {
      state:
        state === 'paid'
          ? 'paid'
          : state === 'expired'
            ? 'expired'
            : 'pending',
      orderSummary,
    }
  } catch (error) {
    logger.error('Failed to verify checkout session for thank-you page', error, {
      sessionId,
    })
    return { state: 'error', orderSummary: null }
  }
}
