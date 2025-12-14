'use client'

import { TransitionLink } from '@/components/transition-link'

export function HomeFooter() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] items-center">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xl font-serif font-light tracking-wider block">FLO RD</span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase block">
              Coutellerie
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-foreground">
            <TransitionLink href="/atelier" className="hover:text-primary transition-colors">
              Atelier
            </TransitionLink>
            <TransitionLink href="/contact" className="hover:text-primary transition-colors">
              Contact
            </TransitionLink>
            <TransitionLink href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions Légales
            </TransitionLink>
            <TransitionLink href="/cgv" className="hover:text-primary transition-colors">
              CGV
            </TransitionLink>
            <TransitionLink href="/politique-confidentialite" className="hover:text-primary transition-colors">
              Confidentialité
            </TransitionLink>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 text-xs text-muted-foreground">
            <span className="tracking-[0.2em] uppercase">Atelier sur-mesure</span>
            <p className="text-right leading-tight">SIRET: 914 141 684 00011</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
