'use client'

import Image from 'next/image'
import Link from 'next/link'


export function HomeFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-black/85" />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16 md:py-20 min-h-[420px] md:min-h-[480px] flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-xl font-serif font-light tracking-wider">FLO RD</span>
              <span className="text-[10px] tracking-[0.3em] text-neutral-300 uppercase">
                Coutellerie
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-200">
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

            <p className="text-xs text-neutral-300">SIRET: 914 141 684 00011</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
