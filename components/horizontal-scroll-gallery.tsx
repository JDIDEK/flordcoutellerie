'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Lenis from 'lenis'

interface Collection {
  id: number
  title: string
  subtitle: string
  year: string
  pieces: number
  category: string
  image: string
  description: string
}

interface HorizontalScrollGalleryProps {
  collections: Collection[]
}

export function HorizontalScrollGallery({ collections }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const scrollContent = scrollRef.current
    if (!container || !scrollContent) return

    const lenis = (window as any).lenis as Lenis | undefined

    let ticking = false

    const updateTransforms = () => {
      if (!container || !scrollContent) return

      const rect = container.getBoundingClientRect()
      const scrollWidth = scrollContent.scrollWidth - window.innerWidth

      // Progress global pour le scroll horizontal (comme avant)
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      )

      scrollContent.style.transform = `translateX(-${progress * scrollWidth}px)`

      // Effet 3D + trajectoire diagonale par carte
      const cards = scrollContent.querySelectorAll<HTMLElement>('[data-collection-card]')
      const viewportCenter = window.innerWidth / 2

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2

        // distance normalisée : -1 (gauche) -> 0 (centre) -> +1 (droite)
        const distanceNorm = (cardCenter - viewportCenter) / viewportCenter
        const distance = Math.max(-1, Math.min(1, distanceNorm))

        const depth = 1 - Math.min(Math.abs(distance), 1) // 1 au centre, 0 sur les bords

        const scale = 0.9 + depth * 0.15              // 0.9 -> 1.05
        const rotateY = distance * -5               // tourne légèrement vers le centre
        const rotateZ = distance * 1                // petit tilt
        const translateY = -distance * 250            // droite = haut, gauche = bas (TRAJECTOIRE DIAGONALE)

        card.style.transform = `
          translateY(${translateY}px)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `
        card.style.opacity = (0.25 + depth * 0.75).toString()
      })
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          updateTransforms()
          ticking = false
        })
      }
    }

    if (lenis) {
      lenis.on('scroll', handleScroll)
      updateTransforms()
      return () => {
        lenis.off('scroll', handleScroll)
      }
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
      updateTransforms()
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ height: '400vh' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        {/* La perspective doit englober les cartes */}
        <div
          ref={scrollRef}
          className="flex items-center gap-24 md:gap-32 will-change-transform px-6 md:px-20 [perspective:1400px]"
          style={{ transition: 'transform 0.15s ease-out' }}
        >
          {collections.map((collection) => (
            <article
              key={collection.id}
              data-collection-card
              className="
                flex-shrink-0
                w-[90vw] md:w-[70vw] lg:w-[60vw]
                max-w-5xl
                transform-gpu
                transition-transform
                duration-300
                ease-out
                cursor-pointer
                origin-center
              "
            >
              <Link href="/galerie" className="block group">
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-black">
                  <img
                    src={collection.image || '/placeholder.svg'}
                    alt={collection.title}
                    className="
                      w-full h-full object-cover
                      transition-transform duration-[900ms]
                      group-hover:scale-[1.04]
                    "
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/75" />

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p className="mb-4 text-[0.65rem] md:text-xs tracking-[0.35em] uppercase text-neutral-200/80">
                      {collection.category} • {collection.year}
                    </p>
                    <h2 className="mb-3 font-serif font-light tracking-[0.15em] text-4xl md:text-5xl lg:text-6xl text-white">
                      {collection.title}
                    </h2>
                    <p className="max-w-xl text-xs md:text-sm text-neutral-200/90">
                      {collection.subtitle}
                    </p>

                    <div className="mt-8 pointer-events-auto">
                      <button
                        className="
                          inline-flex items-center gap-3
                          rounded-full border border-white/40
                          bg-white/5 px-6 py-2
                          text-[0.7rem] md:text-xs
                          uppercase tracking-[0.3em]
                          text-white
                          transition-colors
                          group-hover:bg-white group-hover:text-black
                        "
                      >
                        Open project
                        <span className="inline-block text-[0.55rem]">
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[0.7rem] md:text-xs text-muted-foreground">
                  <span>{collection.pieces} pièces</span>
                  <span className="truncate max-w-[60%] md:max-w-none">
                    {collection.description}
                  </span>
                </div>
              </Link>
            </article>
          ))}

          <div className="flex-shrink-0 w-[20vw]" />
        </div>
      </div>
    </div>
  )
}
