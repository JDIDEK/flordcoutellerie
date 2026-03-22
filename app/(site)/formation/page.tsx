import type { Metadata } from 'next'
import { Navigation } from '@/components/site/Navigation'
import { PageTransitionWrapper } from '@/components/site/PageTransitionWrapper'
import { FormationContent } from './_components/FormationContent'

export const metadata: Metadata = {
  title: 'Formation | Flo RD Coutellerie',
  description: 'Formation coutellerie artisanale : apprenez la forge et la fabrication de couteaux avec un artisan coutelier professionnel.',
  openGraph: {
    title: 'Formation | Flo RD Coutellerie',
    description: 'Formation coutellerie artisanale avec un artisan professionnel.',
    url: 'https://flordcoutellerie.fr/formation',
  },
}

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
