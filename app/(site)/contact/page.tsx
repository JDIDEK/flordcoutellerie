import type { Metadata } from 'next'
import { Navigation } from '@/components/site/Navigation'
import { PageTransitionWrapper } from '@/components/site/PageTransitionWrapper'
import { ContactContent } from './_components/ContactContent'

export const metadata: Metadata = {
  title: 'Contact | Flo RD Coutellerie',
  description: 'Contactez Flo RD Coutellerie pour une commande sur mesure, un devis ou toute question. Réponse personnelle garantie.',
  openGraph: {
    title: 'Contact | Flo RD Coutellerie',
    description: 'Contactez Flo RD Coutellerie pour une commande sur mesure ou toute question.',
    url: 'https://flordcoutellerie.fr/contact',
  },
}

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
