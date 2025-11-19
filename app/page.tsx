import { Navigation } from '@/components/navigation'
import { VideoScrollSection } from '@/components/video-scroll-section'
import { SignatureKnivesSection } from '@/components/signature-knives-section'
import { HomeHeroSection } from '@/components/home-hero-section'
import { HomeFooter } from '@/components/home-footer'
import { getSignaturePieces } from '@/lib/sanity/queries'

export const revalidate = 60

export default async function Home() {
  const signaturePieces = await getSignaturePieces()

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <HomeHeroSection />
        <VideoScrollSection />
        <SignatureKnivesSection pieces={signaturePieces} />
        <HomeFooter />
      </main>
    </>
  )
}
