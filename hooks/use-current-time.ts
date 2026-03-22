'use client'

import { useSyncExternalStore } from 'react'

function getNowSnapshot() {
  return Math.floor(Date.now() / 1000) * 1000
}

function getServerSnapshot() {
  return 0
}

function createClockSubscriber(enabled: boolean) {
  return (callback: () => void) => {
    if (!enabled) {
      return () => {}
    }

    const interval = window.setInterval(callback, 1000)
    return () => window.clearInterval(interval)
  }
}

export function useCurrentTime(enabled = true) {
  return useSyncExternalStore(
    createClockSubscriber(enabled),
    getNowSnapshot,
    getServerSnapshot
  )
}
