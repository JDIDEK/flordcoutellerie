import { createImageUrlBuilder, SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto('format')
}

export function hasImageAsset<T extends { asset?: SanityImageSource | null }>(
  image: T | null | undefined
): image is T & { asset: SanityImageSource } {
  return image?.asset != null
}
