import Image from "next/image"
import Link from "next/link"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { formatCurrency } from "@/lib/utils"
import type { PieceListItem } from "@/lib/sanity/types"
import { urlFor } from "@/sanity/lib/image"
import { ShoppingBag } from "lucide-react"

export function ProductCard({ piece }: { piece: PieceListItem }) {
  const formattedPrice = piece.price ? formatCurrency(piece.price) : null

  const imageUrl = piece.mainImage
    ? urlFor(piece.mainImage).width(1200).height(1500).fit("crop").url()
    : "/placeholder.svg"

  const title =
    piece.subtitle ? `${piece.title} - ${piece.subtitle}` : piece.title

  const isAvailable = !piece.status || piece.status === "available"

  return (
    <article>
      {/* --------- IMAGE + QUICK ADD --------- */}
      <div className="relative group">
        <Link
          href={`/pieces/${piece.slug}`}
          className="block overflow-hidden rounded-sm md:rounded-lg bg-muted/40 aspect-[4/5]"
        >
          <Image
            src={imageUrl}
            alt={piece.title}
            width={900}
            height={1200}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Bouton panier : apparaît au hover sur desktop, toujours visible sur mobile */}
        {isAvailable && (
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
              variant: "ghost",
              className: [
                "absolute bottom-3 right-3 group/cart overflow-hidden",
                "bg-white text-foreground rounded-full shadow-lg border border-black/5",
                "h-11 px-3 flex items-center gap-0",
                "opacity-100 md:opacity-0 translate-y-0 md:translate-y-2 pointer-events-auto md:pointer-events-none",
                "transition-all duration-300 ease-out",
                "md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto",
                "group-hover/cart:gap-2 hover:shadow-xl",
              ].join(" "),
              "aria-label": "Ajouter au panier",
              children: (
                <>
                  <ShoppingBag className="w-4 h-4 text-black" aria-hidden="true" />
                  <span
                    className={[
                      "whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em]",
                      "max-w-0 opacity-0 overflow-hidden",
                      "transition-all duration-300 ease-out",
                      "group-hover/cart:max-w-[140px] group-hover/cart:opacity-100 group-hover/cart:ml-2",
                    ].join(" ")}
                  >
                    Ajouter au panier
                  </span>
                </>
              ),
            }}
          />
        )}
      </div>

      {/* --------- TITRE + PRIX EN DESSOUS --------- */}
      <div className="flex items-center gap-2 text-sm mt-3 px-1">
        <Link
          href={`/pieces/${piece.slug}`}
          className="font-medium leading-tight hover:opacity-80 transition-opacity"
        >
          {title}
        </Link>

        <span>—</span>

        {formattedPrice && (
          <span className="text-muted-foreground whitespace-nowrap">
            {formattedPrice} EUR
          </span>
        )}
      </div>
    </article>
  )
}
