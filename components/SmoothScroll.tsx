'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768
    const isStudio = pathname?.startsWith('/studio')

    // Désactiver Lenis sur mobile pour meilleures performances
    if (isMobile || isStudio) {
      document.documentElement.style.scrollBehavior = 'auto'
      return
    }

    document.documentElement.style.scrollBehavior = 'smooth'

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    ;(window as any).lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      ;(window as any).lenis = null
      document.documentElement.style.scrollBehavior = ''
    }
  }, [pathname])

  return null
}
