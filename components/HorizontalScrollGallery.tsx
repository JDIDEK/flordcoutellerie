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
const metaTextShadow = { textShadow: '0 2px 10px rgba(0, 0, 0, 0.92)' } as const
const titleTextShadow = { textShadow: '0 8px 22px rgba(0, 0, 0, 0.95)' } as const
const subtitleTextShadow = { textShadow: '0 4px 14px rgba(0, 0, 0, 0.92)' } as const

export function HorizontalScrollGallery({ collections }: HorizontalScrollGalleryProps) {
  const isMobile = useIsMobile()
  
  // All hooks must be called before any conditional returns
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const stateRef = useRef({ 
    current: 0, 
    target: 0,
    lastRendered: -1 
  })
  const dragStateRef = useRef({
    startX: 0,
    startTarget: 0,
    isDragging: false,
    hasMoved: false,
  })
  const clickGuardRef = useRef(0)
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

  const handleCardClickCapture = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (performance.now() <= clickGuardRef.current) {
      event.preventDefault()
      event.stopPropagation()
    }
  }, [])

  const handleNativeDragStart = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault()
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
    let removePointerListeners: (() => void) | null = null

    if (!isMobile) {
      if (lenis) lenis.on('scroll', handleScroll)
      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()
    }

    const viewport = viewportRef.current
    const swipeDistance = Math.max(window.innerWidth * (isMobile ? 0.85 : 1.1), 260)

    if (viewport) {
      const resetDragState = () => {
        dragStateRef.current.isDragging = false
        dragStateRef.current.hasMoved = false
        setIsDragging(false)
      }

      const handlePointerDown = (event: PointerEvent) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return

        dragStateRef.current.startX = event.clientX
        dragStateRef.current.startTarget = stateRef.current.target
        dragStateRef.current.isDragging = true
        dragStateRef.current.hasMoved = false
        setIsDragging(true)
        viewport.setPointerCapture?.(event.pointerId)
      }

      const handlePointerMove = (event: PointerEvent) => {
        if (!dragStateRef.current.isDragging) return

        const deltaX = dragStateRef.current.startX - event.clientX
        if (Math.abs(deltaX) > 5) dragStateRef.current.hasMoved = true

        stateRef.current.target = clampProgress(
          dragStateRef.current.startTarget + deltaX / swipeDistance
        )
      }

      const handlePointerEnd = (event: PointerEvent) => {
        if (!dragStateRef.current.isDragging) return

        if (dragStateRef.current.hasMoved) {
          clickGuardRef.current = performance.now() + 180
        }

        if (viewport.hasPointerCapture?.(event.pointerId)) {
          viewport.releasePointerCapture(event.pointerId)
        }
        resetDragState()
      }

      viewport.addEventListener('pointerdown', handlePointerDown)
      viewport.addEventListener('pointermove', handlePointerMove)
      viewport.addEventListener('pointerup', handlePointerEnd)
      viewport.addEventListener('pointercancel', handlePointerEnd)
      viewport.addEventListener('lostpointercapture', resetDragState)

      removePointerListeners = () => {
        viewport.removeEventListener('pointerdown', handlePointerDown)
        viewport.removeEventListener('pointermove', handlePointerMove)
        viewport.removeEventListener('pointerup', handlePointerEnd)
        viewport.removeEventListener('pointercancel', handlePointerEnd)
        viewport.removeEventListener('lostpointercapture', resetDragState)
      }
    }
    
    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (!isMobile) {
        if (lenis) lenis.off('scroll', handleScroll)
        window.removeEventListener('scroll', handleScroll)
      }
      removePointerListeners?.()
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
        className={`sticky top-0 flex items-center overflow-hidden bg-background select-none ${
          isMobile ? 'touch-pan-x' : ''
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onDragStartCapture={handleNativeDragStart}
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
                  onClickCapture={handleCardClickCapture}
                  onFocus={() => setHoveredId(collection.id)}
                  onBlur={() => setHoveredId(null)}
                  draggable={false}
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
                        draggable={false}
                        sizes={isMobile ? '80vw' : '(max-width: 1200px) 60vw, 1200px'}
                        priority={index === 0}
                        className="object-cover pointer-events-none"
                      />
                    </div>

                    {/* Wave layer */}
                    <div
                      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out"
                      style={{
                        opacity: showWaveLayer ? 1 : 0,
                        filter: isMobile
                          ? 'url(#wave-distortion-filter-mobile) grayscale(0.5) brightness(0.75)'
                          : 'url(#wave-distortion-filter) grayscale(0.6) brightness(0.7)',
                        transform: 'scale(1.05)',
                      }}
                    >
                      <Image
                        src={collection.image || '/placeholder.svg'}
                        alt=""
                        fill
                        draggable={false}
                        sizes={isMobile ? '80vw' : '(max-width: 1200px) 60vw, 1200px'}
                        className="object-cover pointer-events-none"
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
                    <p className={`tracking-[0.3em] uppercase text-white/90 ${
                      isMobile ? 'text-[0.6rem] mb-2' : 'text-xs mb-4'
                    }`} style={metaTextShadow}>
                      {collectionMeta}
                    </p>
                    
                    <h2 className={`font-serif font-light tracking-[0.05em] text-white ${
                      isMobile ? 'text-3xl mb-2' : 'text-6xl lg:text-7xl mb-3'
                    }`} style={titleTextShadow}>
                      {collection.title}
                    </h2>
                    
                    <p className={`text-white/95 leading-relaxed ${
                      isMobile ? 'text-xs max-w-[80%]' : 'text-sm max-w-md'
                    }`} style={subtitleTextShadow}>
                      {collection.subtitle}
                    </p>
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
