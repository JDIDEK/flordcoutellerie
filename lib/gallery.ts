import type { GalleryCollection, GalleryImage } from '@/lib/sanity/types'

const legacyGalleryTitleMap: Record<string, string> = {
  cuisine: 'Cuisine',
  pliants: 'Pliants',
  outdoors: 'Outdoors',
  chasse: 'Chasse',
}

export function getGalleryCollectionTitle(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase()

  if (legacyGalleryTitleMap[normalizedSlug]) {
    return legacyGalleryTitleMap[normalizedSlug]
  }

  return normalizedSlug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function createLegacyGalleryCollection(params: {
  slug: string
  entryCount: number
  coverImage?: GalleryImage
}): GalleryCollection {
  const title = getGalleryCollectionTitle(params.slug)

  return {
    _id: `legacy-${params.slug}`,
    title,
    slug: params.slug,
    description: `Découvrez les réalisations de la collection ${title.toLowerCase()}.`,
    coverImage: params.coverImage,
    entryCount: params.entryCount,
    isLegacy: true,
  }
}

export function mergeGalleryCollections(collections: GalleryCollection[]) {
  const collectionsBySlug = new Map<string, GalleryCollection>()

  collections.forEach((collection) => {
    const existingCollection = collectionsBySlug.get(collection.slug)

    if (!existingCollection) {
      collectionsBySlug.set(collection.slug, collection)
      return
    }

    if (existingCollection.isLegacy && !collection.isLegacy) {
      collectionsBySlug.set(collection.slug, {
        ...collection,
        entryCount: collection.entryCount + existingCollection.entryCount,
        coverImage: collection.coverImage ?? existingCollection.coverImage,
        description: collection.description ?? existingCollection.description,
      })
      return
    }

    if (!existingCollection.isLegacy && collection.isLegacy) {
      collectionsBySlug.set(collection.slug, {
        ...existingCollection,
        entryCount: existingCollection.entryCount + collection.entryCount,
        coverImage: existingCollection.coverImage ?? collection.coverImage,
        description: existingCollection.description ?? collection.description,
      })
    }
  })

  return Array.from(collectionsBySlug.values())
}
