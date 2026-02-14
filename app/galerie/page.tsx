import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { HorizontalScrollGallery } from '@/components/HorizontalScrollGallery'
import { getGalleryImages } from '@/lib/sanity/queries'
import type { GalleryCategory, GalleryImage } from '@/lib/sanity/types'
import { urlFor } from '@/sanity/lib/image'

const orderedCategories: GalleryCategory[] = ['cuisine', 'pliants', 'outdoors', 'chasse']

const categoryContent: Record<GalleryCategory, { title: string; subtitle: string; emptySubtitle?: string }> = {
  cuisine: {
    title: 'Cuisine',
    subtitle: 'Lames de cuisine pensées pour la précision et le rythme.',
  },
  pliants: {
    title: 'Pliants',
    subtitle: 'Couteaux pliants élégants, compacts et fiables au quotidien.',
  },
  outdoors: {
    title: 'Outdoors',
    subtitle: 'Pièces robustes pour les sorties, le camp et le terrain.',
  },
  chasse: {
    title: 'Chasse',
    subtitle: 'Catégorie à venir.',
    emptySubtitle: 'À venir.',
  },
}

const categoryKeywords: Record<GalleryCategory, string[]> = {
  cuisine: ['cuisine', 'chef', 'gyuto', 'santoku', 'office', 'kitchen'],
  pliants: ['pliant', 'folding'],
  outdoors: ['outdoor', 'bushcraft', 'camp', 'survival'],
  chasse: ['chasse', 'hunter'],
}

const fallbackDistributionCategories: GalleryCategory[] = ['cuisine', 'pliants', 'outdoors']

function inferCategoryFromLabel(label?: string): GalleryCategory | null {
  if (!label) return null
  const normalized = label.toLowerCase()

  for (const category of orderedCategories) {
    if (categoryKeywords[category].some((keyword) => normalized.includes(keyword))) {
      return category
    }
  }

  return null
}

function createCollections(galleryImages: GalleryImage[]) {
  const groupedByCategory = new Map<GalleryCategory, GalleryImage[]>(
    orderedCategories.map((category) => [category, []])
  )
  const uncategorized: GalleryImage[] = []

  for (const item of galleryImages) {
    const resolvedCategory = item.category ?? inferCategoryFromLabel(item.label)
    if (resolvedCategory) {
      groupedByCategory.get(resolvedCategory)?.push(item)
      continue
    }
    uncategorized.push(item)
  }

  uncategorized.forEach((item, index) => {
    const fallbackCategory = fallbackDistributionCategories[index % fallbackDistributionCategories.length]
    groupedByCategory.get(fallbackCategory)?.push(item)
  })

  return orderedCategories.map((category, index) => {
    const items = groupedByCategory.get(category) ?? []
    const cover = items[0]
    const content = categoryContent[category]
    const piecesCount = items.length
    const piecesLabel =
      category === 'chasse'
        ? 'À venir'
        : piecesCount > 0
          ? `${piecesCount} pièce${piecesCount > 1 ? 's' : ''}`
          : 'Bientôt'
    const imageUrl =
      cover?.image ? urlFor(cover.image).width(2000).height(1200).fit('crop').url() ?? '/placeholder.svg' : '/placeholder.svg'

    return {
      id: index + 1,
      title: content.title,
      subtitle: piecesCount > 0 ? content.subtitle : (content.emptySubtitle ?? content.subtitle),
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
  const collections = createCollections(galleryImages)

  return (
    <>
      <Navigation alwaysVisible />
      
      <PageTransitionWrapper>
        <main className="min-h-screen">
        {/* Horizontal Scroll Gallery */}
        <HorizontalScrollGallery collections={collections} />
      </main>
      </PageTransitionWrapper>
    </>
  )
}
