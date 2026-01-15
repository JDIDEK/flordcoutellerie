'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { useCookieConsent } from '@/components/CookieBanner'

export function AnalyticsGate() {
  const consent = useCookieConsent()
  const [AnalyticsComponent, setAnalyticsComponent] = useState<ComponentType | null>(null)

  useEffect(() => {
    if (consent !== 'accepted') return

    let isMounted = true

    import('@vercel/analytics/react').then((mod) => {
      if (!isMounted) return
      setAnalyticsComponent(() => mod.Analytics)
    })

    return () => {
      isMounted = false
    }
  }, [consent])

  if (!AnalyticsComponent) return null

  return <AnalyticsComponent />
}
