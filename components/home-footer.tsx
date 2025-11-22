'use client'

import Link from 'next/link'

export function HomeFooter() {
  return (
    <footer className="border-t border-border h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-serif font-light tracking-wider">FLO RD</span>
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              Coutellerie
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">
              Atelier
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions Légales
            </Link>
            <Link href="/cgv" className="hover:text-primary transition-colors">
              CGV
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">SIRET: 914 141 684 00011</p>
        </div>
      </div>
    </footer>
  )
}
