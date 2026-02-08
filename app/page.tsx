import dynamic from 'next/dynamic'
import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { HomeQuickAccessSection } from '@/components/sections/QuickAccess'

const HomeHeroSection = dynamic(
  () => import('@/components/sections/Hero').then(mod => ({ default: mod.HomeHeroSection })),
  { ssr: true }
)

export default async function Home() {
  return (
    <>
      <Navigation alwaysVisible />

      <PageTransitionWrapper>
        <main className="relative isolate min-h-screen overflow-visible">
          <HomeHeroSection />
          <HomeQuickAccessSection />
        </main>
      </PageTransitionWrapper>
    </>
  )
}
