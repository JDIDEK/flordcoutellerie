'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const isReduced = mediaQuery.matches
    const isMobile = window.innerWidth < 768
    const isStudio = pathname?.startsWith('/studio')

    if (isReduced || isMobile || isStudio) {
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

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        lenis.destroy()
        ;(window as any).lenis = null
        document.documentElement.style.scrollBehavior = 'auto'
      } else {
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
  }, [pathname])

  return null
}
