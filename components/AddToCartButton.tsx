'use client'

import { type ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
import { useHydrated } from '@/hooks/use-hydrated'
import { useCart } from '@/hooks/use-cart'

type AddToCartButtonProps = {
  piece: {
    id: string
    name: string
    price?: number
    image?: string
    slug?: string
    status?: string
  }
  buttonProps?: ComponentProps<typeof Button>
}

export function AddToCartButton({ piece, buttonProps }: AddToCartButtonProps) {
  const { addItem, isInCart } = useCart()
  const hasHydrated = useHydrated()

  const isUnavailable = piece.status && piece.status !== 'available'
  const alreadyInCart = hasHydrated && isInCart(piece.id)
  const disabled = isUnavailable || alreadyInCart || buttonProps?.disabled
  const { children, ...restButtonProps } = buttonProps ?? {}

  const defaultLabel = isUnavailable
    ? 'Indisponible'
    : alreadyInCart
      ? 'Déjà dans le panier'
      : 'Ajouter au panier'
  const showCustomContent = children !== undefined && !isUnavailable

  const handleAdd = () => {
    if (disabled) return
    addItem({
      id: piece.id,
      name: piece.name,
      price: piece.price,
      image: piece.image,
      slug: piece.slug,
    })
  }

  return (
    <Button
      {...restButtonProps}
      disabled={disabled}
      onClick={handleAdd}
    >
      {showCustomContent ? children : defaultLabel}
    </Button>
  )
}
