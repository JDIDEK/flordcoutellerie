'use client'

import { useEffect, useRef, useState } from 'react'
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

  // Carte survolée (pour le blur des autres)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  // Réfs pour l’animation (évite des setState à chaque frame)
  const snappingProgressRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const scrollContent = scrollRef.current
    if (!container || !scrollContent || collections.length === 0) return

    const lenis = (window as any).lenis as Lenis | undefined
    let ticking = false

    const updateTransforms = () => {
      if (!container || !scrollContent) return

      const rect = container.getBoundingClientRect()
      const scrollWidth = scrollContent.scrollWidth - window.innerWidth

      if (scrollWidth <= 0) return

      // Progress vertical (0 -> 1) pour le scroll horizontal
      const rawProgress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight || 1))
      )

      // --- Effet de SNAP vers la carte la plus proche ---
      // On considère qu’il y a (n - 1) “positions” de cartes.
      const maxIndex = Math.max(collections.length - 1, 1)
      const targetIndex = Math.round(rawProgress * maxIndex)
      const targetProgress = targetIndex / maxIndex

      // Lissage entre le scroll libre et la position “snap”
      // (0 = aucun snap, 1 = collé sur la carte)
      const SNAP_INTENSITY = 0.25
      const current = snappingProgressRef.current
      const snapped = current + (targetProgress - current) * SNAP_INTENSITY
      snappingProgressRef.current = snapped

      const effectiveProgress = snapped
      const translateX = -effectiveProgress * scrollWidth

      scrollContent.style.transform = `translateX(${translateX}px)`

      // Effet 3D + trajectoire diagonale sur chaque carte
      const cards = scrollContent.querySelectorAll<HTMLElement>('[data-collection-card]')
      const viewportCenter = window.innerWidth / 2

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.left + cardRect.width / 2

        // distance normalisée : -1 (gauche) -> 0 (centre) -> +1 (droite)
        const distanceNorm = (cardCenter - viewportCenter) / viewportCenter
        const distance = Math.max(-1, Math.min(1, distanceNorm))

        const depth = 1 - Math.min(Math.abs(distance), 1) // 1 au centre, 0 sur les bords

        const scale = 0.9 + depth * 0.15 // 0.9 -> ~1.05
        const rotateY = distance * -1 // pivot vers le centre
        const rotateZ = distance * 5 // tilt léger
        const translateY = -distance * 250 // droite = haut / gauche = bas (trajet diagonal)

        card.style.transform = `
          translateY(${translateY}px)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
          scale(${scale})
        `
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

    // On veut aussi recalculer sur resize
    const handleResize = () => {
      requestAnimationFrame(updateTransforms)
    }

    if (lenis) {
      lenis.on('scroll', handleScroll)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    window.addEventListener('resize', handleResize)

    // Première mise à jour
    updateTransforms()

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      } else {
        window.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [collections.length])

  return (
    <div
      ref={containerRef}
      // 400vh = espace vertical pour faire “défiler” la scène sticky
      style={{ height: '400vh' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        <div
          ref={scrollRef}
          className="flex items-center gap-24 md:gap-32 will-change-transform [perspective:1400px]"
          style={{
            // padding pour centrer la 1ère et la dernière carte
            paddingLeft: '20vw',
            paddingRight: '20vw',
            transition: 'transform 0.15s ease-out',
          }}
        >
          {collections.map((collection) => {
            const isDimmed = hoveredId !== null && hoveredId !== collection.id

            return (
              <article
                key={collection.id}
                data-collection-card
                className="
                  flex-shrink-0
                  w-[90vw] md:w-[70vw] lg:w-[60vw]
                  max-w-5xl
                  transform-gpu
                  cursor-pointer
                  origin-center
                "
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  filter: isDimmed ? 'blur(4px) grayscale(0.6)' : 'none',
                  opacity: isDimmed ? 0.45 : 1,
                  transition:
                    'transform 0.3s ease-out, filter 0.4s ease-out, opacity 0.3s ease-out',
                }}
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
                          En savoir plus
                          <span className="inline-block text-[0.55rem]">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
