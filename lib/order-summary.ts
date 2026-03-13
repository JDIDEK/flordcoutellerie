import type Stripe from 'stripe'

import { formatAmountFromMinorUnits } from '@/lib/utils'

export type VerifiedOrderLineItem = {
  id: string
  name: string
  quantity: number
  unitAmount: number | null
  amountTotal: number | null
  currency: string | null
}

export type VerifiedOrderSummary = {
  sessionId: string
  sessionStatus: Stripe.Checkout.Session.Status | null
  paymentStatus: Stripe.Checkout.Session.PaymentStatus | null
  customerEmail: string | null
  customerName: string | null
  amountTotal: number | null
  currency: string | null
  createdAt: string | null
  lineItems: VerifiedOrderLineItem[]
}

export type VerifiedOrderState = 'paid' | 'expired' | 'pending'

export async function getVerifiedOrderSummary(
  stripe: Stripe,
  sessionId: string
) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return buildVerifiedOrderSummary(stripe, session)
  } catch (error) {
    if (isMissingStripeResourceError(error)) {
      return null
    }

    throw error
  }
}

export async function buildVerifiedOrderSummary(
  stripe: Stripe,
  session: Stripe.Checkout.Session
): Promise<VerifiedOrderSummary> {
  const lineItems = await listAllSessionLineItems(stripe, session.id)

  return {
    sessionId: session.id,
    sessionStatus: session.status,
    paymentStatus: session.payment_status,
    customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
    customerName: session.customer_details?.name ?? null,
    amountTotal: session.amount_total ?? null,
    currency: session.currency?.toUpperCase() ?? null,
    createdAt: session.created
      ? new Date(session.created * 1000).toISOString()
      : null,
    lineItems: lineItems.map((item) => ({
      id: item.id,
      name: item.description ?? 'Pièce Flo RD Coutellerie',
      quantity: item.quantity ?? 1,
      unitAmount: item.price?.unit_amount ?? null,
      amountTotal: item.amount_total ?? null,
      currency: item.currency?.toUpperCase() ?? session.currency?.toUpperCase() ?? null,
    })),
  }
}

export function getVerifiedOrderState(summary: VerifiedOrderSummary): VerifiedOrderState {
  if (summary.paymentStatus === 'paid') {
    return 'paid'
  }

  if (summary.sessionStatus === 'expired') {
    return 'expired'
  }

  return 'pending'
}

export function createOrderConfirmationEmailText(summary: VerifiedOrderSummary) {
  const amountLabel =
    formatAmountFromMinorUnits(summary.amountTotal, summary.currency ?? 'EUR') ??
    'Montant indisponible'
  const createdAtLabel = summary.createdAt
    ? new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeStyle: 'short',
      }).format(new Date(summary.createdAt))
    : 'Date indisponible'

  return [
    'Merci pour votre commande chez Flo RD Coutellerie.',
    '',
    `Reference de commande : ${summary.sessionId}`,
    `Date : ${createdAtLabel}`,
    `Email client : ${summary.customerEmail ?? 'Non renseigne'}`,
    '',
    'Recapitulatif :',
    ...summary.lineItems.map((item) => {
      const totalLabel =
        formatAmountFromMinorUnits(item.amountTotal, item.currency ?? summary.currency ?? 'EUR') ??
        'Montant indisponible'
      return `- ${item.name} x${item.quantity} (${totalLabel})`
    }),
    '',
    `Total regle : ${amountLabel}`,
    '',
    'Votre commande a bien ete confirmee. Nous reviendrons vers vous si une precision de livraison est necessaire.',
    'Pour toute question, repondez a cet email ou contactez floribadeaudumas@gmail.com.',
  ].join('\n')
}

async function listAllSessionLineItems(stripe: Stripe, sessionId: string) {
  const items: Stripe.LineItem[] = []
  let startingAfter: string | undefined

  for (;;) {
    const page = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    })

    items.push(...page.data)

    if (!page.has_more || page.data.length === 0) {
      return items
    }

    startingAfter = page.data[page.data.length - 1]?.id
  }
}

function isMissingStripeResourceError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false
  }

  const maybeStripeError = error as { code?: string; type?: string }
  return (
    maybeStripeError.code === 'resource_missing' ||
    maybeStripeError.type === 'StripeInvalidRequestError'
  )
}
