import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { HorizontalScrollGallery } from '@/components/HorizontalScrollGallery'
import { TransitionLink } from '@/components/TransitionLink'
import { getGalleryCollections } from '@/lib/sanity/queries'
import { hasImageAsset, urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Galerie | Flo RD Coutellerie',
  description:
    'Galerie photo des réalisations Flo RD Coutellerie : couteaux de cuisine, pliants, outdoor et chasse.',
  openGraph: {
    title: 'Galerie | Flo RD Coutellerie',
    description: 'Galerie photo des réalisations artisanales.',
    url: 'https://flordcoutellerie.fr/galerie',
  },
}

export default async function WorksPage() {
  const galleryCollections = await getGalleryCollections()

  const collections = galleryCollections.map((collection) => {
    const imageUrl = hasImageAsset(collection.coverImage)
      ? urlFor(collection.coverImage.asset).width(2000).height(1200).fit('crop').url()
      : '/placeholder.svg'

    return {
      id: collection._id,
      title: collection.title,
      subtitle:
        collection.description ||
        `Découvrez les réalisations de la collection ${collection.title.toLowerCase()}.`,
      meta:
        collection.entryCount > 0
          ? `${collection.entryCount} entrée${collection.entryCount > 1 ? 's' : ''}`
          : 'Collection en préparation',
      pieces: collection.entryCount,
      category: 'Galerie',
      categorySlug: collection.slug,
      image: imageUrl,
      description: collection.description || '',
    }
  })

  return (
    <>
      <Navigation alwaysVisible />

      <PageTransitionWrapper>
        <main className="min-h-screen">
          {collections.length > 0 ? (
            <HorizontalScrollGallery collections={collections} />
          ) : (
            <div className="flex min-h-screen items-center justify-center bg-background px-6 pt-32 pb-20 text-center">
              <div className="mx-auto max-w-xl space-y-6">
                <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Galerie</p>
                <h1 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-6xl">
                  Aucune collection pour le moment
                </h1>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Créez une collection dans Sanity avec un titre, une image de couverture et un slug
                  pour la voir apparaître ici.
                </p>
                <TransitionLink
                  href="/atelier"
                  className="inline-flex text-sm text-foreground underline underline-offset-4"
                >
                  Retour à l&apos;atelier
                </TransitionLink>
              </div>
            </div>
          )}
        </main>
      </PageTransitionWrapper>
    </>
  )
}
