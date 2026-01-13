'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const rafIdRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = performance.now()

    // Animation fluide de 0 à 100 en ~1.2 secondes
    const duration = 1200
    
    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current
      const rawProgress = Math.min(100, (elapsed / duration) * 100)
      
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - rawProgress / 100, 3)
      setProgress(eased * 100)

      if (rawProgress < 100) {
        rafIdRef.current = requestAnimationFrame(tick)
      } else {
        // Fin du chargement
        setProgress(100)
        setTimeout(() => {
          setIsLoading(false)
          setTimeout(() => setIsVisible(false), 500)
        }, 150)
      }
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  useEffect(() => {
    if (isLoading) return
    document.documentElement.dataset.siteLoaderComplete = 'true'
    window.dispatchEvent(new Event('site-loader-finished'))
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="overflow-hidden">
          <div
            className={`transition-transform duration-700 delay-100 ${
              isLoading ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            {/* Logo Clair pour thème sombre, Logo Noir pour thème clair */}
            <Image
              src="/assets/images/Logo-Noir-Grand.svg"
              alt="Flo RD Coutellerie"
              width={200}
              height={80}
              priority
              className="block dark:hidden"
            />
            <Image
              src="/assets/images/Logo-Clair-Grand.svg"
              alt="Flo RD Coutellerie"
              width={200}
              height={80}
              priority
              className="hidden dark:block"
            />
          </div>
        </div>

        <div className="relative mt-4 h-[1px] w-32 overflow-hidden bg-muted">
          <div
            className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="tabular-nums text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}
