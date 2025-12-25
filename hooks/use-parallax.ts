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
    if (disabled) return
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      element.style.transform = 'translate3d(0, 0, 0)'
      return
    }

    let rafId = 0

    const update = () => {
      rafId = 0
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight || 1
      const progress = (rect.top + rect.height / 2 - windowHeight / 2) / (windowHeight / 2)
      const clamped = Math.max(-1, Math.min(1, progress))
      const responsiveStrength = window.innerWidth < 768 ? strength * 0.6 : strength
      const translate = -clamped * responsiveStrength

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
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [strength, disabled, scale])

  return ref
}