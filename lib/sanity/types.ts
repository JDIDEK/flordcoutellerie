import type { SanityImageSource } from '@sanity/image-url'

export type SanityPieceStatus = 'available' | 'reserved' | 'sold'

export type PieceListItem = {
  _id: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  status?: SanityPieceStatus
  reservationExpiresAt?: string
  price?: number
  originalPrice?: number
  steel?: string
  layers?: string
  hrc?: string
  handle?: string
  length?: string
  weight?: string
  description?: string
  features?: string[]
  steelSummary?: string
  highlightOnHome?: boolean
  mainImage?: SanityImageSource
}

export type PieceDetail = PieceListItem & {
  gallery?: SanityImageSource[]
}

export type GalleryImage = {
  _key?: string
  asset: SanityImageSource
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export type GalleryCollection = {
  _id: string
  title: string
  slug: string
  description?: string
  coverImage?: GalleryImage
  entryCount: number
  isLegacy?: boolean
}

export type GalleryKnifeImage = GalleryImage & {
  _key: string
}

export type GalleryKnife = {
  _id: string
  name: string
  description?: string
  category?: string
  collection?: Pick<GalleryCollection, '_id' | 'title' | 'slug'> | null
  images: GalleryKnifeImage[]
  featured?: boolean
  createdAt: string
}
