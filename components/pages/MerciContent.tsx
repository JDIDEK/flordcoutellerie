'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, ArrowRight, Package } from 'lucide-react'

import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/TransitionLink'
import { useCart } from '@/hooks/use-cart'

export function MerciContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clear } = useCart()

  useEffect(() => {
    if (sessionId) {
      clear()
    }
  }, [sessionId, clear])

  return (
    <PageTransitionWrapper>
      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="flex justify-center md:animate-fade-in">
              <div className="rounded-full bg-emerald-500/10 p-6">
                <CheckCircle className="h-16 w-16 text-emerald-500" />
              </div>
            </div>

            <div className="space-y-4 md:animate-fade-in-up md:animation-delay-200">
              <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-foreground">
                Merci pour votre commande
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Votre paiement a été confirmé avec succès. Vous recevrez un email de confirmation
                avec les détails de votre commande sous quelques minutes.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4 md:animate-fade-in-up md:animation-delay-400">
              <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <Package className="h-5 w-5" />
                <span>Livraison estimée sous 2 à 4 semaines</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Chaque pièce est fabriquée à la main avec le plus grand soin.
                Nous vous contacterons si des informations supplémentaires sont nécessaires.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:animate-fade-in-up md:animation-delay-600">
              <Button asChild size="lg">
                <TransitionLink href="/pieces">
                  Voir d&apos;autres pièces
                  <ArrowRight className="ml-2 h-4 w-4" />
                </TransitionLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <TransitionLink href="/">
                  Retour à l&apos;accueil
                </TransitionLink>
              </Button>
            </div>

            {sessionId && (
              <p className="text-xs text-muted-foreground md:animate-fade-in md:animation-delay-800">
                Référence de session : {sessionId.slice(0, 20)}...
              </p>
            )}
          </div>
        </div>
      </main>
    </PageTransitionWrapper>
  )
}
