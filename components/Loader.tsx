'use client'

import { useCallback, useEffect, useState } from 'react'

type HeroVideoStatus = 'loading' | 'canplay' | 'playing' | 'error'

export function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const finishLoading = useCallback(() => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setIsVisible(false), 700)
    }, 300)
  }, [])

  useEffect(() => {
    const resources = {
      video: { loaded: false, weight: 70 }, // ✅ on attend que la VRAIE vidéo soit "playing"
      dom: { loaded: false, weight: 20 },
      fonts: { loaded: false, weight: 10 },
    }

    const updateProgress = () => {
      let total = 0
      Object.values(resources).forEach((r) => {
        if (r.loaded) total += r.weight
      })
      setProgress(total)

      if (total >= 100) {
        finishLoading()
      }
    }

    // DOM
    const checkDOM = () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        resources.dom.loaded = true
        updateProgress()
      }
    }

    checkDOM()
    document.addEventListener('DOMContentLoaded', checkDOM)

    // Fonts
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        resources.fonts.loaded = true
        updateProgress()
      })
    } else {
      // Fallback
      resources.fonts.loaded = true
      updateProgress()
    }

    // Vidéo réelle : on écoute l'event envoyé par VideoScrollSection
    const onHeroVideoStatus = (e: Event) => {
      const evt = e as CustomEvent<{ status: HeroVideoStatus }>
      const status = evt.detail?.status

      // "playing" = la vidéo tourne réellement (c'est ce que tu veux avant de hide le loader)
      // "error" = on ne bloque pas l'UX si le navigateur refuse/autre problème
      if (status === 'playing' || status === 'error') {
        resources.video.loaded = true
        updateProgress()
      }
    }

    window.addEventListener('hero-video-status', onHeroVideoStatus)

    // Timeout sécurité (évite un loader infini sur iOS/autoplay bloqué)
    const timeout = setTimeout(() => {
      finishLoading()
    }, 8000)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('DOMContentLoaded', checkDOM)
      window.removeEventListener('hero-video-status', onHeroVideoStatus)
    }
  }, [finishLoading])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="overflow-hidden">
          <h1
            className={`font-serif text-2xl tracking-[0.3em] text-white transition-transform duration-700 delay-100 sm:text-3xl ${
              isLoading ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            FLO RD
          </h1>
        </div>

        <div className="overflow-hidden">
          <p
            className={`text-[0.6rem] uppercase tracking-[0.4em] text-neutral-400 transition-transform duration-700 delay-200 sm:text-[0.7rem] ${
              isLoading ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            Coutellerie d&apos;Art
          </p>
        </div>

        <div className="relative mt-4 h-[1px] w-32 overflow-hidden bg-neutral-800">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="tabular-nums text-[0.6rem] uppercase tracking-[0.3em] text-neutral-500">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}
