import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'

import { AddToCartButton } from '@/components/AddToCartButton'
import { BackLink } from '@/components/BackLink'
import { BuyNowButton } from '@/components/BuyNowButton'
import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { TransitionLink } from '@/components/TransitionLink'
import { Button } from '@/components/ui/button'
import { PieceGallery } from '@/components/PieceGallery'
import { getPieceBySlug, getAllPieceSlugs } from '@/lib/sanity/queries'
import { formatCurrency } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'

export async function generateStaticParams() {
  const slugs = await getAllPieceSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const piece = await getPieceBySlug(slug)

  if (!piece) {
    notFound()
  }

  const formattedPrice = formatCurrency(piece.price)
  const formattedOriginalPrice = formatCurrency(piece.originalPrice)
  const heroImage = piece.mainImage ?? piece.gallery?.[0]
  const heroImageSrc = heroImage
    ? urlFor(heroImage).width(1600).height(1600).fit('crop').url()
    : '/placeholder.jpg'
  const galleryImagesSet = new Set<string>()
  const galleryImages = []

  if (heroImageSrc && !galleryImagesSet.has(heroImageSrc)) {
    galleryImages.push({ src: heroImageSrc, alt: piece.title })
    galleryImagesSet.add(heroImageSrc)
  }

  piece.gallery?.forEach((image, index) => {
    const src = urlFor(image).width(1600).height(1600).fit('crop').url()
    if (!galleryImagesSet.has(src)) {
      galleryImages.push({
        src,
        alt: `${piece.title} - vue ${index + 1}`,
      })
      galleryImagesSet.add(src)
    }
  })

  const isAvailable = piece.status === 'available'

  const cartPiece = {
    id: piece._id,
    name: piece.title,
    price: piece.price,
    image: heroImageSrc,
    slug: piece.slug,
    status: piece.status,
  }

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <BackLink
              href="/pieces"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 md:animate-fade-in"
              label="Retour aux pieces"
            />

            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
              <PieceGallery images={galleryImages} status={piece.status} />

              <section className="space-y-8">
                <div className="space-y-3 md:animate-slide-in-right">
                  {piece.category && (
                    <p className="text-xs tracking-[0.35em] text-muted-foreground uppercase">
                      {piece.category}
                    </p>
                  )}
                  <h1 className="text-3xl md:text-4xl font-serif font-light tracking-tight text-foreground">
                    {piece.title}
                  </h1>
                  {piece.subtitle && (
                    <p className="text-sm text-muted-foreground">
                      {piece.subtitle}
                    </p>
                  )}
                </div>

                <div className="space-y-3 md:animate-fade-in-up md:animation-delay-200">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl font-light text-foreground">
                      {formattedPrice ? `${formattedPrice} EUR` : 'Sur demande'}
                    </span>
                    {formattedOriginalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {`${formattedOriginalPrice} EUR`}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <span className="font-medium">Exemplaire unique</span>
                  </div>
                </div>

                <div className="space-y-3 md:animate-fade-in-up md:animation-delay-400">
                  {isAvailable ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <AddToCartButton
                          piece={cartPiece}
                          buttonProps={{
                            size: 'lg',
                            className:
                              'w-full rounded-md bg-amber-50 text-neutral-900 border border-amber-100 ' +
                              'hover:bg-amber-100 transition-all overflow-hidden group/cta shadow-sm ' +
                              'active:translate-y-[1px] active:shadow-md',
                            children: (
                              <span className="relative flex items-center justify-center text-sm md:text-base">
                                <span className="pointer-events-none absolute inset-0 overflow-hidden">
                                  <svg
                                    viewBox="0 0 200 200"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 w-full h-full text-amber-100 translate-y-[70%] md:group-hover/cta:translate-y-0 md:transition-transform md:duration-600 ease-out"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M0 160 Q40 120 80 160 T160 160 T240 160 V220 H0 Z"
                                      fill="currentColor"
                                      fillOpacity={0.8}
                                    />
                                  </svg>
                                </span>
                                <span className="relative z-10">
                                  Ajouter au panier
                                </span>
                              </span>
                            ),
                          }}
                        />

                        <BuyNowButton pieceId={piece._id} />
                      </div>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" size="lg" variant="outline" disabled>
                        Indisponible
                      </Button>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {piece.status === 'reserved'
                          ? 'Cette pièce est réservée mais peut être adaptée sur commande.'
                          : 'Cette pièce est vendue mais peut être recréée avec des variations uniques.'}
                      </p>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Vente réservée aux personnes majeures. Le port et le transport hors du domicile
                    sont interdits sans motif légitime.{' '}
                    <TransitionLink href="/cgv" className="underline underline-offset-4 hover:text-foreground">
                      Voir les CGV
                    </TransitionLink>
                    .
                  </p>
                </div>

                {piece.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed md:animate-fade-in-up md:animation-delay-600">
                    {piece.description}
                  </p>
                )}

                <div className="space-y-3 md:animate-fade-in-up md:animation-delay-800">
                  <h2 className="text-lg font-medium text-foreground">Fiche technique</h2>
                  <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                    {[
                      { label: 'Acier', value: piece.steel },
                      { label: 'Couches', value: piece.layers },
                      { label: 'Dureté', value: piece.hrc },
                      { label: 'Manche', value: piece.handle },
                      { label: 'Longueur', value: piece.length },
                      { label: 'Poids', value: piece.weight },
                    ]
                      .filter((item) => item.value)
                      .map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between rounded-md bg-card/40 px-4 py-2 border border-border/60"
                        >
                          <span>{item.label}</span>
                          <span className="text-foreground font-medium">{item.value}</span>
                        </div>
                      ))}
                  </div>

                  {piece.features?.length ? (
                    <ul className="space-y-2 pt-2">
                      {piece.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-foreground flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      </PageTransitionWrapper>
    </>
  )
}
