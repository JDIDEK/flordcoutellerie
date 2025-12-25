'use client'

import { Analytics } from '@vercel/analytics/next'

import { useCookieConsent } from '@/components/CookieBanner'

export function AnalyticsWrapper() {
  const consent = useCookieConsent()

  if (consent !== 'accepted') {
    return null
  }

  return <Analytics />
}
