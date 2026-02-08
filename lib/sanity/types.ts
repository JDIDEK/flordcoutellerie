import type { SanityImageSource } from '@sanity/image-url'

export type SanityPieceStatus = 'available' | 'reserved' | 'sold'

export type PieceListItem = {
  _id: string
  slug: string
  title: string
  subtitle?: string
  category?: string
  status?: SanityPieceStatus
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

export type GalleryCategory = 'cuisine' | 'pliants' | 'outdoors' | 'chasse'

export type GalleryImage = {
  _id: string
  image: SanityImageSource
  label?: string
  category?: GalleryCategory
  createdAt: string
}

export type SignaturePiece = {
  _id: string
  slug: string
  title: string
  steelSummary?: string
  status?: SanityPieceStatus
  price?: number
  mainImage?: SanityImageSource
}
