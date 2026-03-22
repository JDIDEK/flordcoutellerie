import type { Metadata } from 'next'
import { Navigation } from '@/components/site/Navigation'
import { PageTransitionWrapper } from '@/components/site/PageTransitionWrapper'
import { SurMesureContent } from './_components/SurMesureContent'

export const metadata: Metadata = {
  title: 'Sur Mesure | Flo RD Coutellerie',
  description: 'Configurez votre couteau sur mesure : choix de l\'acier, du manche, du guillochage et de la forme. Devis gratuit et sans engagement.',
  openGraph: {
    title: 'Sur Mesure | Flo RD Coutellerie',
    description: 'Configurez votre couteau sur mesure. Devis gratuit et sans engagement.',
    url: 'https://flordcoutellerie.fr/sur-mesure',
  },
}

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
