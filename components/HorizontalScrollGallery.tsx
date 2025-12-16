'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Image from 'next/image'
import Lenis from 'lenis'
import { TransitionLink } from '@/components/TransitionLink'
import { useIsMobile } from '@/hooks/use-mobile'

interface Collection {
  id: number
  title: string
  subtitle: string
  year: string
  pieces: number
  category?: string
  image: string
  description: string
}

interface HorizontalScrollGalleryProps {
  collections: Collection[]
}

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

export function HorizontalScrollGallery({ collections }: HorizontalScrollGalleryProps) {
  const isMobile = useIsMobile()
  
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

    // Fixer la hauteur du viewport sur mobile pour éviter les problèmes de barre d'adresse
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    setVH()
    window.addEventListener('resize', setVH)

    measure()
    window.addEventListener('resize', measure)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const { top, scrollRange } = boundsRef.current
      const relativeScroll = scrollY - top
      const rawProgress = Math.max(0, Math.min(1, relativeScroll / scrollRange))
      stateRef.current.target = rawProgress
    }

    let cachedCardData: { offsetLeft: number; width: number }[] = []
    let cachedViewportCenter = window.innerWidth / 2
    let cachedTranslateRange = { min: 0, max: 0 }

    const cacheCardPositions = () => {
      const scrollContent = scrollRef.current
      if (!scrollContent) return
      
      cachedViewportCenter = window.innerWidth / 2
      const cards = Array.from(scrollContent.children) as HTMLElement[]
      
      cachedCardData = cards.map(card => ({
        offsetLeft: card.offsetLeft,
        width: card.offsetWidth
      }))
      
      if (cachedCardData.length > 0) {
        const firstCenter = cachedCardData[0].offsetLeft + cachedCardData[0].width / 2
        const lastCenter = cachedCardData[cachedCardData.length - 1].offsetLeft + cachedCardData[cachedCardData.length - 1].width / 2
        cachedTranslateRange = {
          min: cachedViewportCenter - firstCenter,
          max: cachedViewportCenter - lastCenter
        }
      }
    }

    cacheCardPositions()
    window.addEventListener('resize', cacheCardPositions)

    const animate = () => {
      const state = stateRef.current
      
      const distance = Math.abs(state.target - state.current)
      const easeFactor = distance > 0.1 ? 0.12 : 0.06 + distance * 0.6
      
      state.current = lerp(state.current, state.target, easeFactor)
      
      const threshold = 0.0002
      if (state.lastRendered !== -1 && 
          Math.abs(state.current - state.lastRendered) < threshold && 
          Math.abs(state.target - state.current) < threshold) {
        requestRef.current = requestAnimationFrame(animate)
        return
      }
      state.lastRendered = state.current

      const progress = state.current
      const scrollContent = scrollRef.current

      if (scrollContent && cachedCardData.length > 0) {
        const { min, max } = cachedTranslateRange
        const currentTranslateX = min + progress * (max - min)
        scrollContent.style.transform = `translate3d(${currentTranslateX}px, 0, 0)`

        const cards = Array.from(scrollContent.children) as HTMLElement[]
        
        cards.forEach((card, i) => {
          const cardData = cachedCardData[i]
          if (!cardData) return
          
          const cardCenterX = cardData.offsetLeft + cardData.width / 2 + currentTranslateX
          const distanceNorm = (cardCenterX - cachedViewportCenter) / cachedViewportCenter
          
          // Effets réduits sur mobile
          const slopeStrength = isMobile ? 80 : 250
          const translateY = -distanceNorm * slopeStrength

          const distanceAbs = Math.abs(distanceNorm)
          const baseScale = isMobile ? 0.95 : 0.9
          const scale = baseScale + (Math.exp(-distanceAbs * 2) * 0.1)

          const rotateY = isMobile ? distanceNorm * -8 : distanceNorm * -15
          const rotateZ = isMobile ? distanceNorm * 2 : distanceNorm * 5

          card.style.transform = `perspective(1500px) translate3d(0, ${translateY}px, 0) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`
        })
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
      window.removeEventListener('resize', setVH)
      window.removeEventListener('resize', cacheCardPositions)
      cancelAnimationFrame(requestRef.current)
    }
  }, [collections.length, isMobile, measure])

  // Hauteur responsive selon la plateforme
  const containerHeight = isMobile ? '300vh' : '400vh'

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 flex items-center overflow-hidden bg-background" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <div
          ref={scrollRef}
          className="flex items-center will-change-transform"
          style={{
            paddingLeft: isMobile ? '10vw' : '20vw',
            paddingRight: isMobile ? '10vw' : '20vw',
            gap: isMobile ? '2rem' : '5rem' 
          }}
        >
          {collections.map((collection, index) => {
            const isHovered = hoveredId === collection.id
            const showWaveLayer = !isHovered // Wave sur mobile ET desktop maintenant

            return (
              <article
                key={collection.id}
                data-collection-card
                className={`relative flex-shrink-0 transform-gpu cursor-pointer origin-center ${
                  isMobile 
                    ? 'w-[80vw] aspect-[3/4]' 
                    : 'w-[60vw] max-w-5xl aspect-[16/9]'
                }`}
                onMouseEnter={() => !isMobile && setHoveredId(collection.id)}
                onMouseLeave={() => !isMobile && setHoveredId(null)}
                style={{
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
              >
                <TransitionLink
                  href="/galerie"
                  className="block w-full h-full group focus-visible:outline-none"
                  style={{ transformStyle: 'preserve-3d' }}
                  onFocus={() => setHoveredId(collection.id)}
                  onBlur={() => setHoveredId(null)}
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
                        sizes={isMobile ? '80vw' : '(max-width: 1200px) 60vw, 1200px'}
                        priority={index === 0}
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-black/20" />
                    </div>

                    {/* Effet wave adapté selon la plateforme */}
                    <div 
                      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out"
                      style={{
                        opacity: showWaveLayer ? 1 : 0, 
                        filter: isMobile 
                          ? 'url(#wave-distortion-filter-mobile) grayscale(0.5) brightness(0.75)'
                          : 'url(#wave-distortion-filter) grayscale(0.6) brightness(0.7)',
                        transform: 'scale(1.05)'
                      }}
                    >
                      <Image
                        src={collection.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes={isMobile ? '80vw' : '(max-width: 1200px) 60vw, 1200px'}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div 
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none ${
                      isMobile ? 'px-4' : 'px-8'
                    }`}
                    style={{ 
                      transform: isMobile ? 'translateZ(40px)' : 'translateZ(80px)',
                    }}
                  >
                    <p className={`mb-2 tracking-[0.3em] uppercase text-neutral-200 drop-shadow-lg ${
                      isMobile ? 'text-[0.6rem]' : 'text-xs'
                    }`}>
                      {collection.category} • {collection.year}
                    </p>
                    
                    <h2 className={`font-serif font-light tracking-[0.05em] text-white drop-shadow-xl mb-2 ${
                      isMobile ? 'text-3xl' : 'text-6xl lg:text-7xl'
                    }`}>
                      {collection.title}
                    </h2>
                    
                    <p className={`max-w-md text-neutral-100/90 leading-relaxed drop-shadow-md mb-6 ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>
                      {collection.subtitle}
                    </p>

                    <div className="pointer-events-auto">
                      <span className={`inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all ${
                        isMobile ? 'px-4 py-2 text-[0.65rem]' : 'px-6 py-3 text-xs'
                      }`}>
                        Découvrir
                        <span className="inline-block text-[0.6rem]">→</span>
                      </span>
                    </div>
                  </div>
                </TransitionLink>
              </article>
            )
          })}
        </div>
      </div>

      {/* Filtres SVG pour les distorsions */}
      <svg className="absolute h-0 w-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Filtre desktop - distorsion forte */}
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

          {/* Filtre mobile - distorsion subtile */}
          <filter id="wave-distortion-filter-mobile" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.004" numOctaves="1" result="warp">
              <animate 
                attributeName="baseFrequency" 
                values="0.008 0.004; 0.015 0.007; 0.008 0.004" 
                dur="45s" 
                repeatCount="indefinite"
                keyTimes="0; 0.5; 1"
              />
            </feTurbulence>
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}