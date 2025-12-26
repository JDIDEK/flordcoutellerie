'use client'

import { useEffect } from 'react'

function setAppHeight() {
  const h = window.visualViewport?.height ?? window.innerHeight
  document.documentElement.style.setProperty('--app-height', `${h}px`)
}

export function ViewportHeight() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    setAppHeight()

    const vv = window.visualViewport
    const onChange = () => setAppHeight()

    window.addEventListener('resize', onChange, { passive: true })
    window.addEventListener('orientationchange', onChange, { passive: true })

    if (vv) {
      vv.addEventListener('resize', onChange as any, { passive: true } as any)
      vv.addEventListener('scroll', onChange as any, { passive: true } as any)
    }

    return () => {
      window.removeEventListener('resize', onChange as any)
      window.removeEventListener('orientationchange', onChange as any)
      if (vv) {
        vv.removeEventListener('resize', onChange as any)
        vv.removeEventListener('scroll', onChange as any)
      }
    }
  }, [])

  return null
}
