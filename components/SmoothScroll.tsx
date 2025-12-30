'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import Snap from 'lenis/snap'

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const previousScrollBehavior = document.documentElement.style.scrollBehavior

    const isStudio = pathname?.startsWith('/studio')
    if (isStudio) {
      document.documentElement.style.scrollBehavior = 'auto'
      return () => {
        document.documentElement.style.scrollBehavior = previousScrollBehavior
      }
    }

    document.documentElement.style.scrollBehavior = 'auto'

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.55,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 1.3,
      allowNestedScroll: true,
      infinite: false,
      autoRaf: true,
    })

    ;(window as any).lenis = lenis

    const snap = new Snap(lenis, {
      type: 'proximity',
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      debounce: 400,
      distanceThreshold: '100%',
    })

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-section]'))
    const removeSnaps = sections.length
      ? snap.addElements(sections, { align: 'start', ignoreSticky: true })
      : null

    return () => {
      removeSnaps?.()
      snap.destroy()
      lenis.destroy()
      ;(window as any).lenis = null
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [pathname])

  return null
}
