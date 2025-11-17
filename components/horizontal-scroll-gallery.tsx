'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Lenis from 'lenis'

import { useIsMobile } from '@/hooks/use-mobile'

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
  const prefersReducedMotionRef = useRef(false)

  // Carte survolée (pour le blur des autres)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const container = containerRef.current
    const scrollContent = scrollRef.current
    if (!container || !scrollContent || collections.length === 0) return

    const lenis = (window as any).lenis as Lenis | undefined
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotionRef.current = mediaQuery.matches
    let ticking = false

    const clearTransforms = () => {
      scrollContent.style.transform = ''
      const cards = scrollContent.querySelectorAll<HTMLElement>('[data-collection-card]')
      cards.forEach((card) => {
        card.style.transform = ''
      })
    }

    const updateTransforms = () => {
      if (!container || !scrollContent) return
      if (prefersReducedMotionRef.current) {
        clearTransforms()
        return
      }

      const cards = Array.from(
        scrollContent.querySelectorAll<HTMLElement>('[data-collection-card]')
      )
      if (cards.length === 0) return

      const rect = container.getBoundingClientRect()
      const scrollRange = Math.max(rect.height - window.innerHeight, 1)

      // Progress vertical (0 -> 1) pour le scroll horizontal
      const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollRange))

      const viewportCenter = window.innerWidth / 2
      const firstCard = cards[0]
      const lastCard = cards[cards.length - 1]
      const firstCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2
      const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2
      const minTranslate = viewportCenter - firstCenter
      const maxTranslate = viewportCenter - lastCenter
      const translateDelta = maxTranslate - minTranslate
      const translateX =
        Math.abs(translateDelta) < 0.001
          ? minTranslate
          : minTranslate + rawProgress * translateDelta

      scrollContent.style.transform = `translateX(${translateX}px)`

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
        const translateY = -distance * (isMobile ? 120 : 250) // droite = haut / gauche = bas

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

    const handleMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = event.matches
      if (event.matches) {
        clearTransforms()
      } else {
        requestAnimationFrame(updateTransforms)
      }
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange)
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleMotionChange)
    }

    if (lenis) {
      lenis.on('scroll', handleScroll)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    window.addEventListener('resize', handleResize)

    // Première mise à jour
    updateTransforms()

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleMotionChange)
      }
    }
  }, [collections.length, isMobile])

  if (isMobile) {
    return (
      <section className="bg-background px-6 py-12 space-y-10">
        {collections.map((collection) => (
          <article key={collection.id} className="space-y-4">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={collection.image || '/placeholder.svg'}
                alt={collection.title}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, 768px"
                className="object-cover"
                priority={collection.id === collections[0]?.id}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />
              <div className="absolute inset-0 flex flex-col justify-between px-5 py-6 text-white">
                <p className="text-[0.6rem] uppercase tracking-[0.35em] text-neutral-200/80">
                  {collection.category} • {collection.year}
                </p>
                <div>
                  <h3 className="font-serif font-light text-3xl tracking-[0.1em]">
                    {collection.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-100/90">{collection.subtitle}</p>
                </div>
              </div>
            </div>
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white"
            >
              Découvrir la collection
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </section>
    )
  }

  const horizontalPadding = '20vw'

  return (
    <div
      ref={containerRef}
      style={{ height: '400vh' }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        <div
          ref={scrollRef}
          className="flex items-center gap-12 sm:gap-20 lg:gap-32 will-change-transform [perspective:1400px]"
          style={{
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
            transition: 'transform 0.15s ease-out',
          }}
        >
          {collections.map((collection, index) => {
            const isDimmed = hoveredId !== null && hoveredId !== collection.id

            return (
              <article
                key={collection.id}
                data-collection-card
                className="
                  flex-shrink-0
                  w-[78vw] sm:w-[70vw] lg:w-[60vw]
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
                <Link
                  href="/galerie"
                  className="block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label={`Découvrir la collection ${collection.title}`}
                  onFocus={() => setHoveredId(collection.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-sm bg-black">
                    <Image
                      src={collection.image || '/placeholder.svg'}
                      alt={collection.title}
                      fill
                      sizes="(max-width: 640px) 78vw, (max-width: 768px) 70vw, (max-width: 1024px) 70vw, (max-width: 1536px) 60vw, 1200px"
                      priority={index === 0}
                      className="
                        object-cover
                        transition-transform duration-[900ms]
                        group-hover:scale-[1.04]
                      "
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/75" />

                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
                      <p className="mb-4 text-[0.6rem] md:text-xs tracking-[0.35em] uppercase text-neutral-200/80">
                        {collection.category} • {collection.year}
                      </p>
                      <h2 className="mb-3 font-serif font-light tracking-[0.15em] text-3xl sm:text-5xl lg:text-6xl text-white">
                        {collection.title}
                      </h2>
                      <p className="max-w-xl text-xs md:text-sm text-neutral-200/90 px-2">
                        {collection.subtitle}
                      </p>

                      <div className="mt-8 pointer-events-auto">
                        <span
                          className="
                            inline-flex items-center gap-3
                            rounded-full border border-white/40
                            bg-white/5 px-5 py-2
                            text-[0.7rem] md:text-xs
                            uppercase tracking-[0.3em]
                            text-white
                            transition-colors
                            group-hover:bg-white group-hover:text-black
                          "
                          aria-hidden="true"
                        >
                          En savoir plus
                          <span className="inline-block text-[0.55rem]">
                            →
                          </span>
                        </span>
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
