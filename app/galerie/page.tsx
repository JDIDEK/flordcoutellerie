import { Navigation } from '@/components/navigation'
import { HorizontalScrollGallery } from '@/components/horizontal-scroll-gallery'
import { getGalleryImages } from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

export default async function WorksPage() {
  const galleryImages = await getGalleryImages()

  const collections = galleryImages.map((item, index) => {
    const imageUrl =
      urlFor(item.image).width(2000).height(1200).fit('crop').url() ?? '/placeholder.svg'
    const year = item.createdAt ? new Date(item.createdAt).getFullYear().toString() : ''
    const title = item.legend ?? 'Image de la galerie'
    const category = item.category ?? 'galerie'

    return {
      id: index + 1,
      title,
      subtitle: item.legend ?? 'Photo de la forge',
      year,
      pieces: 1,
      category,
      image: imageUrl,
      description: item.legend ?? '',
    }
  })

  return (
    <>
      <Navigation alwaysVisible />
      
      <main className="min-h-screen">
        {/* Horizontal Scroll Gallery */}
        <HorizontalScrollGallery collections={collections} />
      </main>
    </>
  )
}
