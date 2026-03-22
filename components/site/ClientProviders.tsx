'use client'

import { MotionConfig } from 'framer-motion'
import { CookieBanner } from './CookieBanner'
import { FooterWrapper } from './FooterWrapper'
import { SmoothScroll } from './SmoothScroll'
import { TransitionProvider } from './TransitionProvider'

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
