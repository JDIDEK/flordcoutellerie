import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { TransitionLink } from '@/components/TransitionLink'
import { ParallaxMedia } from '@/components/gallery/ParallaxMedia'
import { ScrollNavSidebar, type ThumbEntry } from '@/components/gallery/Scrollnavsidebar'
import type { GalleryKnife, GalleryKnifeImage } from '@/lib/sanity/types'
import {
  getAllGalleryCollectionSlugs,
  getGalleryCollectionBySlug,
  getGalleryKnivesByCollectionSlug,
} from '@/lib/sanity/queries'
import { hasImageAsset, urlFor } from '@/sanity/lib/image'

type Props = {
  params: Promise<{ category: string }>
}

type GalleryKnifeImageWithAsset = GalleryKnifeImage & {
  asset: NonNullable<GalleryKnifeImage['asset']>
}

type AssetDimensions = {
  width: number
  height: number
}

function getUrl(image: GalleryKnifeImageWithAsset, width: number, height: number) {
  return urlFor(image.asset).width(width).height(height).fit('max').url() ?? '/placeholder.svg'
}

function getImageTargetId(
  knifeId: string,
  image: GalleryKnifeImageWithAsset,
  imageIndex: number,
) {
  return `${knifeId}-${image._key ?? `${imageIndex}`}`
}

function getAssetDimensions(image: GalleryKnifeImageWithAsset): AssetDimensions | null {
  const { asset } = image
  if (!asset || typeof asset !== 'object') return null

  const candidate = asset as {
    metadata?: {
      dimensions?: {
        width?: number
        height?: number
      }
    }
  }

  const width = candidate.metadata?.dimensions?.width
  const height = candidate.metadata?.dimensions?.height

  if (typeof width === 'number' && typeof height === 'number') {
    return { width, height }
  }

  return null
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const categories = await getAllGalleryCollectionSlugs()
  return categories.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const collection = await getGalleryCollectionBySlug(category)
  if (!collection) return {}

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://flordcoutellerie.fr'

  return {
    title: `${collection.title} | Galerie | Flo RD Coutellerie`,
    description:
      collection.description || `Découvrez les réalisations de la collection ${collection.title}.`,
    openGraph: {
      title: `${collection.title} | Galerie | Flo RD Coutellerie`,
      description:
        collection.description ||
        `Découvrez les réalisations de la collection ${collection.title}.`,
      url: `${baseUrl}/galerie/${category}`,
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Une miniature par couteau = première image uniquement.
 */
function buildThumbs(knives: GalleryKnife[]): ThumbEntry[] {
  const entries: ThumbEntry[] = []

  for (const knife of knives) {
    const images = (knife.images ?? []).filter(hasImageAsset) as GalleryKnifeImageWithAsset[]
    if (images.length === 0) continue

    const firstImage = images[0]
    entries.push({
      type: 'single',
      src: getUrl(firstImage, 240, 135),
      alt: firstImage.alt ?? knife.name,
      targetId: getImageTargetId(knife._id, firstImage, 0),
    })
  }

  return entries
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GalerieCategoryPage({ params }: Props) {
  const { category } = await params
  const { collection, knives } = await getGalleryKnivesByCollectionSlug(category)

  if (!collection) notFound()

  const thumbs = buildThumbs(knives)

  return (
    <>
      <Navigation alwaysVisible />

      <PageTransitionWrapper>
        <main className="min-h-screen bg-background">
          {knives.length === 0 ? (
            <div className="container mx-auto max-w-6xl px-6 pt-32 pb-32 md:pt-36 text-center">
              <p className="text-muted-foreground text-sm">
                Cette collection n&apos;a pas encore de photos.
              </p>
              <TransitionLink
                href="/galerie"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground hover:text-muted-foreground transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                Retour à la galerie
              </TransitionLink>
            </div>
          ) : (
            <>
              <ScrollNavSidebar thumbs={thumbs} />

              <div className="mx-auto max-w-4xl px-4 md:px-8 pt-28 pb-36 md:pt-32 md:pb-44 space-y-20 md:space-y-32">
                <TransitionLink
                  href="/galerie"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground hover:text-muted-foreground transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Retour à la galerie
                </TransitionLink>

                {knives.map((knife, knifeIndex) => (
                  <KnifeBlock key={knife._id} knife={knife} knifeIndex={knifeIndex} />
                ))}
              </div>
            </>
          )}
        </main>
      </PageTransitionWrapper>
    </>
  )
}

// ─── KnifeBlock ───────────────────────────────────────────────────────────────
//
// Layout :
//   - 1 image  → pleine largeur
//   - 2+ images → grande image (flex 2) + colonne petites (flex 1)
//                 pair   → grande à GAUCHE, petites à DROITE
//                 impair → grande à DROITE, petites à GAUCHE
//

function KnifeBlock({ knife, knifeIndex }: { knife: GalleryKnife; knifeIndex: number }) {
  const images = (knife.images ?? []).filter(hasImageAsset) as GalleryKnifeImageWithAsset[]

  if (images.length === 0) return null

  const [main, ...rest] = images
  const isOdd = knifeIndex % 2 !== 0

  const mainId = getImageTargetId(knife._id, main, 0)

  return (
    <article data-thumb-index={knifeIndex}>
      {/* En-tête */}
      <header className="mb-5 md:mb-6">
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-foreground">
          {knife.name}
        </h2>
        {knife.description && (
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {knife.description}
          </p>
        )}
      </header>

      {/* Images */}
      {images.length === 1 ? (
        <FullImage image={main} alt={knife.name} targetId={mainId} />
      ) : (
        <div
          className="flex gap-3 md:gap-4 items-stretch"
          style={{ flexDirection: isOdd ? 'row-reverse' : 'row' }}
        >
          {/* Grande image — prend 2/3 */}
          <div data-thumb-id={mainId} style={{ flex: 2, overflow: 'hidden', minHeight: 0 }}>
            <ParallaxMedia strength={42} scale={1}>
              <Image
                src={getUrl(main, 1200, 900)}
                alt={main.alt ?? knife.name}
                width={1200}
                height={900}
                sizes="(max-width: 768px) 66vw, 600px"
                className="w-full h-full object-contain"
                style={{ display: 'block' }}
              />
            </ParallaxMedia>
          </div>

          {/* Colonne petites images — prend 1/3 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            {rest.map((img, i) => (
              <div
                key={img._key ?? i}
                data-thumb-id={getImageTargetId(knife._id, img, i + 1)}
                style={{ flex: 1, overflow: 'hidden' }}
              >
                <ParallaxMedia strength={30} scale={1}>
                  <Image
                    src={getUrl(img, 600, 600)}
                    alt={img.alt ?? knife.name}
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 33vw, 300px"
                    className="w-full h-full object-contain"
                    style={{ display: 'block' }}
                  />
                </ParallaxMedia>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

// ─── FullImage ────────────────────────────────────────────────────────────────

function FullImage({
  image,
  alt,
  targetId,
}: {
  image: GalleryKnifeImageWithAsset
  alt: string
  targetId: string
}) {
  const dims = getAssetDimensions(image)
  const aspectRatio = dims ? `${dims.width} / ${dims.height}` : '16 / 9'

  return (
    <div data-thumb-id={targetId} className="w-full overflow-hidden" style={{ aspectRatio }}>
      <ParallaxMedia strength={36} scale={1}>
        <Image
          src={getUrl(image, 1800, 1200)}
          alt={image.alt ?? alt}
          width={dims?.width ?? 1800}
          height={dims?.height ?? 1200}
          sizes="(max-width: 768px) 100vw, 900px"
          className="w-full h-full object-contain"
        />
      </ParallaxMedia>
    </div>
  )
}