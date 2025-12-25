'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isStudio = pathname?.startsWith('/studio')

    if (isStudio) {
      document.documentElement.style.scrollBehavior = 'auto'
      return
    }

    document.documentElement.style.scrollBehavior = 'smooth'

    const lenis = new Lenis({
      duration: 2.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.55,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchMultiplier: 0.8,
      allowNestedScroll: true,
      infinite: false,
    })

    ;(window as any).lenis = lenis

    let snapTimeout: number | null = null
    let isSnapping = false

    const SNAP_DELAY = 240
    const RESNAP_DELAY = 80
    const SNAP_DISTANCE = 50

    const clearSnapTimeout = () => {
      if (snapTimeout) {
        window.clearTimeout(snapTimeout)
        snapTimeout = null
      }
    }

    const getDocumentTop = (element: HTMLElement) => {
      let top = element.offsetTop
      let parent = element.offsetParent as HTMLElement | null

      while (parent) {
        top += parent.offsetTop
        parent = parent.offsetParent as HTMLElement | null
      }

      return top
    }

    const snapToClosestSection = () => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-section]'))
      if (sections.length < 2) return

      const currentScroll = window.scrollY
      let closestSection: HTMLElement | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      for (const section of sections) {
        const sectionTop = getDocumentTop(section)
        const distance = Math.abs(sectionTop - currentScroll)

        if (distance < closestDistance) {
          closestDistance = distance
          closestSection = section
        }
      }

      if (!closestSection) return

      const targetOffset = getDocumentTop(closestSection)
      if (Math.abs(targetOffset - currentScroll) < SNAP_DISTANCE) return

      clearSnapTimeout()
      isSnapping = true
      lenis.scrollTo(targetOffset, {
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: true,
        userData: { initiator: 'stack-snap' },
        onComplete: () => {
          isSnapping = false
        },
      })
    }

    const scheduleSnap = (delay = SNAP_DELAY) => {
      if (isSnapping) return
      clearSnapTimeout()
      snapTimeout = window.setTimeout(() => {
        snapTimeout = null
        if (isSnapping) return
        if (lenis.isScrolling) {
          scheduleSnap(RESNAP_DELAY)
          return
        }
        snapToClosestSection()
      }, delay)
    }

    const removeScrollListener = lenis.on('scroll', (instance) => {
      if (isSnapping) return
      if (instance.userData?.initiator === 'stack-snap') return
      scheduleSnap()
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      clearSnapTimeout()
      removeScrollListener()
      lenis.destroy()
      ;(window as any).lenis = null
      document.documentElement.style.scrollBehavior = ''
    }
  }, [pathname])

  return null
}
