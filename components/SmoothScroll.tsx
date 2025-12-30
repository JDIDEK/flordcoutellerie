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

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    const isMobile = isCoarsePointer || isSmallScreen

    let snap: Snap | null = null
    let removeSnaps: (() => void) | null = null
    let removeScrollListener: (() => void) | null = null
    let removeFooterScrollListener: (() => void) | null = null
    let snapTimeout: number | null = null
    let isSnapping = false
    let lastInputId = 0
    let onWindowScroll: (() => void) | null = null
    let onFooterWindowScroll: (() => void) | null = null
    let footerSnapTimeout: number | null = null
    let isFooterSnapping = false

    const stackSections = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-section]'))
    const footer = document.querySelector<HTMLElement>('[data-snap-footer]')
    const hasStackSections = stackSections.length >= 2

    const FOOTER_SNAP_DELAY = 200
    const FOOTER_SNAP_THRESHOLD = 0.9

    if (!isMobile) {
      if (hasStackSections) {
        snap = new Snap(lenis, {
          type: 'proximity',
          duration: 0.9,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          debounce: 400,
          distanceThreshold: '100%',
        })
        removeSnaps = snap.addElements(stackSections, { align: 'start', ignoreSticky: true })
      }
    } else {
      const SNAP_DELAY = 500
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
        if (!hasStackSections) return

        const currentScroll = window.scrollY
        let closestSection: HTMLElement | null = null
        let closestDistance = Number.POSITIVE_INFINITY

        for (const section of stackSections) {
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
          duration: 0.8,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          lock: true,
          userData: { initiator: 'stack-snap' },
          onComplete: () => {
            isSnapping = false
          },
        })
      }

      const scheduleSnap = () => {
        if (isSnapping) return
        clearSnapTimeout()
        const inputId = ++lastInputId
        snapTimeout = window.setTimeout(() => {
          snapTimeout = null
          if (isSnapping || inputId !== lastInputId) return
          snapToClosestSection()
        }, SNAP_DELAY)
      }

      const onLenisScroll = (instance: Lenis) => {
        if (isSnapping) return
        if (instance.userData?.initiator === 'stack-snap') return
        scheduleSnap()
      }

      onWindowScroll = () => {
        if (isSnapping) return
        scheduleSnap()
      }

      removeScrollListener = lenis.on('scroll', onLenisScroll)
      window.addEventListener('scroll', onWindowScroll, { passive: true })
    }

    const clearFooterSnapTimeout = () => {
      if (footerSnapTimeout) {
        window.clearTimeout(footerSnapTimeout)
        footerSnapTimeout = null
      }
    }

    const snapToFooterIfNeeded = () => {
      if (!footer || !hasStackSections) return
      if (!footer.isConnected) return
      if (isFooterSnapping) return

      const rect = footer.getBoundingClientRect()
      const threshold = window.innerHeight * FOOTER_SNAP_THRESHOLD

      if (rect.top <= 0 || rect.top > threshold) return

      isFooterSnapping = true
      lenis.scrollTo(footer, {
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: true,
        userData: { initiator: 'footer-snap' },
        onComplete: () => {
          isFooterSnapping = false
        },
      })
    }

    const scheduleFooterSnap = () => {
      if (!footer || !hasStackSections) return
      clearFooterSnapTimeout()
      footerSnapTimeout = window.setTimeout(() => {
        footerSnapTimeout = null
        snapToFooterIfNeeded()
      }, FOOTER_SNAP_DELAY)
    }

    const onFooterLenisScroll = (instance: Lenis) => {
      if (isFooterSnapping) return
      if (instance.userData?.initiator === 'footer-snap') return
      scheduleFooterSnap()
    }

    onFooterWindowScroll = () => {
      if (isFooterSnapping) return
      scheduleFooterSnap()
    }

    removeFooterScrollListener = lenis.on('scroll', onFooterLenisScroll)
    window.addEventListener('scroll', onFooterWindowScroll, { passive: true })

    return () => {
      if (snapTimeout) {
        window.clearTimeout(snapTimeout)
      }
      clearFooterSnapTimeout()
      if (onWindowScroll) {
        window.removeEventListener('scroll', onWindowScroll)
      }
      if (onFooterWindowScroll) {
        window.removeEventListener('scroll', onFooterWindowScroll)
      }
      removeScrollListener?.()
      removeFooterScrollListener?.()
      removeSnaps?.()
      snap?.destroy()
      lenis.destroy()
      ;(window as any).lenis = null
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [pathname])

  return null
}
