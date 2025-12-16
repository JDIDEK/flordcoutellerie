'use client'

import { TransitionProvider } from '@/components/TransitionProvider'
import { SmoothScroll } from '@/components/SmoothScroll'
import { FooterWrapper } from '@/components/FooterWraper'
import { CookieBanner } from '@/components/CookieBanner'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <TransitionProvider>
      <SmoothScroll />
      {children}
      <FooterWrapper />
      <CookieBanner />
    </TransitionProvider>
  )
}
