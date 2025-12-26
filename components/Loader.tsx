'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type HeroVideoStatus = 'loading' | 'canplay' | 'playing' | 'error'

type ResourceKey = 'dom' | 'fonts' | 'video'

type ResourceState = {
  loaded: boolean
  weight: number
  startedAt?: number
  endedAt?: number
}

export function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const rafIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const finishingRef = useRef(false)

  const resourcesRef = useRef<Record<ResourceKey, ResourceState>>({
    video: { loaded: false, weight: 70 },
    dom: { loaded: false, weight: 20 },
    fonts: { loaded: false, weight: 10 },
  })

  const markLoaded = useCallback((key: ResourceKey) => {
    const r = resourcesRef.current[key]
    if (r.loaded) return
    r.loaded = true
    r.endedAt = performance.now()
  }, [])

  const computeRealProgress = useCallback(() => {
    const resources = resourcesRef.current
    let total = 0
    ;(Object.keys(resources) as ResourceKey[]).forEach((k) => {
      const r = resources[k]
      if (r.loaded) total += r.weight
    })
    return Math.max(0, Math.min(100, total))
  }, [])

  const finishLoading = useCallback(() => {
    if (finishingRef.current) return
    finishingRef.current = true

    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setIsVisible(false), 700)
    }, 250)
  }, [])

  useEffect(() => {
    startTimeRef.current = performance.now()

    const resources = resourcesRef.current
    ;(Object.keys(resources) as ResourceKey[]).forEach((k) => {
      resources[k].startedAt = performance.now()
    })

    const checkDOM = () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        markLoaded('dom')
      }
    }

    checkDOM()
    document.addEventListener('DOMContentLoaded', checkDOM)

    let fontsDone = false
    const fontsTimeout = window.setTimeout(() => {
      if (!fontsDone) markLoaded('fonts')
    }, 2500)

    if ((document as any).fonts?.ready) {
      ;(document as any).fonts.ready
        .then(() => {
          fontsDone = true
          clearTimeout(fontsTimeout)
          markLoaded('fonts')
        })
        .catch(() => {
          fontsDone = true
          clearTimeout(fontsTimeout)
          markLoaded('fonts')
        })
    } else {
      fontsDone = true
      clearTimeout(fontsTimeout)
      markLoaded('fonts')
    }

    const onHeroVideoStatus = (e: Event) => {
      const evt = e as CustomEvent<{ status: HeroVideoStatus }>
      const status = evt.detail?.status
      if (status === 'playing' || status === 'error') {
        markLoaded('video')
      }
    }

    window.addEventListener('hero-video-status', onHeroVideoStatus)

    const hardTimeout = window.setTimeout(() => {
      markLoaded('video')
      markLoaded('dom')
      markLoaded('fonts')
      finishLoading()
    }, 8000)

    return () => {
      clearTimeout(hardTimeout)
      clearTimeout(fontsTimeout)
      document.removeEventListener('DOMContentLoaded', checkDOM)
      window.removeEventListener('hero-video-status', onHeroVideoStatus)
    }
  }, [finishLoading, markLoaded])

  useEffect(() => {
    if (!isVisible) return

    const tick = () => {
      const real = computeRealProgress()
      setProgress((prev) => {
        if (real >= 100) return 100
        const step = Math.max(0.6, (real - prev) * 0.18)
        const next = prev + step
        return next > real ? real : next
      })

      const current = computeRealProgress()
      if (current >= 100) {
        finishLoading()
        return
      }

      rafIdRef.current = requestAnimationFrame(tick)
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
  }, [computeRealProgress, finishLoading, isVisible])

  useEffect(() => {
    if (isLoading) return
    document.documentElement.dataset.siteLoaderComplete = 'true'
    window.dispatchEvent(new Event('site-loader-finished'))
  }, [isLoading])

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
            className="absolute inset-y-0 left-0 bg-white transition-[width] duration-150 ease-out"
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
