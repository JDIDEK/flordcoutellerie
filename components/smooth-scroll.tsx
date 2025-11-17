'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isReduced = mediaQuery.matches
    const isMobile = window.innerWidth < 768

    // Activer le scroll natif smooth en fallback
    if (isReduced || isMobile) {
      document.documentElement.style.scrollBehavior = 'auto'
      if (isReduced) {
        // Si prefers-reduced-motion, on force un scroll instantané
        document.documentElement.style.scrollBehavior = 'auto'
      }
      return
    }

    // Scroll natif smooth pour les navigateurs qui ne supportent pas Lenis
    document.documentElement.style.scrollBehavior = 'smooth'

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    ;(window as any).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        // L'utilisateur active prefers-reduced-motion : désactiver Lenis et utiliser le scroll natif
        lenis.destroy()
        ;(window as any).lenis = null
        document.documentElement.style.scrollBehavior = 'auto'
      } else {
        // L'utilisateur désactive prefers-reduced-motion : on pourrait réactiver Lenis
        // mais pour simplifier, on garde juste le scroll natif smooth
        document.documentElement.style.scrollBehavior = 'smooth'
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      lenis.destroy()
      ;(window as any).lenis = null
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return null
}
