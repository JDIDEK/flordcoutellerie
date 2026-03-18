import * as React from 'react'

const MOBILE_BREAKPOINT = 768

function subscribeToMediaQuery(query: string, callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const mediaQueryList = window.matchMedia(query)
  const handleChange = () => callback()

  mediaQueryList.addEventListener('change', handleChange)

  return () => {
    mediaQueryList.removeEventListener('change', handleChange)
  }
}

function getMediaQuerySnapshot(query: string) {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia(query).matches
}

export function useMediaQuery(query: string, serverSnapshot = false) {
  return React.useSyncExternalStore(
    (callback) => subscribeToMediaQuery(query, callback),
    () => getMediaQuerySnapshot(query),
    () => serverSnapshot,
  )
}

export function useIsMobile() {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
}
