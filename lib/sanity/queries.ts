import { groq } from 'next-sanity'

import { createLegacyGalleryCollection, mergeGalleryCollections } from '@/lib/gallery'
import type {
  GalleryCollection,
  GalleryImage,
  GalleryKnife,
  PieceDetail,
  PieceListItem,
  SiteNotice,
} from '@/lib/sanity/types'
import { client } from '@/sanity/lib/client'

// ─── Pièces boutique ─────────────────────────────────────────────────────────

const piecesListQuery = groq`
  *[_type == "piece"]
    | order(orderRank asc, status asc, coalesce(homeOrder, 999), _createdAt desc){
    _id,
    title,
    subtitle,
    category,
    status,
    reservationExpiresAt,
    price,
    originalPrice,
    steel,
    layers,
    hrc,
    handle,
    length,
    weight,
    description,
    features,
    steelSummary,
    highlightOnHome,
    homeOrder,
    "slug": slug.current,
    "mainImage": mainImage
  }
`

const pieceDetailQuery = groq`
  *[_type == "piece" && slug.current == $slug][0]{
    _id,
    title,
    subtitle,
    category,
    status,
    reservationExpiresAt,
    price,
    originalPrice,
    steel,
    layers,
    hrc,
    handle,
    length,
    weight,
    description,
    features,
    steelSummary,
    highlightOnHome,
    "slug": slug.current,
    "mainImage": mainImage,
    gallery
  }
`

const pieceSlugsQuery = groq`
  *[_type == "piece" && defined(slug.current)]{ "slug": slug.current }
`

const siteNoticeQuery = groq`
  *[_type == "siteNotice" && _id == "siteNotice"][0]{
    _id,
    enabled,
    title,
    message
  }
`

// ─── Galerie collections ────────────────────────────────────────────────────

const galleryCollectionsQuery = groq`
  *[_type == "galleryCollection"]
    | order(orderRank asc, title asc){
    _id,
    title,
    description,
    "slug": slug.current,
    "coverImage": select(defined(coverImage.asset) => coverImage{
      _key,
      alt,
      "asset": asset,
      hotspot,
      crop
    }),
    "entryCount": count(*[_type == "galleryKnife" && references(^._id)])
  }
`

const galleryCollectionBySlugQuery = groq`
  *[_type == "galleryCollection" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "slug": slug.current,
    "coverImage": select(defined(coverImage.asset) => coverImage{
      _key,
      alt,
      "asset": asset,
      hotspot,
      crop
    }),
    "entryCount": count(*[_type == "galleryKnife" && references(^._id)])
  }
`

const galleryCollectionSlugsQuery = groq`
  *[_type == "galleryCollection" && defined(slug.current)]{
    "slug": slug.current
  }
`

type LegacyGalleryCollectionRow = {
  category?: string
  coverImage?: GalleryImage
}

const legacyGalleryCollectionsQuery = groq`
  *[_type == "galleryKnife" && !defined(collection._ref) && defined(category)]
    | order(featured desc, orderRank asc){
    category,
    "coverImage": images[defined(asset)][0]{
      _key,
      alt,
      "asset": asset,
      hotspot,
      crop
    }
  }
`

const legacyGalleryCollectionRowsByCategoryQuery = groq`
  *[_type == "galleryKnife" && !defined(collection._ref) && category == $category]
    | order(featured desc, orderRank asc){
    category,
    "coverImage": images[defined(asset)][0]{
      _key,
      alt,
      "asset": asset,
      hotspot,
      crop
    }
  }
`

const legacyGalleryCollectionSlugsQuery = groq`
  array::unique(*[_type == "galleryKnife" && !defined(collection._ref) && defined(category)].category)
`

// ─── Galerie couteaux ────────────────────────────────────────────────────────

const galleryKnivesSelection = groq`
  {
    _id,
    "createdAt": _createdAt,
    name,
    description,
    category,
    featured,
    "collection": collection->{
      _id,
      title,
      "slug": slug.current
    },
    images[defined(asset)][]{
      _key,
      alt,
      "asset": asset->{
        _id,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      hotspot,
      crop
    }
  }
`

const galleryKnivesByCollectionIdQuery = groq`
  *[_type == "galleryKnife" && references($collectionId)]
    | order(featured desc, orderRank asc) ${galleryKnivesSelection}
`

const galleryKnivesByCollectionAndLegacyCategoryQuery = groq`
  *[
    _type == "galleryKnife" &&
    (
      references($collectionId) ||
      (!defined(collection._ref) && category == $legacyCategory)
    )
  ]
    | order(featured desc, orderRank asc) ${galleryKnivesSelection}
`

const legacyGalleryKnivesByCategoryQuery = groq`
  *[_type == "galleryKnife" && !defined(collection._ref) && category == $category]
    | order(featured desc, orderRank asc) ${galleryKnivesSelection}
`

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildLegacyCollections(rows: LegacyGalleryCollectionRow[]) {
  const groupedCollections = new Map<
    string,
    {
      entryCount: number
      coverImage?: GalleryImage
    }
  >()

  rows.forEach((row) => {
    if (!row.category) return

    const currentGroup = groupedCollections.get(row.category)

    if (currentGroup) {
      currentGroup.entryCount += 1
      if (!currentGroup.coverImage && row.coverImage) {
        currentGroup.coverImage = row.coverImage
      }
      return
    }

    groupedCollections.set(row.category, {
      entryCount: 1,
      coverImage: row.coverImage,
    })
  })

  return Array.from(groupedCollections.entries()).map(([slug, group]) =>
    createLegacyGalleryCollection({
      slug,
      entryCount: group.entryCount,
      coverImage: group.coverImage,
    })
  )
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export async function getPieces() {
  return client.fetch<PieceListItem[]>(piecesListQuery, {}, { next: { tags: ['piece'] } })
}

export async function getPieceBySlug(slug: string) {
  return client.fetch<PieceDetail | null>(pieceDetailQuery, { slug }, { next: { tags: ['piece'] } })
}

export async function getAllPieceSlugs() {
  const slugs = await client.fetch<{ slug?: string }[]>(pieceSlugsQuery)
  return slugs.map((entry) => entry.slug).filter((slug): slug is string => typeof slug === 'string')
}

export async function getActiveSiteNotice() {
  const notice = await client.fetch<SiteNotice | null>(
    siteNoticeQuery,
    {},
    { next: { tags: ['siteNotice'] } }
  )

  if (!notice?.enabled || !notice.message?.trim()) {
    return null
  }

  return {
    ...notice,
    title: notice.title?.trim() || 'Information atelier',
    message: notice.message.trim(),
  }
}

export async function getGalleryCollections() {
  const [collections, legacyRows] = await Promise.all([
    client.fetch<GalleryCollection[]>(
      galleryCollectionsQuery,
      {},
      { next: { tags: ['galleryCollection', 'galleryKnife'] } }
    ),
    client.fetch<LegacyGalleryCollectionRow[]>(
      legacyGalleryCollectionsQuery,
      {},
      { next: { tags: ['galleryKnife'] } }
    ),
  ])

  return mergeGalleryCollections([...collections, ...buildLegacyCollections(legacyRows)])
}

export async function getGalleryCollectionBySlug(slug: string) {
  const [collection, legacyRows] = await Promise.all([
    client.fetch<GalleryCollection | null>(
      galleryCollectionBySlugQuery,
      { slug },
      { next: { tags: ['galleryCollection'] } }
    ),
    client.fetch<LegacyGalleryCollectionRow[]>(
      legacyGalleryCollectionRowsByCategoryQuery,
      { category: slug },
      { next: { tags: ['galleryKnife'] } }
    ),
  ])

  const legacyCollection = buildLegacyCollections(legacyRows)[0]

  if (!collection) {
    return legacyCollection ?? null
  }

  if (!legacyCollection) {
    return collection
  }

  return mergeGalleryCollections([collection, legacyCollection])[0] ?? collection
}

export async function getGalleryKnivesByCollectionId(collectionId: string) {
  return client.fetch<GalleryKnife[]>(
    galleryKnivesByCollectionIdQuery,
    { collectionId },
    { next: { tags: ['galleryKnife'] } }
  )
}

export async function getGalleryKnivesByCollectionSlug(slug: string) {
  const collection = await getGalleryCollectionBySlug(slug)

  if (!collection) {
    return { collection: null, knives: [] as GalleryKnife[] }
  }

  if (collection.isLegacy) {
    const legacyKnives = await client.fetch<GalleryKnife[]>(
      legacyGalleryKnivesByCategoryQuery,
      { category: slug },
      { next: { tags: ['galleryKnife'] } }
    )

    return { collection, knives: legacyKnives }
  }

  const knives = await client.fetch<GalleryKnife[]>(
    galleryKnivesByCollectionAndLegacyCategoryQuery,
    { collectionId: collection._id, legacyCategory: slug },
    { next: { tags: ['galleryKnife'] } }
  )

  return { collection, knives }
}

export async function getAllGalleryCollectionSlugs() {
  const [collectionSlugs, legacySlugs] = await Promise.all([
    client.fetch<{ slug?: string }[]>(galleryCollectionSlugsQuery),
    client.fetch<(string | null)[]>(legacyGalleryCollectionSlugsQuery),
  ])

  return Array.from(
    new Set([
      ...collectionSlugs
        .map((entry) => entry.slug)
        .filter((slug): slug is string => typeof slug === 'string'),
      ...legacySlugs.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0),
    ])
  )
}
