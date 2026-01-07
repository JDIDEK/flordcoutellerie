import dynamic from 'next/dynamic'
import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { getSignaturePieces } from '@/lib/sanity/queries'
import { CustomOrderSection } from '@/components/sections/CustomOrder'

const HomeHeroSection = dynamic(
  () => import('@/components/sections/Hero').then(mod => ({ default: mod.HomeHeroSection })),
  { ssr: true }
)

const SignatureKnivesSection = dynamic(
  () => import('@/components/sections/SignatureKnives').then(mod => ({ default: mod.SignatureKnivesSection })),
  { ssr: true }
)

export default async function Home() {
  const signaturePieces = await getSignaturePieces()

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="relative isolate min-h-screen overflow-visible">
          <HomeHeroSection />
          <CustomOrderSection />
        </main>
      </PageTransitionWrapper>
    </>
  )
}