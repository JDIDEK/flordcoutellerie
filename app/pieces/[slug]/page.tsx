import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getPieceBySlug, getAllPieceSlugs } from '@/lib/sanity/queries'
import { Check, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { formatCurrency } from '@/lib/utils'

export async function generateStaticParams() {
  const slugs = await getAllPieceSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function PieceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
  const isAvailable = piece.status === 'available'

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link 
              href="/pieces"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux pièces
            </Link>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Image */}
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden bg-secondary rounded-sm">
                  <Image
                    src={heroImageSrc}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  {piece.status === 'sold' && (
                    <Badge className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground">
                      Vendu
                    </Badge>
                  )}
                  {piece.status === 'reserved' && (
                    <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                      Réservé
                    </Badge>
                  )}
                  {piece.originalPrice && piece.status === 'available' && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      Promo
                    </Badge>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-8">
                <div>
                  <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-2">
                    {piece.category}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground mb-2">
                    {piece.title}
                  </h1>
                  <p className="text-lg text-muted-foreground">{piece.subtitle}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-light text-foreground">
                    {formattedPrice ? `${formattedPrice}€` : 'Sur demande'}
                  </span>
                  {formattedOriginalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {`${formattedOriginalPrice}€`}
                    </span>
                  )}
                </div>

                {piece.description && (
                  <p className="text-muted-foreground leading-relaxed">
                    {piece.description}
                  </p>
                )}

                <Separator />

                {/* Specifications */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-foreground">Spécifications Techniques</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Acier</span>
                      <span className="font-medium text-foreground">{piece.steel}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Couches</span>
                      <span className="font-medium text-foreground">{piece.layers}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Dureté</span>
                      <span className="font-medium text-foreground">{piece.hrc}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Manche</span>
                      <span className="font-medium text-foreground">{piece.handle}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="text-muted-foreground">Longueur</span>
                      <span className="font-medium text-foreground">{piece.length}</span>
                    </div>
                    {piece.weight && (
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Poids</span>
                        <span className="font-medium text-foreground">{piece.weight}</span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-foreground">Caractéristiques</h2>
                  {piece.features?.length ? (
                    <ul className="space-y-2">
                      {piece.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-foreground flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Les caractéristiques sont en cours de mise à jour.
                    </p>
                  )}
                </div>

                <Separator />

                {/* CTA */}
                {isAvailable ? (
                  <div className="space-y-4">
                    <Button className="w-full" size="lg" asChild>
                      <a href={`mailto:floribadeaudumas@gmail.com?subject=Commande - ${piece.title}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Commander par Email
                      </a>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      Acompte de 20% à la commande • Livraison sous 2-4 semaines
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button className="w-full" size="lg" variant="outline" asChild>
                      <a href={`mailto:floribadeaudumas@gmail.com?subject=Recréation - ${piece.title}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Recréer cette Pièce
                      </a>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      {piece.status === 'reserved'
                        ? 'Cette pièce est réservée mais peut être adaptée sur commande'
                        : 'Cette pièce est vendue mais peut être recréée avec des variations uniques'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
