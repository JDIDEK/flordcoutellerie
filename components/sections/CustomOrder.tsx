'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'

export function CustomOrderSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const windowHeight = window.innerHeight || 1
      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight

      const start = sectionTop - windowHeight
      const end = sectionTop + sectionHeight
      const distance = end - start || 1
      const progress = (window.scrollY - start) / distance

      setScrollProgress(Math.max(0, Math.min(1, progress)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const translateY = (scrollProgress - 0.5) * 20

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full min-h-[100svh] bg-background text-foreground lg:sticky lg:top-0"
      data-stack-section
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          
            {/* Image avec effet parallax */}
            <div className="relative aspect-square overflow-hidden rounded-sm bg-secondary/20 border border-border/60">
              <div
                ref={imageRef}
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `translateY(${translateY}%)`,
                  transition: 'transform 0.1s linear'
                }}
              >
                <div className="relative w-full h-full scale-110">
                  <Image
                    src="/assets/images/flo/flo.png"
                    alt="Couteau damas sur mesure"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/5 pointer-events-none" />
            </div>

            {/* Contenu texte */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-2">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                  Création exclusive
                </p>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-light tracking-tight text-foreground">
                  COMMANDE
                  <br />
                  SUR-MESURE
                </h2>
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed text-muted-foreground max-w-xl">
                <p>
                  Chaque projet sur-mesure est une collaboration unique. Ensemble, 
                  nous définissons vos besoins, vos préférences esthétiques et 
                  l'usage que vous ferez de votre pièce.
                </p>
                <p>
                  Du choix de l'acier à la forme du manche, en passant par les 
                  dimensions et les finitions, chaque détail est pensé pour créer 
                  un couteau qui vous ressemble.
                </p>
                <p>
                  Le processus complet prend généralement entre 8 et 12 semaines, 
                  de la première esquisse à la livraison de votre pièce unique.
                </p>
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

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/60">
                <div>
                  <p className="text-2xl font-serif font-light text-primary">8-12</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Semaines</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-light text-primary">100%</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Artisanal</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-light text-primary">∞</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">Possibilités</p>
                </div>
              </div>
            </div>
          </div>

        </div>
    </section>
  )
}
