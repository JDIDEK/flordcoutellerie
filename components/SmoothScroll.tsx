'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    const isMobile = isCoarsePointer || isSmallScreen

    if (prefersReducedMotion || isCoarsePointer) {
      return () => {
        document.documentElement.style.scrollBehavior = previousScrollBehavior
      }
    }

    let isCancelled = false
    let snapTimeout: number | null = null
    let isSnapping = false
    let lastInputId = 0
    let onWindowScroll: (() => void) | null = null
    let removeScrollListener: (() => void) | null = null
    let removeFooterGuardListener: (() => void) | null = null
    let removeSnaps: (() => void) | null = null

    const setupLenis = async () => {
      const [{ default: Lenis }, snapModule] = await Promise.all([
        import('lenis'),
        import('lenis/snap').catch(() => null),
      ])

      if (isCancelled || !Lenis) return

      document.documentElement.style.scrollBehavior = 'auto'

      const lenis = new Lenis({
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

      const stackSections = Array.from(document.querySelectorAll<HTMLElement>('[data-stack-section]'))
      const footer = document.querySelector<HTMLElement>('[data-snap-footer]')
      const hasStackSections = stackSections.length >= 2
      const FOOTER_STOP_THRESHOLD = 0.85

      const isFooterInZone = () => {
        if (!footer || !footer.isConnected) return false
        return footer.getBoundingClientRect().top <= window.innerHeight * FOOTER_STOP_THRESHOLD
      }

      let snap: any = null
      let isSnapStoppedByFooter = false
      const SnapConstructor = snapModule?.default ?? null

      const updateSnapForFooter = () => {
        if (!snap) return
        const shouldStop = isFooterInZone()
        if (shouldStop && !isSnapStoppedByFooter) {
          snap.stop()
          isSnapStoppedByFooter = true
          return
        }
        if (!shouldStop && isSnapStoppedByFooter) {
          snap.start()
          isSnapStoppedByFooter = false
        }
      }

      if (!isMobile && hasStackSections && SnapConstructor) {
        snap = new SnapConstructor(lenis, {
          type: 'proximity',
          duration: 0.9,
          easing: (t: number) => 1 - Math.pow(1 - t, 3),
          debounce: 400,
          distanceThreshold: '100%',
        })
        removeSnaps = snap.addElements(stackSections, { align: 'start', ignoreSticky: true })
        removeFooterGuardListener = lenis.on('scroll', updateSnapForFooter)
      } else if (isMobile) {
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
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            lock: true,
            userData: { initiator: 'stack-snap' },
            onComplete: () => {
              isSnapping = false
            },
          })
        }

        const scheduleSnap = () => {
          if (isSnapping) return
          if (isFooterInZone()) {
            clearSnapTimeout()
            return
          }
          clearSnapTimeout()
          const inputId = ++lastInputId
          snapTimeout = window.setTimeout(() => {
            snapTimeout = null
            if (isSnapping || inputId !== lastInputId) return
            snapToClosestSection()
          }, SNAP_DELAY)
        }

        const onLenisScroll = (instance: any) => {
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

      return () => {
        if (snapTimeout) {
          window.clearTimeout(snapTimeout)
        }
        if (onWindowScroll) {
          window.removeEventListener('scroll', onWindowScroll)
        }
        removeScrollListener?.()
        removeFooterGuardListener?.()
        removeSnaps?.()
        snap?.destroy()
        lenis.destroy()
        ;(window as any).lenis = null
      }
    }

    let teardown: (() => void) | void
    setupLenis().then((fn) => {
      teardown = fn
    })

    return () => {
      isCancelled = true
      teardown?.()
      document.documentElement.style.scrollBehavior = previousScrollBehavior
    }
  }, [pathname])

  return null
}
