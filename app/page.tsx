import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: "Flo RD Coutellerie | Couteaux d'Art Français",
  description: "Coutelier d'art français créant des lames sur mesure et pièces uniques. Aciers Damasteel, VG10, 14C28N. Guillochage fleuri et manches en bois précieux.",
  openGraph: {
    title: "Flo RD Coutellerie | Couteaux d'Art Français",
    description: "Coutelier d'art français créant des lames sur mesure et pièces uniques.",
    url: 'https://flordcoutellerie.fr',
    type: 'website',
  },
}
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
