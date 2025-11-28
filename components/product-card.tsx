import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'
import type { PieceListItem } from '@/lib/sanity/types'
import { urlFor } from '@/sanity/lib/image'

export function ProductCard({ piece }: { piece: PieceListItem }) {
  const formattedPrice = piece.price ? formatCurrency(piece.price) : null
  const formattedOriginalPrice = piece.originalPrice
    ? formatCurrency(piece.originalPrice)
    : null

  const imageUrl = piece.mainImage
    ? urlFor(piece.mainImage).width(1200).height(900).fit('crop').url()
    : '/placeholder.svg'

  const isUnavailable = piece.status && piece.status !== 'available'

  return (
    <article className="group space-y-4">
      {/* Tuile image style galerie */}
      <Link
        href={`/pieces/${piece.slug}`}
        className="group/image block relative bg-muted/60 rounded-sm aspect-[4/5] overflow-hidden flex items-center justify-center"
      >
        <Image
          src={imageUrl}
          alt={piece.title}
          width={900}
          height={1100}
          className="h-[70%] w-auto object-contain transition-transform duration-500 ease-out group-hover/image:scale-[1.03]"
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
        {formattedOriginalPrice && piece.status === 'available' && (
          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
            Promo
          </Badge>
        )}
      </Link>

      {/* Infos sous la tuile */}
      <div className="space-y-3">
        <div>
          <Link
            href={`/pieces/${piece.slug}`}
            className="block hover:text-primary transition-colors"
          >
            <h3 className="text-lg md:text-xl font-serif font-light tracking-tight">
              {piece.title}
            </h3>
            {piece.subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {piece.subtitle}
              </p>
            )}
          </Link>
        </div>

        {(piece.steel || piece.hrc) && (
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
            {piece.steel && (
              <Badge variant="outline" className="text-[0.7rem] md:text-xs">
                {piece.steel}
              </Badge>
            )}
            {piece.steel && piece.hrc && <span>|</span>}
            {piece.hrc && <span>{piece.hrc}</span>}
          </div>
        )}

        <div className="flex flex-col gap-1 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base md:text-lg font-light text-foreground">
              {formattedPrice ? `${formattedPrice} EUR` : 'Prix sur demande'}
            </span>
            {formattedOriginalPrice && (
              <span className="text-xs md:text-sm text-muted-foreground line-through">
                {`${formattedOriginalPrice} EUR`}
              </span>
            )}
          </div>

          {piece.status && (
            <span className="text-xs text-muted-foreground">
              {piece.status === 'available'
                ? 'Disponible'
                : piece.status === 'reserved'
                ? 'Réservé'
                : 'Pièce vendue – recréation possible sur commande'}
            </span>
          )}
        </div>

        {/* BOUTON AVEC ANIMATIONS */}
        <div className="pt-3">
          {isUnavailable ? (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="btn-wave btn-press w-full min-h-[53px] text-xs tracking-[0.25em] uppercase justify-center"
            >
              <Link href={`/contact?piece=${piece.slug}`}>
                Me prévenir
              </Link>
            </Button>
          ) : (
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
                size: 'lg',
                className:
                  'btn-wave btn-press w-full min-h-[53px] text-xs tracking-[0.25em] uppercase justify-center',
              }}
            />
          )}
        </div>
      </div>
    </article>
  )
}
