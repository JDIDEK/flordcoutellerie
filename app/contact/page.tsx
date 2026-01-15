import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { ContactContent } from '@/components/pages/ContactContent'

export default function ContactPage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <ContactContent />
      </PageTransitionWrapper>
    </>
  )
}
