import dynamic from 'next/dynamic'
import { Navigation } from '@/components/navigation'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'
import { HomeHeroSection } from '@/components/home-hero-section'
import { getSignaturePieces } from '@/lib/sanity/queries'

const VideoScrollSection = dynamic(
  () => import('@/components/video-scroll-section').then(mod => ({ default: mod.VideoScrollSection })),
  { ssr: true }
)

const SignatureKnivesSection = dynamic(
  () => import('@/components/signature-knives-section').then(mod => ({ default: mod.SignatureKnivesSection })),
  { ssr: true }
)

export default async function Home() {
  const signaturePieces = await getSignaturePieces()

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen">
        <HomeHeroSection />
        <VideoScrollSection />
        <SignatureKnivesSection pieces={signaturePieces} />
      </main>
      </PageTransitionWrapper>
    </>
  )
}
