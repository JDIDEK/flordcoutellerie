'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled error:', error)
  }, [error])

  return (
    <main className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
              Erreur
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
              Une erreur est survenue
            </h1>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Désolé, quelque chose s'est mal passé. Veuillez réessayer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={reset} size="lg">
              Réessayer
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                window.location.href = '/'
              }}
            >
              Retour à l&apos;accueil
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
