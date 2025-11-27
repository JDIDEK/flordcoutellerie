import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { AddToCartButton } from '@/components/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import type { PieceListItem } from '@/lib/sanity/types'
import { urlFor } from '@/sanity/lib/image'

export function ProductCard({ piece }: { piece: PieceListItem }) {
  const formattedPrice = formatCurrency(piece.price)
  const formattedOriginalPrice = formatCurrency(piece.originalPrice)
  const imageUrl = piece.mainImage
    ? urlFor(piece.mainImage).width(1200).height(900).fit('crop').url()
    : '/placeholder.svg'
  const isUnavailable = piece.status && piece.status !== 'available'

  return (
    <div className="block space-y-4">
      {/* Image */}
      <Link
        href={`/pieces/${piece.slug}`}
        className="group relative block aspect-[4/3] overflow-hidden bg-secondary rounded-sm"
      >
        <Image
          src={imageUrl}
          alt={piece.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-2">
            <ArrowRight className="w-8 h-8 text-foreground mx-auto" />
            <p className="text-sm">Voir les details</p>
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
            Reserve
          </Badge>
        )}
        {piece.originalPrice && piece.status === 'available' && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            Promo
          </Badge>
        )}
      </Link>

      {/* Info */}
      <div className="space-y-3">
        <div>
          <Link href={`/pieces/${piece.slug}`} className="block hover:text-primary transition-colors">
            <h3 className="text-xl font-serif font-light">
              {piece.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {piece.subtitle}
            </p>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Badge variant="outline" className="text-xs">
            {piece.steel}
          </Badge>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{piece.hrc}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-light text-foreground">
              {formattedPrice ? `${formattedPrice} EUR` : 'Sur demande'}
            </span>
            {formattedOriginalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {`${formattedOriginalPrice} EUR`}
              </span>
            )}
          </div>
          <AddToCartButton
            piece={{
              id: piece._id,
              name: piece.title,
              price: piece.price,
              image: imageUrl,
              slug: piece.slug,
              status: piece.status,
            }}
            buttonProps={{
              size: 'sm',
              variant: isUnavailable ? 'outline' : 'default',
              className: 'min-w-[140px]',
            }}
          />
        </div>
      </div>
    </div>
  )
}
