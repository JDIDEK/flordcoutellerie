import { Navigation } from '@/components/site/Navigation'
import { TransitionLink } from '@/components/site/TransitionLink'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="space-y-2">
              <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
                Erreur 404
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
                Page introuvable
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Désolé, cette page n&apos;existe pas ou a été déplacée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <TransitionLink href="/pieces">
                  Voir les pièces
                </TransitionLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <TransitionLink href="/">
                  Retour à l&apos;accueil
                </TransitionLink>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
