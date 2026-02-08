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
  meta: string
  pieces: number
  category?: string
  image: string
  description: string
}

interface HorizontalScrollGalleryProps {
  collections: Collection[]
}

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor
const clampProgress = (value: number) => Math.max(0, Math.min(1, value))

export function HorizontalScrollGallery({ collections }: HorizontalScrollGalleryProps) {
  const isMobile = useIsMobile()
  
  // All hooks must be called before any conditional returns
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const stateRef = useRef({ 
    current: 0, 
    target: 0,
    lastRendered: -1 
  })
  const touchStateRef = useRef({
    startX: 0,
    startTarget: 0,
    isDragging: false,
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

    measure()
    window.addEventListener('resize', measure)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const { top, scrollRange } = boundsRef.current
      const relativeScroll = scrollY - top
      stateRef.current.target = clampProgress(relativeScroll / scrollRange)
    }

    // Cache des positions des cartes pour éviter les recalculs
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

    // Paramètres adaptés mobile/desktop
    const slopeStrength = isMobile ? 80 : 250
    const rotateYMultiplier = isMobile ? -8 : -15
    const rotateZMultiplier = isMobile ? 2 : 5

    const animate = () => {
      const state = stateRef.current
      
      // Ease factor dynamique : plus lent quand proche de la cible pour une décélération douce
      const distance = Math.abs(state.target - state.current)
      const easeFactor = distance > 0.1 ? 0.12 : 0.06 + distance * 0.6
      
      state.current = lerp(state.current, state.target, easeFactor)
      
      // Seuil très petit pour éviter les micro-saccades
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
          
          // Calculer la position estimée de la carte
          const cardCenterX = cardData.offsetLeft + cardData.width / 2 + currentTranslateX
          const distanceNorm = (cardCenterX - cachedViewportCenter) / cachedViewportCenter
          
          const translateY = -distanceNorm * slopeStrength

          const distanceAbs = Math.abs(distanceNorm)
          const baseScale = isMobile ? 0.85 : 0.9
          const scale = baseScale + (Math.exp(-distanceAbs * 2) * (isMobile ? 0.15 : 0.1))

          const rotateY = distanceNorm * rotateYMultiplier
          const rotateZ = distanceNorm * rotateZMultiplier

          card.style.transform = `perspective(1500px) translate3d(0, ${translateY}px, 0) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`
        })
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    const lenis = (window as any).lenis as Lenis | undefined
    let removeTouchListeners: (() => void) | null = null

    if (!isMobile) {
      if (lenis) lenis.on('scroll', handleScroll)
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    } else {
      const viewport = viewportRef.current
      const swipeDistance = Math.max(window.innerWidth * 0.85, 260)

      if (viewport) {
        const handleTouchStart = (event: TouchEvent) => {
          if (event.touches.length !== 1) return
          touchStateRef.current.startX = event.touches[0].clientX
          touchStateRef.current.startTarget = stateRef.current.target
          touchStateRef.current.isDragging = true
        }

        const handleTouchMove = (event: TouchEvent) => {
          if (!touchStateRef.current.isDragging || event.touches.length !== 1) return
          const deltaX = touchStateRef.current.startX - event.touches[0].clientX
          stateRef.current.target = clampProgress(touchStateRef.current.startTarget + deltaX / swipeDistance)
        }

        const handleTouchEnd = () => {
          touchStateRef.current.isDragging = false
        }

        viewport.addEventListener('touchstart', handleTouchStart, { passive: true })
        viewport.addEventListener('touchmove', handleTouchMove, { passive: true })
        viewport.addEventListener('touchend', handleTouchEnd)
        viewport.addEventListener('touchcancel', handleTouchEnd)

        removeTouchListeners = () => {
          viewport.removeEventListener('touchstart', handleTouchStart)
          viewport.removeEventListener('touchmove', handleTouchMove)
          viewport.removeEventListener('touchend', handleTouchEnd)
          viewport.removeEventListener('touchcancel', handleTouchEnd)
        }
      }
    }
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (!isMobile) {
        if (lenis) lenis.off('scroll', handleScroll)
        window.removeEventListener('scroll', handleScroll)
      }
      removeTouchListeners?.()
      window.removeEventListener('resize', measure)
      window.removeEventListener('resize', cacheCardPositions)
      cancelAnimationFrame(requestRef.current)
    }
  }, [collections.length, isMobile, measure])

  // Unified horizontal scroll for both mobile and desktop
  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ 
        height: isMobile ? '100svh' : '400vh'
      }}
    >
      <div 
        ref={viewportRef}
        className={`sticky top-0 flex items-center overflow-hidden bg-background ${isMobile ? 'touch-pan-x select-none' : ''}`}
        style={{
          height: isMobile ? '100svh' : '100vh'
        }}
      >
        <div
          ref={scrollRef}
          className="flex items-center will-change-transform"
          style={{
            paddingLeft: isMobile ? '10vw' : '20vw',
            paddingRight: isMobile ? '10vw' : '20vw',
            gap: isMobile ? '1.5rem' : '5rem' 
          }}
        >
          {collections.map((collection, index) => {
            const isHovered = hoveredId === collection.id
            const showWaveLayer = !isHovered && !isMobile
            const collectionMeta = [collection.category, collection.meta].filter(Boolean).join(' • ')

            return (
              <article
                key={collection.id}
                data-collection-card
                className={`relative flex-shrink-0 transform-gpu cursor-pointer origin-center ${
                  isMobile 
                    ? 'w-[80vw] aspect-[3/4]' 
                    : 'w-[60vw] max-w-5xl aspect-[16/9]'
                }`}
                onMouseEnter={() => setHoveredId(collection.id)}
                onMouseLeave={() => setHoveredId(null)}
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

                    {/* Wave layer */}
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
                      isMobile ? 'px-4 justify-end pb-8' : 'px-4'
                    }`}
                    style={{ 
                      transform: isMobile ? 'translateZ(40px)' : 'translateZ(80px)',
                    }}
                  >
                    <p className={`tracking-[0.3em] uppercase text-neutral-200 drop-shadow-lg ${
                      isMobile ? 'text-[0.6rem] mb-2' : 'text-xs mb-4'
                    }`}>
                      {collectionMeta}
                    </p>
                    
                    <h2 className={`font-serif font-light tracking-[0.05em] text-white drop-shadow-xl ${
                      isMobile ? 'text-3xl mb-2' : 'text-6xl lg:text-7xl mb-3'
                    }`}>
                      {collection.title}
                    </h2>
                    
                    <p className={`text-neutral-100/90 leading-relaxed drop-shadow-md ${
                      isMobile ? 'text-xs max-w-[80%] mb-4' : 'text-sm max-w-md mb-8'
                    }`}>
                      {collection.subtitle}
                    </p>

                    <div className="pointer-events-auto">
                      <span className={`inline-flex items-center gap-3 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white uppercase tracking-[0.2em] transition-all ${
                        isMobile 
                          ? 'px-4 py-2 text-[0.6rem] gap-2' 
                          : 'px-6 py-3 text-xs hover:bg-white hover:text-black'
                      }`}>
                        Découvrir
                        <span className={isMobile ? 'text-[0.5rem]' : 'text-[0.6rem]'}>→</span>
                      </span>
                    </div>
                  </div>
                </TransitionLink>
              </article>
            )
          })}
        </div>
      </div>

      {/* SVG Filters */}
      <svg className="absolute h-0 w-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Desktop filter - stronger effect */}
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
          
          {/* Mobile filter - lighter effect for better performance */}
          <filter id="wave-distortion-filter-mobile" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.004" numOctaves="1" result="warp">
              <animate 
                attributeName="baseFrequency" 
                values="0.008 0.004; 0.012 0.006; 0.008 0.004" 
                dur="90s" 
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
