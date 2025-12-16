'use client'

import { useEffect, useRef, useState } from 'react'

const DESKTOP_SCALE_START = 0.9
const DESKTOP_RADIUS_START = 24
const SCROLL_THRESHOLD_RATIO = 0.6

type HeroVideoStatus = 'loading' | 'canplay' | 'playing' | 'error'

function emitHeroVideo(status: HeroVideoStatus) {
  // Émet un event global pour que le loader puisse attendre la VRAIE vidéo
  window.dispatchEvent(new CustomEvent('hero-video-status', { detail: { status } }))
}

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

  // prefers-reduced-motion -> contrôle autoplay
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

  // desktop breakpoint
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = (event: MediaQueryListEvent) => setIsDesktop(event.matches)

    setIsDesktop(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const videoSrc = isDesktop ? desktopVideoSrc : mobileVideoSrc

  // 🔥 Brancher les events du VRAI <video> et notifier le loader
  useEffect(() => {
    if (!isMounted) return

    const v = videoRef.current
    if (!v) return

    emitHeroVideo('loading')

    const onCanPlay = () => emitHeroVideo('canplay')
    const onPlaying = () => emitHeroVideo('playing')
    const onError = () => emitHeroVideo('error')

    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('playing', onPlaying)
    v.addEventListener('error', onError)

    // On force le navigateur à recharger correctement la source courante
    v.load()

    if (shouldAutoplay) {
      const playPromise = v.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqué : pas grave, le loader a un timeout de sécurité.
        })
      }
    }

    return () => {
      v.removeEventListener('canplay', onCanPlay)
      v.removeEventListener('playing', onPlaying)
      v.removeEventListener('error', onError)
    }
  }, [isMounted, videoSrc, shouldAutoplay])

  // Desktop scroll animation
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDesktop])

  const activeScale = isDesktop ? scale : 1
  const activeBorderRadius = isDesktop ? borderRadius : 0

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90svh] overflow-hidden bg-black text-white lg:min-h-screen"
      data-nav-background-trigger
    >
      <div className="relative h-[90svh] lg:h-screen lg:sticky lg:top-0" style={{ overflow: 'hidden' }}>
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            transform: `scale(${activeScale})`,
            borderRadius: `${activeBorderRadius}px`,
            overflow: 'hidden',
          }}
        >
          <video
            key={videoSrc} // ✅ remount quand la source change
            ref={videoRef}
            src={videoSrc}
            className="h-full w-full object-cover"
            autoPlay={shouldAutoplay}
            muted
            loop
            playsInline
            preload="auto" // ✅ plus agressif que metadata
            poster="/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg"
          />

          <div className="absolute inset-0 bg-black/55 lg:bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 lg:to-black/70" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-6 md:px-10">
          <div className="flex flex-1 items-center justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h2 className="font-serif font-light leading-[0.95] tracking-tight">
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">L&apos;ART</span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">DE LA FORGE</span>
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-5 pb-10 text-center lg:flex-row lg:items-end lg:justify-between lg:pb-14 lg:text-left">
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-neutral-200 sm:text-base lg:mx-0">
              Découvrez le processus de création, de la forge à la finition. Chaque lame raconte une
              histoire.
            </p>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-neutral-300 sm:text-[0.7rem]">
              Atelier • Tradition • Passion
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
