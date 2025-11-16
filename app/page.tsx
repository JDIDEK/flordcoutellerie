'use client'

import { Navigation } from '@/components/navigation'
import { VideoScrollSection } from '@/components/video-scroll-section'
import { SignatureKnivesSection } from '@/components/signature-knives-section'
import { HomeHeroSection } from '@/components/home-hero-section'
import { HomeFooter } from '@/components/home-footer'

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <HomeHeroSection />
        <VideoScrollSection />
        <SignatureKnivesSection />
        <HomeFooter />
      </main>
    </>
  )
}
