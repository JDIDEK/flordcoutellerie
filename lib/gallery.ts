import type { GalleryCategory, GalleryImage } from '@/lib/sanity/types'

export const orderedGalleryCategories: GalleryCategory[] = [
  'cuisine',
  'pliants',
  'outdoors',
  'chasse',
]

export const galleryCategoryContent: Record<
  GalleryCategory,
  {
    title: string
    subtitle: string
    emptySubtitle?: string
    atelierEyebrow: string
    atelierDescription: string
  }
> = {
  cuisine: {
    title: 'Cuisine',
    subtitle: 'Lames de cuisine pensées pour la précision et le rythme.',
    atelierEyebrow: 'Precision',
    atelierDescription:
      'Des profils nerveux, des équilibres nets et un travail de coupe pensé pour le geste quotidien.',
  },
  pliants: {
    title: 'Pliants',
    subtitle: 'Couteaux pliants élégants, compacts et fiables au quotidien.',
    atelierEyebrow: 'Mecanique',
    atelierDescription:
      'Chaque ligne doit rester fluide a l’usage comme a l’œil, jusque dans les details de fermeture.',
  },
  outdoors: {
    title: 'Outdoors',
    subtitle: 'Pièces robustes pour les sorties, le camp et le terrain.',
    atelierEyebrow: 'Terrain',
    atelierDescription:
      'Des volumes francs, des matieres denses et une recherche de confiance plutot que d’esbroufe.',
  },
  chasse: {
    title: 'Chasse',
    subtitle: 'Catégorie à venir.',
    emptySubtitle: 'A venir.',
    atelierEyebrow: 'Developpement',
    atelierDescription:
      'Une famille en construction, preparee pour accueillir de nouvelles silhouettes et usages.',
  },
}

const categoryKeywords: Record<GalleryCategory, string[]> = {
  cuisine: ['cuisine', 'chef', 'gyuto', 'santoku', 'office', 'kitchen'],
  pliants: ['pliant', 'folding'],
  outdoors: ['outdoor', 'bushcraft', 'camp', 'survival'],
  chasse: ['chasse', 'hunter'],
}

const fallbackDistributionCategories: GalleryCategory[] = ['cuisine', 'pliants', 'outdoors']

export function inferGalleryCategory(label?: string): GalleryCategory | null {
  if (!label) return null
  const normalized = label.toLowerCase()

  for (const category of orderedGalleryCategories) {
    if (categoryKeywords[category].some((keyword) => normalized.includes(keyword))) {
      return category
    }
  }

  return null
}

export function groupGalleryImagesByCategory(galleryImages: GalleryImage[]) {
  const groupedByCategory = new Map<GalleryCategory, GalleryImage[]>(
    orderedGalleryCategories.map((category) => [category, []])
  )
  const uncategorized: GalleryImage[] = []

  for (const item of galleryImages) {
    const resolvedCategory = item.category ?? inferGalleryCategory(item.label)
    if (resolvedCategory) {
      groupedByCategory.get(resolvedCategory)?.push(item)
      continue
    }

    uncategorized.push(item)
  }

  uncategorized.forEach((item, index) => {
    const fallbackCategory =
      fallbackDistributionCategories[index % fallbackDistributionCategories.length]
    groupedByCategory.get(fallbackCategory)?.push(item)
  })

  return groupedByCategory
}
