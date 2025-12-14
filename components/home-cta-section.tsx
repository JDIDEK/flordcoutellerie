'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/transition-link'

export function HomeCtaSection() {
  return (
    <section className="py-32 bg-secondary/30 texture-overlay">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-8 md:animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-balance">
            Créons ensemble votre lame sur mesure
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Choix des aciers, formes, manches et guillochage. Accompagnement personnalisé de la
            conception à la livraison.
          </p>
          <Button asChild size="lg" className="group hover-lift">
            <TransitionLink href="/sur-mesure">
              Démarrer un Projet
              <ArrowRight className="ml-2 h-4 w-4 md:group-hover:translate-x-1 md:transition-transform" />
            </TransitionLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
