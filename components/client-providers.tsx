'use client'

import { TransitionProvider } from '@/components/transition-provider'
import { SmoothScroll } from '@/components/smooth-scroll'
import { FooterWrapper } from '@/components/footer-wrapper'
import { CookieBanner } from '@/components/cookie-banner'

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
