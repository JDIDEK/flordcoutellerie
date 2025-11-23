import { Navigation } from '@/components/navigation'
import { VideoScrollSection } from '@/components/video-scroll-section'
import { SignatureKnivesSection } from '@/components/signature-knives-section'
import { HomeHeroSection } from '@/components/home-hero-section'
import { getSignaturePieces } from '@/lib/sanity/queries'


export default async function Home() {
  const signaturePieces = await getSignaturePieces()

  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        <HomeHeroSection />
        <VideoScrollSection />
        <SignatureKnivesSection pieces={signaturePieces} />
      </main>
    </>
  )
}
