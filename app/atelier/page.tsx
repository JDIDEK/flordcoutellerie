import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: "L'Atelier | Flo RD Coutellerie",
  description:
    "Découvrez l'atelier de Flo RD Coutellerie : fabrication artisanale, matériaux nobles et savoir-faire d'exception pour des couteaux uniques.",
  openGraph: {
    title: "L'Atelier | Flo RD Coutellerie",
    description: "Découvrez l'atelier de Flo RD Coutellerie et son savoir-faire artisanal.",
    url: 'https://flordcoutellerie.fr/atelier',
  },
}

export default function AtelierPage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen flex flex-col justify-center bg-background pb-20 pt-32 text-foreground font-body">
          <div className="container mx-auto px-6">
            <h1 className="mb-24 text-center font-serif text-3xl font-light tracking-tight text-foreground animate-fade-in-up md:text-6xl">
              L&apos;Atelier
            </h1>

            <div className="mx-auto max-w-2xl space-y-20 text-justify animate-fade-in-up">
              <section>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Pas de production de masse, pas de compromis sur la qualité. Chaque pièce est
                  fabriquée individuellement à la main et sera unique à son propriétaire.
                </p>
              </section>

              <section>
                <div className="space-y-6">
                  <p className="leading-relaxed text-muted-foreground sm:text-lg">
                    Je travaille exclusivement avec de l&apos;acier inoxydable et haut de gamme. Les matériaux
                    utilisés pour les manches sont sélectionnés pour leur caractère. Bois naturels, résines
                    ou matières fossiles présentent chacun des textures, des teintes et des
                    comportements différents.
                  </p>
                  <p className="leading-relaxed text-muted-foreground sm:text-lg">
                    Chaque morceau est unique par nature : le veinage, la couleur et les variations font
                    partie intégrante du matériau et ne peuvent être reproduits à l&apos;identique.
                  </p>
                </div>
              </section>

              <section>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Je m&apos;appelle Florent, 28 ans, ingénieur de formation. J&apos;ai quitté l&apos;industrie, et fait le
                  choix d&apos;un travail artisanal indépendant, plus direct et plus maîtrisé.
                </p>
              </section>
            </div>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}
