'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Lenis from 'lenis'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

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

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

export function HorizontalScrollGallery({ collections }: HorizontalScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const stateRef = useRef({ 
    current: 0, 
    target: 0,
    lastRendered: -1 
  })
  const requestRef = useRef<number>(0)
  const boundsRef = useRef({ top: 0, height: 0, scrollRange: 1 })
  
  const isMobile = useIsMobile()

  const measure = useCallback(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const offsetTop = rect.top + scrollTop
    
    boundsRef.current = {
      top: offsetTop,
      height: rect.height,
      scrollRange: Math.max(rect.height - window.innerHeight, 1)
    }
  }, [])

  useEffect(() => {
    if (collections.length === 0) return

    measure()
    window.addEventListener('resize', measure)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const { top, scrollRange } = boundsRef.current
      const relativeScroll = scrollY - top
      const rawProgress = Math.max(0, Math.min(1, relativeScroll / scrollRange))
      stateRef.current.target = rawProgress
    }

    const animate = () => {
      const state = stateRef.current
      const easeFactor = isMobile ? 0.1 : 0.08
      state.current = lerp(state.current, state.target, easeFactor)
      
      if (state.lastRendered !== -1 && 
          Math.abs(state.current - state.lastRendered) < 0.0001 && 
          Math.abs(state.target - state.current) < 0.0001) {
        requestRef.current = requestAnimationFrame(animate)
        return
      }
      state.lastRendered = state.current

      const progress = state.current
      const scrollContent = scrollRef.current

      if (scrollContent) {
        const viewportCenter = window.innerWidth / 2
        const cards = Array.from(scrollContent.children) as HTMLElement[]
        
        if (cards.length > 0) {
          const firstCard = cards[0]
          const lastCard = cards[cards.length - 1]
          
          const firstCenter = firstCard.offsetLeft + firstCard.offsetWidth / 2
          const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2
          
          const minTranslateX = viewportCenter - firstCenter
          const maxTranslateX = viewportCenter - lastCenter
          
          const currentTranslateX = minTranslateX + progress * (maxTranslateX - minTranslateX)
          scrollContent.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`

          cards.forEach((card) => {
            const cardRect = card.getBoundingClientRect()
            const cardCenter = cardRect.left + cardRect.width / 2
            
            const spreadFactor = isMobile ? 0.7 : 1.0
            const distanceNorm = (cardCenter - viewportCenter) / (viewportCenter * spreadFactor)
            
            const slopeStrength = isMobile ? 100 : 250
            const translateY = -distanceNorm * slopeStrength

            const distanceAbs = Math.abs(distanceNorm)
            const baseScale = isMobile ? 0.95 : 0.9
            const scale = baseScale + (Math.exp(-distanceAbs * 2) * 0.1)

            const rotateY = distanceNorm * -15
            const rotateZ = distanceNorm * (isMobile ? 2 : 5)

            card.style.transform = `
              perspective(${isMobile ? 800 : 1500}px)
              translate3d(0, ${translateY}px, 0)
              rotateY(${rotateY}deg)
              rotateZ(${rotateZ}deg)
              scale(${scale})
            `
          })
        }
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    const lenis = (window as any).lenis as Lenis | undefined
    if (lenis) lenis.on('scroll', handleScroll)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (lenis) lenis.off('scroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', measure)
      cancelAnimationFrame(requestRef.current)
    }
  }, [collections.length, isMobile, measure])

  const horizontalPadding = isMobile ? '50vw' : '20vw'

  return (
    <div
      ref={containerRef}
      className={cn("relative", isMobile ? "h-[300vh]" : "h-[400vh]")}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-background">
        <div
          ref={scrollRef}
          className="flex items-center will-change-transform"
          style={{
            paddingLeft: horizontalPadding,
            paddingRight: horizontalPadding,
            gap: isMobile ? '2rem' : '5rem' 
          }}
        >
          {collections.map((collection, index) => {
            const isHovered = hoveredId === collection.id

            const showWaveLayer = !isMobile && !isHovered

            return (
            <article
              key={collection.id}
              data-collection-card
              className={cn(
                "relative flex-shrink-0 transform-gpu cursor-pointer origin-center",
                isMobile ? "w-[72vw] max-w-[320px] aspect-[2/3]" : "w-[60vw] max-w-5xl aspect-[16/9]"
              )}
              onMouseEnter={() => !isMobile && setHoveredId(collection.id)}
              onMouseLeave={() => !isMobile && setHoveredId(null)}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            >
              <Link
                href="/galerie"
                className="block w-full h-full group focus-visible:outline-none"
                style={{ transformStyle: 'preserve-3d' }}
                onFocus={() => !isMobile && setHoveredId(collection.id)}
                onBlur={() => !isMobile && setHoveredId(null)}
              >
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden rounded-sm bg-black shadow-2xl"
                  style={{ transform: 'translateZ(0px)' }} 
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={collection.image || '/placeholder.svg'}
                      alt={collection.title}
                      fill
                      sizes={isMobile ? "(max-width: 768px) 85vw, 600px" : "(max-width: 1200px) 60vw, 1200px"}
                      priority={index === 0}
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/20" />
                  </div>

                  {!isMobile && (
                    <div 
                      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out"
                      style={{
                        opacity: showWaveLayer ? 1 : 0, 
                        filter: 'url(#wave-distortion-filter) grayscale(0.6) brightness(0.7)',
                        transform: 'scale(1.05)'
                      }}
                    >
                      <Image
                        src={collection.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="(max-width: 1200px) 60vw, 1200px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
                  style={{ 
                    transform: `translateZ(${isMobile ? 40 : 80}px)`,
                  }}
                >
                  <p className="mb-4 text-[0.6rem] md:text-xs tracking-[0.3em] uppercase text-neutral-200 drop-shadow-lg">
                    {collection.category} • {collection.year}
                  </p>
                  
                  <h2 className={cn(
                    "font-serif font-light tracking-[0.05em] text-white drop-shadow-xl mb-3",
                    isMobile ? "text-3xl" : "text-6xl lg:text-7xl"
                  )}>
                    {collection.title}
                  </h2>
                  
                  {!isMobile && (
                    <p className="max-w-md text-sm text-neutral-100/90 leading-relaxed drop-shadow-md mb-8">
                      {collection.subtitle}
                    </p>
                  )}

                  <div className="pointer-events-auto mt-4 md:mt-0">
                    <span
                      className={cn(
                        "inline-flex items-center gap-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white uppercase tracking-[0.2em]",
                        isMobile ? "px-4 py-2 text-[0.6rem]" : "px-6 py-3 text-xs hover:bg-white hover:text-black transition-all"
                      )}
                    >
                      Découvrir
                      <span className="inline-block text-[0.6rem]">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )})}
        </div>
      </div>

      <svg className="absolute h-0 w-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="wave-distortion-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.005" numOctaves="1" result="warp">
              <animate 
                attributeName="baseFrequency" 
                values="0.01 0.005; 0.02 0.009; 0.01 0.005" 
                dur="60s" 
                repeatCount="indefinite"
                keyTimes="0; 0.5; 1"
              />
            </feTurbulence>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="60" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
