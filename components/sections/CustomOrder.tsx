'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'

export function CustomOrderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    const isMobile = isCoarsePointer || isSmallScreen

    let raf = 0

    const clamp01 = (n: number) => Math.max(0, Math.min(1, n))

    const update = () => {
      raf = 0
      const section = sectionRef.current
      const img = imageInnerRef.current
      if (!section || !img) return

      const windowHeight = window.innerHeight || 1
      const rect = section.getBoundingClientRect()
      const sectionTopInDoc = window.scrollY + rect.top
      const sectionHeight = rect.height || 1

      const start = sectionTopInDoc - windowHeight
      const end = sectionTopInDoc + sectionHeight
      const distance = end - start || 1
      const progress = clamp01((window.scrollY - start) / distance)

      const translateY = (progress - 0.5) * 20
      img.style.transform = `translate3d(0, ${translateY}%, 0)`
    }

    const schedule = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    schedule()

    window.addEventListener('scroll', schedule, { passive: true })
    if (!isMobile) window.addEventListener('resize', schedule)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      if (!isMobile) window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <section
      ref={sectionRef as any}
      className="sticky top-0 z-20 w-full h-[var(--app-height)] overflow-hidden bg-background text-foreground"
      data-stack-section
    >
      <div className="mx-auto h-full max-w-7xl px-6 py-12 md:px-12 md:py-24 lg:px-16 lg:py-32">
        <div className="grid h-full min-h-0 grid-rows-[auto,1fr] gap-8 md:gap-10 lg:grid-cols-2 lg:grid-rows-1 lg:gap-16 lg:items-center">
          <div className="flex min-h-0 flex-col gap-6 lg:gap-8">
            <div className="space-y-2">
              <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">Création exclusive</p>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-light tracking-tight text-foreground">
                COMMANDE
                <br />
                SUR-MESURE
              </h2>
            </div>

            <div className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl space-y-4">
              <div className="space-y-3 md:hidden">
                <p>
                  Chaque lame est conçue sur mesure pour son propriétaire. Ensemble, nous définissons vos besoins, vos usages et vos choix esthétiques.
                </p>
                <p>
                  Du choix de l&apos;acier à la géométrie de lame, du bois exotique à la gravure personnalisée, chaque détail est pensé et validé.
                </p>
                <p>
                  Le processus complet s&apos;étend généralement sur 8 à 12 semaines, de la première esquisse à la livraison de votre pièce.
                </p>
                <p className="text-xs italic">
                  La prise de contact, l&apos;échange et l&apos;élaboration du devis sont entièrement gratuits et sans engagement.
                </p>
              </div>
              <div className="hidden space-y-4 md:block">
                <p>
                  Chaque lame est conçue sur mesure pour son propriétaire. Ensemble, nous définissons vos besoins, vos usages et vos choix esthétiques.
                </p>
                <p>
                  Du choix de l&apos;acier à la géométrie de lame, du bois exotique à la gravure personnalisée, chaque détail est pensé et validé.
                </p>
                <p>
                  Le processus complet s&apos;étend généralement sur 8 à 12 semaines, de la première esquisse à la livraison de votre pièce.
                </p>
                <p className="text-xs italic">
                  La prise de contact, l&apos;échange et l&apos;élaboration du devis sont entièrement gratuits et sans engagement.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <TransitionLink
                href="/sur-mesure"
                className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-sm text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors duration-300 hover-lift"
              >
                <span>Démarrer un Projet</span>
                <ArrowRight className="h-4 w-4" />
              </TransitionLink>
              <TransitionLink
                href="/galerie"
                className="inline-flex items-center justify-center gap-3 border border-primary/30 text-foreground px-6 py-3 rounded-sm text-sm font-medium tracking-wide hover:bg-primary/10 transition-colors duration-300"
              >
                <span>Voir les Réalisations</span>
              </TransitionLink>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}