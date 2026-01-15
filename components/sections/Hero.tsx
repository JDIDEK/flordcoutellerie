'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import BackgroundVideo from 'next-video/background-video'
import mainVideo from '@/videos/main-video.mp4'
import { useParallax } from '@/hooks/use-parallax'

type HeroVideoStatus = 'loading' | 'canplay' | 'playing' | 'error'

function emitHeroVideo(status: HeroVideoStatus) {
  window.dispatchEvent(new CustomEvent('hero-video-status', { detail: { status } }))
}

export function HomeHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.dataset.siteLoaderComplete === 'true'
  })

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    return isCoarsePointer || isSmallScreen
  }, [])

  const videoParallaxRef = useParallax<HTMLDivElement>({ strength: 10, scale: 1.03, disabled: isMobile })

  useEffect(() => {
    if (isRevealed) return
    const handleReveal = () => setIsRevealed(true)
    window.addEventListener('site-loader-finished', handleReveal)
    return () => window.removeEventListener('site-loader-finished', handleReveal)
  }, [isRevealed])

  useEffect(() => {
    if (!videoRef.current) return
    const playPromise = videoRef.current.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {})
    }
  }, [])

  useEffect(() => {
    emitHeroVideo('loading')
  }, [])

  return (
    <section
      className="sticky top-0 z-10 h-[var(--app-height)] w-full overflow-hidden bg-black text-white"
      data-stack-section
    >
      <div ref={videoParallaxRef} className="absolute inset-0 will-change-transform">
        <BackgroundVideo
          ref={videoRef}
          src={mainVideo}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadStart={() => emitHeroVideo('loading')}
          onCanPlay={() => emitHeroVideo('canplay')}
          onPlaying={() => emitHeroVideo('playing')}
          onError={() => emitHeroVideo('error')}
        />
      </div>

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/40 to-black/85" />

      <div className="pointer-events-none absolute inset-0 flex items-start md:items-center justify-center px-6 pt-24 md:pt-0">
        <Image
          src="/assets/images/Logo-Clair-Grand.svg"
          alt="Flo RD Coutellerie"
          width={320}
          height={140}
          className="h-auto w-[min(55vw,240px)] sm:w-[min(50vw,320px)] opacity-70 drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
          priority
        />
      </div>

      <div className="relative z-10 flex h-full flex-col px-6 pb-10 pt-24 md:px-12 lg:px-16">
        <div className="flex flex-1 items-end">
          <div className="ml-auto w-full max-w-3xl space-y-5 text-left md:text-right">
            <p
              className={`text-[0.65rem] uppercase tracking-[0.4em] text-white/70 ${
                isRevealed ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
              }`}
            >
              Lames sur-mesure
            </p>

            <h1 className="font-serif text-[clamp(2.2rem,8vw,6rem)] font-light leading-[0.9] tracking-tight overflow-visible">
              <span
                className={`block ${
                  isRevealed ? 'animate-fade-in-up animation-delay-200' : 'opacity-0 translate-y-4'
                }`}
              >
                FLO RD
              </span>
              <span
                className={`block ${
                  isRevealed ? 'animate-fade-in-up animation-delay-400' : 'opacity-0 translate-y-4'
                }`}
              >
                COUTELLERIE
              </span>
            </h1>

            <p
              className={`max-w-xl text-sm leading-relaxed text-white/80 md:ml-auto md:text-base ${
                isRevealed ? 'animate-fade-in-up animation-delay-600' : 'opacity-0 translate-y-4'
              }`}
            >
              Des pièces uniques forgées en France, pensées pour les chefs et collectionneurs qui recherchent une
              lame équilibrée, élégante et durable.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 text-[0.6rem] uppercase tracking-[0.4em] text-white/50 lg:flex ${
          isRevealed ? 'animate-fade-in animation-delay-800' : 'opacity-0'
        }`}
      >
        <span className="[writing-mode:vertical-rl] rotate-180">Flo RD</span>
        <span className="h-16 w-px bg-white/25" />
        <span className="[writing-mode:vertical-rl] rotate-180">Atelier</span>
      </div>
    </section>
  )
}
