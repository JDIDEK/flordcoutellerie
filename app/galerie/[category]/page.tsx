import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { TransitionLink } from '@/components/TransitionLink'
import type { GalleryKnife, GalleryKnifeImage } from '@/lib/sanity/types'
import {
  getAllGalleryCollectionSlugs,
  getGalleryCollectionBySlug,
  getGalleryKnivesByCollectionSlug,
} from '@/lib/sanity/queries'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  params: Promise<{ category: string }>
}

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

export default async function GalerieCategoryPage({ params }: Props) {
  const { category } = await params
  const { collection, knives } = await getGalleryKnivesByCollectionSlug(category)

  if (!collection) {
    notFound()
  }

  return (
    <>
      <Navigation alwaysVisible />

      <PageTransitionWrapper>
        <main className="min-h-screen bg-background">
          {/* Header sticky */}
          <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border/40">
            <div className="container mx-auto max-w-6xl px-6 pt-28 pb-8 md:pt-32 md:pb-10">
              <TransitionLink
                href="/galerie"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-3 h-3" />
                Galerie
              </TransitionLink>

              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.4em] text-muted-foreground mb-2">
                    Collection
                  </p>
                  <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-foreground">
                    {collection.title}
                  </h1>
                </div>
                {knives.length > 0 && (
                  <p className="text-xs text-muted-foreground shrink-0 pb-1">
                    {knives.length} entrée{knives.length > 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {collection.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xl">
                  {collection.description}
                </p>
              )}
            </div>
          </div>

          {/* Contenu */}
          {knives.length === 0 ? (
            <div className="container mx-auto max-w-6xl px-6 py-32 text-center">
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
            <div className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-20 space-y-20 md:space-y-28">
              {knives.map((knife, index) => (
                <KnifeCard key={knife._id} knife={knife} index={index} />
              ))}
            </div>
          )}
        </main>
      </PageTransitionWrapper>
    </>
  )
}

// ─── Knife Card ───────────────────────────────────────────────────────────────
// Layout : nom + description légère au-dessus
//          grande image à gauche | 2 petites images à droite (empilées)

function KnifeCard({ knife, index }: { knife: GalleryKnife; index: number }) {
  const images = knife.images ?? []
  const [main, second, third, ...rest] = images

  return (
    <article className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
      {/* En-tête : nom + description */}
      <header className="mb-4 md:mb-5">
        <h2 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-foreground">
          {knife.name}
        </h2>
        {knife.description && (
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{knife.description}</p>
        )}
      </header>

      {/* Grille d'images */}
      {images.length === 0 ? null : images.length === 1 ? (
        <SingleImage image={main} alt={knife.name} />
      ) : images.length === 2 ? (
        <TwoImages main={main} second={second} alt={knife.name} />
      ) : (
        <ThreeImages main={main} second={second} third={third} alt={knife.name} extra={rest} />
      )}
    </article>
  )
}

// ─── Variants d'affichage selon le nombre d'images ───────────────────────────

function SingleImage({ image, alt }: { image: GalleryKnifeImage; alt: string }) {
  const src = urlFor(image.asset).width(2000).height(1200).fit('crop').url() ?? '/placeholder.svg'
  return (
    <div className="relative overflow-hidden bg-muted/30 group">
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={image.alt ?? alt}
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
        />
      </div>
    </div>
  )
}

function TwoImages({
  main,
  second,
  alt,
}: {
  main: GalleryKnifeImage
  second: GalleryKnifeImage
  alt: string
}) {
  const mainSrc =
    urlFor(main.asset).width(1400).height(1000).fit('crop').url() ?? '/placeholder.svg'
  const secondSrc =
    urlFor(second.asset).width(700).height(500).fit('crop').url() ?? '/placeholder.svg'

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-3 md:gap-4">
      <div className="relative overflow-hidden bg-muted/30 group">
        <div className="relative aspect-[4/3]">
          <Image
            src={mainSrc}
            alt={main.alt ?? alt}
            fill
            sizes="(max-width: 768px) 60vw, 800px"
            className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
          />
        </div>
      </div>
      <div className="relative overflow-hidden bg-muted/30 group">
        <div className="relative aspect-[4/3]">
          <Image
            src={secondSrc}
            alt={second.alt ?? alt}
            fill
            sizes="(max-width: 768px) 40vw, 500px"
            className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </div>
  )
}

function ThreeImages({
  main,
  second,
  third,
  alt,
  extra,
}: {
  main: GalleryKnifeImage
  second: GalleryKnifeImage
  third: GalleryKnifeImage
  alt: string
  extra: GalleryKnifeImage[]
}) {
  const mainSrc =
    urlFor(main.asset).width(1400).height(1000).fit('crop').url() ?? '/placeholder.svg'
  const secondSrc =
    urlFor(second.asset).width(700).height(480).fit('crop').url() ?? '/placeholder.svg'
  const thirdSrc =
    urlFor(third.asset).width(700).height(480).fit('crop').url() ?? '/placeholder.svg'

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Layout principal : grande image gauche + 2 petites droite (ton paint) */}
      <div className="grid grid-cols-[1.5fr_1fr] gap-3 md:gap-4">
        {/* Grande image */}
        <div className="relative overflow-hidden bg-muted/30 group row-span-2">
          <div className="relative h-full min-h-[280px] md:min-h-[400px]">
            <Image
              src={mainSrc}
              alt={main.alt ?? alt}
              fill
              sizes="(max-width: 768px) 60vw, 800px"
              className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
              priority={true}
            />
          </div>
        </div>

        {/* Colonne droite : 2 images empilées */}
        <div className="grid grid-rows-2 gap-3 md:gap-4">
          <div className="relative overflow-hidden bg-muted/30 group">
            <div className="relative aspect-[4/3]">
              <Image
                src={secondSrc}
                alt={second.alt ?? alt}
                fill
                sizes="(max-width: 768px) 40vw, 480px"
                className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
              />
            </div>
          </div>
          <div className="relative overflow-hidden bg-muted/30 group">
            <div className="relative aspect-[4/3]">
              <Image
                src={thirdSrc}
                alt={third.alt ?? alt}
                fill
                sizes="(max-width: 768px) 40vw, 480px"
                className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Images supplémentaires (4+) en grille 3 colonnes */}
      {extra.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {extra.map((img) => {
            const src =
              urlFor(img.asset).width(700).height(700).fit('crop').url() ?? '/placeholder.svg'
            return (
              <div key={img._key} className="relative overflow-hidden bg-muted/30 group">
                <div className="relative aspect-square">
                  <Image
                    src={src}
                    alt={img.alt ?? alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 400px"
                    className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
