'use client'

import { useEffect } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Clock3,
  Package,
  SearchX,
} from 'lucide-react'

import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/ui/button'
import type { VerifiedOrderSummary } from '@/lib/order-summary'
import { clearActiveCheckoutReservation } from '@/lib/checkout-reservation'
import { formatAmountFromMinorUnits } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'

type MerciContentState =
  | 'missing'
  | 'invalid'
  | 'expired'
  | 'pending'
  | 'paid'
  | 'error'

type MerciContentProps = {
  state: MerciContentState
  orderSummary?: VerifiedOrderSummary | null
}

const stateConfig: Record<
  MerciContentState,
  {
    title: string
    description: string
    icon: typeof CheckCircle
    iconClassName: string
  }
> = {
  missing: {
    title: 'Commande introuvable',
    description:
      'Cette page doit etre ouverte depuis le lien de retour Stripe apres paiement.',
    icon: SearchX,
    iconClassName: 'text-muted-foreground',
  },
  invalid: {
    title: 'Reference inconnue',
    description:
      'La reference transmise ne correspond a aucune session Stripe connue.',
    icon: SearchX,
    iconClassName: 'text-muted-foreground',
  },
  expired: {
    title: 'Session de paiement expiree',
    description:
      'Le paiement n’a pas ete confirme a temps. Les pieces ont ete remises en disponibilite si elles n’etaient pas deja vendues.',
    icon: AlertTriangle,
    iconClassName: 'text-amber-600',
  },
  pending: {
    title: 'Paiement non confirme',
    description:
      'Votre session existe, mais Stripe ne l’indique pas encore comme payee. Verifiez votre boite mail ou reessayez depuis vos pieces.',
    icon: Clock3,
    iconClassName: 'text-amber-600',
  },
  paid: {
    title: 'Commande verifiee',
    description:
      'Le paiement a ete confirme par Stripe. Vous recevrez un email de confirmation avec le recapitulatif de votre commande.',
    icon: CheckCircle,
    iconClassName: 'text-emerald-500',
  },
  error: {
    title: 'Verification indisponible',
    description:
      'La verification de la commande a echoue cote serveur. Reessayez dans quelques minutes ou contactez-nous avec votre reference Stripe.',
    icon: AlertTriangle,
    iconClassName: 'text-destructive',
  },
}

export function MerciContent({ state, orderSummary }: MerciContentProps) {
  const { clear } = useCart()
  const config = stateConfig[state]
  const Icon = config.icon

  useEffect(() => {
    if (state === 'paid') {
      clear()
      clearActiveCheckoutReservation()
    }
  }, [clear, state])

  const totalLabel =
    formatAmountFromMinorUnits(
      orderSummary?.amountTotal,
      orderSummary?.currency ?? 'EUR'
    ) ?? null

  return (
    <PageTransitionWrapper>
      <main className="min-h-screen bg-background pb-20 pt-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-6 text-center">
              <div className="flex justify-center md:animate-fade-in">
                <div className="rounded-full bg-card/40 p-6">
                  <Icon className={`h-16 w-16 ${config.iconClassName}`} />
                </div>
              </div>

              <div className="space-y-4 md:animate-fade-in-up md:animation-delay-200">
                <h1 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
                  {config.title}
                </h1>
                <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {config.description}
                </p>
              </div>
            </div>

            {state === 'paid' && orderSummary && (
              <div className="space-y-5 rounded-[1.5rem] border border-border/60 bg-card/20 p-6 md:animate-fade-in-up md:animation-delay-400">
                <div className="flex flex-col gap-3 border-b border-border/60 pb-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    <span>
                      Reference : <span className="font-medium text-foreground">{orderSummary.sessionId}</span>
                    </span>
                  </div>
                  {totalLabel && (
                    <span>
                      Total : <span className="font-medium text-foreground">{totalLabel}</span>
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {orderSummary.lineItems.map((item) => {
                    const itemTotal =
                      formatAmountFromMinorUnits(
                        item.amountTotal,
                        item.currency ?? orderSummary.currency ?? 'EUR'
                      ) ?? 'Montant indisponible'

                    return (
                      <div
                        key={item.id}
                        className="flex flex-col gap-1 rounded-2xl border border-border/50 bg-background/60 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-muted-foreground">Quantite : {item.quantity}</p>
                        </div>
                        <span className="font-medium text-foreground">{itemTotal}</span>
                      </div>
                    )
                  })}
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  Un email de confirmation a ete prepare pour{' '}
                  <span className="font-medium text-foreground">
                    {orderSummary.customerEmail ?? 'votre adresse'}
                  </span>
                  . Nous vous recontacterons si une precision de livraison est necessaire.
                </p>
              </div>
            )}

            {(state === 'pending' || state === 'expired' || state === 'error') && orderSummary && (
              <div className="rounded-[1.5rem] border border-border/60 bg-card/20 p-6 text-sm text-muted-foreground md:animate-fade-in-up md:animation-delay-400">
                <p>
                  Reference de session :{' '}
                  <span className="font-medium text-foreground">{orderSummary.sessionId}</span>
                </p>
              </div>
            )}

            <div className="flex flex-col justify-center gap-4 sm:flex-row md:animate-fade-in-up md:animation-delay-600">
              <Button asChild size="lg">
                <TransitionLink href="/pieces">
                  Voir les pieces disponibles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </TransitionLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <TransitionLink href="/">
                  Retour a l&apos;accueil
                </TransitionLink>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </PageTransitionWrapper>
  )
}
