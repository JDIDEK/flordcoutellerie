'use client'

import { useEffect, useRef } from 'react'

type ParallaxOptions = {
  strength?: number
  disabled?: boolean
  scale?: number
}

export function useParallax<T extends HTMLElement>({
  strength = 16,
  disabled = false,
  scale = 1,
}: ParallaxOptions = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (disabled) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      element.style.transform = `translate3d(0, 0, 0) scale(${scale})`
      return
    }

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches
    const isMobile = isCoarsePointer || isSmallScreen

    if (isMobile) {
      element.style.transform = `translate3d(0, 0, 0) scale(${scale})`
      return
    }

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || 1
      const progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2)
      const clamped = Math.max(-1, Math.min(1, progress))
      const translate = -clamped * strength
      element.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0) scale(${scale})`
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [strength, disabled, scale])

  return ref
}
