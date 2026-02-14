import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { FormationContent } from '@/components/pages/FormationContent'

export default function FormationPage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <FormationContent />
      </PageTransitionWrapper>
    </>
  )
}
