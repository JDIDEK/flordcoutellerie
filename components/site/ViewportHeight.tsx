'use client'

import { useEffect } from 'react'

function setAppHeight() {
  const h = window.innerHeight
  document.documentElement.style.setProperty('--app-height', `${h}px`)
}

export function ViewportHeight() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    setAppHeight()

    const onOrientation = () => {
      setTimeout(() => setAppHeight(), 50)
      setTimeout(() => setAppHeight(), 250)
    }

    const onPageShow = () => {
      setTimeout(() => setAppHeight(), 50)
    }

    window.addEventListener('orientationchange', onOrientation, { passive: true })
    window.addEventListener('pageshow', onPageShow as any, { passive: true })

    return () => {
      window.removeEventListener('orientationchange', onOrientation as any)
      window.removeEventListener('pageshow', onPageShow as any)
    }
  }, [])

  return null
}
