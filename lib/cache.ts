import { revalidateTag } from 'next/cache'

const IMMEDIATE_EXPIRY = { expire: 0 } as const

export const SANITY_TAGS_BY_TYPE = {
  piece: ['piece'],
  galleryCollection: ['galleryCollection', 'galleryKnife'],
  galleryKnife: ['galleryKnife'],
} as const

export type RevalidatableSanityType = keyof typeof SANITY_TAGS_BY_TYPE

export function revalidateTags(tags: readonly string[]) {
  tags.forEach((tag) => {
    revalidateTag(tag, IMMEDIATE_EXPIRY)
  })
}

export function revalidatePieceTag() {
  revalidateTags(['piece'])
}

export function revalidateGalleryKnifeTag() {
  revalidateTags(['galleryKnife'])
}

export function revalidateGalleryCollectionTag() {
  revalidateTags(['galleryCollection', 'galleryKnife'])
}

export function revalidateSanityType(type?: string | null) {
  if (!type || !(type in SANITY_TAGS_BY_TYPE)) {
    return false
  }

  revalidateTags(SANITY_TAGS_BY_TYPE[type as RevalidatableSanityType])
  return true
}
