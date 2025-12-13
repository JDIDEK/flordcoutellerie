'use client'

import { useEffect, useRef, useState } from 'react'

const DESKTOP_SCALE_START = 0.9
const DESKTOP_RADIUS_START = 24
const SCROLL_THRESHOLD_RATIO = 0.6

export function VideoScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scale, setScale] = useState(1)
  const [borderRadius, setBorderRadius] = useState(0)
  const [shouldAutoplay, setShouldAutoplay] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const desktopVideoSrc = '/assets/videos/main-video.mp4'
  const mobileVideoSrc = '/assets/videos/mobile_main-video.mp4'

  // Track mount state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (event: MediaQueryListEvent) => {
      const autoplay = !event.matches
      setShouldAutoplay(autoplay)

      if (!autoplay && videoRef.current) {
        videoRef.current.pause()
      }
    }

    setShouldAutoplay(!mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)

    setIsDesktop(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Play video on mobile when mounted
  useEffect(() => {
    if (!isMounted) return
    
    if (shouldAutoplay && videoRef.current) {
      // Attempt to play video (works on mobile with muted + playsInline)
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, that's ok
        })
      }
    }
  }, [isMounted, shouldAutoplay, isDesktop])

  useEffect(() => {
    if (!isDesktop) {
      setScale(1)
      setBorderRadius(0)
      return
    }

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const threshold = windowHeight * SCROLL_THRESHOLD_RATIO

      if (rect.top >= threshold) {
        setScale(DESKTOP_SCALE_START)
        setBorderRadius(DESKTOP_RADIUS_START)
        return
      }

      if (rect.top <= threshold && rect.bottom >= threshold) {
        const distance = Math.max(0, Math.min(threshold, threshold - rect.top))
        const progress = distance / threshold
        const nextScale = DESKTOP_SCALE_START + progress * 0.1
        const nextRadius = DESKTOP_RADIUS_START * (1 - progress)

        setScale(nextScale)
        setBorderRadius(nextRadius)
      } else if (rect.bottom < threshold) {
        setScale(1)
        setBorderRadius(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    if (shouldAutoplay) {
      videoRef.current?.play().catch(() => {})
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop, shouldAutoplay])

  const activeScale = isDesktop ? scale : 1
  const activeBorderRadius = isDesktop ? borderRadius : 0
  const videoSrc = isDesktop ? desktopVideoSrc : mobileVideoSrc

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90svh] overflow-hidden bg-black text-white lg:min-h-screen"
      data-nav-background-trigger
    >
      <div
        className="relative h-[90svh] lg:h-screen lg:sticky lg:top-0"
        style={{ overflow: 'hidden' }}
      >
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            transform: `scale(${activeScale})`,
            borderRadius: `${activeBorderRadius}px`,
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-cover"
            autoPlay={shouldAutoplay}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg"
          />

          <div className="absolute inset-0 bg-black/55 lg:bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 lg:to-black/70" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-6 md:px-10">
          <div className="flex-1 flex items-center justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h2 className="font-serif font-light leading-[0.95] tracking-tight">
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">L&apos;ART</span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">DE LA FORGE</span>
              </h2>
            </div>
          </div>

          <div className="pb-10 lg:pb-14 flex flex-col gap-5 text-center lg:text-left lg:flex-row lg:items-end lg:justify-between">
            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Découvrez le processus de création, de la forge à la finition. Chaque lame raconte une
              histoire.
            </p>
            <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300">
              Atelier • Tradition • Passion
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
