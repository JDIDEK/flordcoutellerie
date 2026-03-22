'use client'

import { useEffect } from 'react'

function setAppHeight() {
  const visualViewportHeight = window.visualViewport?.height
  const viewportHeight =
    typeof visualViewportHeight === 'number' && visualViewportHeight > 0
      ? visualViewportHeight
      : window.innerHeight

  // Round up to avoid 1px gaps where the next section peeks through.
  document.documentElement.style.setProperty('--app-height', `${Math.ceil(viewportHeight)}px`)
}

export function ViewportHeight() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    let frameId: number | null = null
    const timeoutIds: number[] = []

    const syncHeight = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }

      frameId = requestAnimationFrame(() => {
        setAppHeight()
        frameId = null
      })
    }

    const syncHeightSettled = () => {
      syncHeight()

      while (timeoutIds.length > 0) {
        const timeoutId = timeoutIds.pop()
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId)
        }
      }

      timeoutIds.push(window.setTimeout(syncHeight, 120))
      timeoutIds.push(window.setTimeout(syncHeight, 320))
    }

    syncHeightSettled()

    const visualViewport = window.visualViewport
    const onViewportChange = () => syncHeightSettled()
    const onPageShow = () => syncHeightSettled()
    const onLoaderFinished = () => syncHeightSettled()

    window.addEventListener('resize', onViewportChange, { passive: true })
    window.addEventListener('orientationchange', onViewportChange, { passive: true })
    window.addEventListener('pageshow', onPageShow as EventListener, { passive: true })
    window.addEventListener('site-loader-finished', onLoaderFinished as EventListener)
    visualViewport?.addEventListener('resize', onViewportChange, { passive: true })

    return () => {
      window.removeEventListener('resize', onViewportChange)
      window.removeEventListener('orientationchange', onViewportChange as EventListener)
      window.removeEventListener('pageshow', onPageShow as any)
      window.removeEventListener('site-loader-finished', onLoaderFinished as EventListener)
      visualViewport?.removeEventListener('resize', onViewportChange)

      while (timeoutIds.length > 0) {
        const timeoutId = timeoutIds.pop()
        if (timeoutId !== undefined) {
          window.clearTimeout(timeoutId)
        }
      }

      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return null
}
