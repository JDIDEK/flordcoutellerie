'use client'

import { useState, type ComponentProps } from 'react'

import { Button } from '@/components/ui/button'
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
  const { addItem } = useCart()
  const [loading, setLoading] = useState(false)

  const isUnavailable = piece.status && piece.status !== 'available'
  const disabled = loading || isUnavailable || buttonProps?.disabled
  const { children, ...restButtonProps } = buttonProps ?? {}

  const defaultLabel = loading
    ? 'Ajout...'
    : isUnavailable
      ? 'Indisponible'
      : 'Ajouter au panier'
  const showCustomContent = children !== undefined && !loading && !isUnavailable

  const handleAdd = () => {
    if (disabled) return
    setLoading(true)
    try {
      addItem({
        id: piece.id,
        name: piece.name,
        price: piece.price,
        image: piece.image,
        slug: piece.slug,
      })
    } finally {
      setLoading(false)
    }
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
