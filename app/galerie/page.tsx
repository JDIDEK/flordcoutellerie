import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { HorizontalScrollGallery } from '@/components/HorizontalScrollGallery'
import {
  galleryCategoryContent,
  groupGalleryImagesByCategory,
  orderedGalleryCategories,
} from '@/lib/gallery'
import { getGalleryImages } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'Galerie | Flo RD Coutellerie',
  description:
    'Galerie photo des realisations Flo RD Coutellerie : couteaux de cuisine, pliants, outdoor et chasse.',
  openGraph: {
    title: 'Galerie | Flo RD Coutellerie',
    description: 'Galerie photo des realisations artisanales.',
    url: 'https://flordcoutellerie.fr/galerie',
  },
}

function createCollections(
  groupedImages: ReturnType<typeof groupGalleryImagesByCategory>
) {
  return orderedGalleryCategories.map((category, index) => {
    const items = groupedImages.get(category) ?? []
    const cover = items[0]
    const content = galleryCategoryContent[category]
    const piecesCount = items.length
    const piecesLabel =
      category === 'chasse'
        ? 'A venir'
        : piecesCount > 0
          ? `${piecesCount} piece${piecesCount > 1 ? 's' : ''}`
          : 'Bientot'

    const imageUrl =
      cover?.image
        ? urlFor(cover.image).width(2000).height(1200).fit('crop').url() ??
          '/placeholder.svg'
        : '/placeholder.svg'

    return {
      id: index + 1,
      title: content.title,
      subtitle:
        piecesCount > 0 ? content.subtitle : content.emptySubtitle ?? content.subtitle,
      meta: piecesLabel,
      pieces: piecesCount,
      category: content.title,
      image: imageUrl,
      description: cover?.label ?? content.subtitle,
    }
  })
}

export default async function WorksPage() {
  const galleryImages = await getGalleryImages()
  const groupedImages = groupGalleryImagesByCategory(galleryImages)
  const collections = createCollections(groupedImages)

  return (
    <>
      <Navigation alwaysVisible />

      <PageTransitionWrapper>
        <main className="min-h-screen">
          <HorizontalScrollGallery collections={collections} />
        </main>
      </PageTransitionWrapper>
    </>
  )
}
