'use client'

import { TransitionProvider } from '@/components/TransitionProvider'
import { SmoothScroll } from '@/components/SmoothScroll'
import { FooterWrapper } from '@/components/FooterWraper'
import { CookieBanner } from '@/components/CookieBanner'
import { MotionConfig } from 'framer-motion'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TransitionProvider>
        <SmoothScroll />
        {children}
        <FooterWrapper />
        <CookieBanner />
      </TransitionProvider>
    </MotionConfig>
  )
}
