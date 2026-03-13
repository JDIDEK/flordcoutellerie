import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { WorkshopSideRails } from '@/components/WorkshopSideRails'
import { getGalleryImages } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

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

export default async function AboutPage() {
  const galleryImages = await getGalleryImages()
  
  // Les images sont mélangées aléatoirement ici à chaque rechargement
  const shuffledImages = shuffle(
    galleryImages.map((image) => ({
      id: image._id,
      src:
        urlFor(image.image).width(600).height(800).fit('crop').url() ??
        '/placeholder.svg',
      alt: image.label ?? "Couteau d'atelier",
    }))
  )

  const leftImages = shuffledImages.filter((_, index) => index % 2 === 0).slice(0, 6)
  const rightImages = shuffledImages.filter((_, index) => index % 2 === 1).slice(0, 6)

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        {/* On ajoute 'relative' et 'overflow-hidden' au main pour contenir les effets */}
        <main className="relative min-h-screen bg-background pb-20 pt-32 overflow-hidden">
          
          {/* Les carrousels sont maintenant injectés en arrière-plan */}
          <WorkshopSideRails leftImages={leftImages} rightImages={rightImages} />

          {/* Le contenu principal centré par-dessus */}
          <div className="container relative z-10 mx-auto px-6">
            <div className="mx-auto max-w-2xl text-justify">
              <h1 className="mb-24 text-center text-3xl font-light tracking-tight animate-fade-in-up md:text-6xl">
                L&apos;Atelier
              </h1>

              <section className="mx-auto mb-20">
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Pas de production de masse, pas de compromis sur la qualité. Chaque pièce est
                  fabriquée individuellement à la main et sera unique à son propriétaire.
                </p>
              </section>

              <section className="mx-auto mb-20">
                <h2 className="mb-10 text-2xl font-serif font-light text-foreground md:text-3xl">
                  Les matériaux
                </h2>
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

              <section className="mx-auto">
                <h2 className="mb-10 text-2xl font-serif font-light text-foreground md:text-3xl">
                  L&apos;artisan
                </h2>
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

function shuffle<T>(items: T[]) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

export function AtelierLoading() {
  return (
    <main className="relative min-h-screen bg-background pb-20 pt-32 overflow-hidden">
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-2xl text-justify">
          <div className="mx-auto mb-24 h-14 w-64 animate-pulse rounded-full bg-muted/50" />

          <section className="mb-20">
            <div className="space-y-3">
              <div className="h-5 animate-pulse rounded-full bg-muted/30" />
              <div className="h-5 animate-pulse rounded-full bg-muted/30" />
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-muted/30" />
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-10 h-10 w-48 animate-pulse rounded-full bg-muted/50" />
            <div className="space-y-3">
              <div className="h-5 animate-pulse rounded-full bg-muted/30" />
              <div className="h-5 animate-pulse rounded-full bg-muted/30" />
              <div className="h-5 w-5/6 animate-pulse rounded-full bg-muted/30" />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}