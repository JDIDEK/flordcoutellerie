import type { Metadata } from 'next'
import { Navigation } from '@/components/site/Navigation'
import { PageTransitionWrapper } from '@/components/site/PageTransitionWrapper'
import { HomeHeroSection } from './_components/home/HomeHeroSection'
import { HomeQuickAccessSection } from './_components/home/HomeQuickAccessSection'

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

export default async function Home() {
  return (
    <>
      <Navigation alwaysVisible />

      <PageTransitionWrapper>
        <main className="relative isolate min-h-screen overflow-x-hidden bg-background">
          <HomeHeroSection />
          <HomeQuickAccessSection />
        </main>
      </PageTransitionWrapper>
    </>
  )
}
