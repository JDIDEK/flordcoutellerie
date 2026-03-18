'use client'

import dynamic from 'next/dynamic'
import { useCookieConsent } from '@/components/CookieBanner'

const VercelAnalytics = dynamic(
  () => import('@vercel/analytics/react').then((mod) => mod.Analytics),
  { ssr: false },
)

export function AnalyticsGate() {
  const consent = useCookieConsent()

  if (consent !== 'accepted') return null

  return <VercelAnalytics />
}
