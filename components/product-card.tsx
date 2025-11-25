import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import { formatCurrency } from '@/lib/utils'
import type { PieceListItem } from '@/lib/sanity/types'

export function ProductCard({ piece }: { piece: PieceListItem }) {
  const formattedPrice = formatCurrency(piece.price)
  const formattedOriginalPrice = formatCurrency(piece.originalPrice)
  return (
    <Link href={`/pieces/${piece.slug}`} className="group block space-y-4">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary rounded-sm">
        <Image
          src={
            piece.mainImage
              ? urlFor(piece.mainImage).width(1200).height(900).fit('crop').url()
              : '/placeholder.svg'
          }
          alt={piece.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-2">
            <ArrowRight className="w-8 h-8 text-foreground mx-auto" />
            <p className="text-sm">Voir les détails</p>
          </div>
        </div>

        {/* Stock Badge */}
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

      {/* Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-serif font-light group-hover:text-primary transition-colors">
            {piece.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {piece.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="text-xs">
            {piece.steel}
          </Badge>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{piece.hrc}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-light text-foreground">
              {formattedPrice ? `${formattedPrice}€` : 'Sur demande'}
            </span>
            {formattedOriginalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {`${formattedOriginalPrice}€`}
              </span>
            )}
          </div>
          <Button 
            size="sm"
            variant={piece.status === 'sold' ? 'outline' : 'default'}
            asChild
          >
            <span>{piece.status === 'sold' ? 'Voir' : 'Découvrir'}</span>
          </Button>
        </div>
      </div>
    </Link>
  )
}
