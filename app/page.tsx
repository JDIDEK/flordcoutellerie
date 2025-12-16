import dynamic from 'next/dynamic'
import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { HomeHeroSection } from '@/components/Hero'
import { getSignaturePieces } from '@/lib/sanity/queries'

const VideoScrollSection = dynamic(
  () => import('@/components/Video').then(mod => ({ default: mod.VideoScrollSection })),
  { ssr: true }
)

const SignatureKnivesSection = dynamic(
  () => import('@/components/SignatureKnives').then(mod => ({ default: mod.SignatureKnivesSection })),
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
