import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getPieceBySlug, getAllPieceSlugs } from '@/lib/pieces-data'
import { Check, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return getAllPieceSlugs().map((slug) => ({
    slug,
  }))
}

export default function PieceDetailPage({ params }: { params: { slug: string } }) {
  const piece = getPieceBySlug(params.slug)

  if (!piece) {
    notFound()
  }

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
                    src={piece.image}
                    alt={piece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                  {piece.stock === 'sold' && (
                    <Badge className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground">
                      Vendu
                    </Badge>
                  )}
                  {piece.originalPrice && piece.stock === 'available' && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
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
                    {piece.price}€
                  </span>
                  {piece.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {piece.originalPrice}€
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
                  <ul className="space-y-2">
                    {piece.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-foreground flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* CTA */}
                {piece.stock === 'available' ? (
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
                      Cette pièce est vendue mais peut être recréée avec des variations uniques
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
