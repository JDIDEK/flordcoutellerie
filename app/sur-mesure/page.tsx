import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { SurMesureContent } from '@/components/pages/SurMesureContent'

export default function SurMesurePage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <SurMesureContent />
      </PageTransitionWrapper>
    </>
  )
}
