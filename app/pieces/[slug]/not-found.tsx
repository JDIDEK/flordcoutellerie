import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
                Pièce introuvable
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Désolé, cette pièce n'existe pas ou a été retirée de notre catalogue.
            </p>
            <Button asChild size="lg">
              <Link href="/pieces">
                Voir toutes les pièces
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}
