'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { CheckoutConsentDialog } from '@/components/CheckoutConsentDialog'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { storeActiveCheckoutReservation } from '@/lib/checkout-reservation'
import { createInternalJsonHeaders } from '@/lib/internal-api'

type BuyNowButtonProps = {
  piece: {
    id: string
    name: string
    price?: number
    image?: string
    slug?: string
  }
  disabled?: boolean
}

export function BuyNowButton({ piece, disabled }: BuyNowButtonProps) {
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isConsentOpen, setIsConsentOpen] = useState(false)

  const handleBuyNow = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: createInternalJsonHeaders(),
        body: JSON.stringify({ productIds: [piece.id] }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du paiement')
      }

      if (data.url && data.expiresAt) {
        addItem({
          id: piece.id,
          name: piece.name,
          price: piece.price,
          image: piece.image,
          slug: piece.slug,
          quantity: 1,
        })

        storeActiveCheckoutReservation({
          expiresAt: data.expiresAt,
          productIds: [piece.id],
          itemCount: 1,
          reservationId: typeof data.reservationId === 'string' ? data.reservationId : undefined,
          sessionId: typeof data.id === 'string' ? data.id : undefined,
          checkoutUrl: data.url,
        })

        window.location.href = data.url
        return
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full hover:shadow-sm"
        type="button"
        disabled={disabled || isLoading}
        onClick={() => {
          setError(null)
          setIsConsentOpen(true)
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirection...
          </>
        ) : (
          'Acheter maintenant'
        )}
      </Button>
      {error && (
        <p className="text-xs text-destructive text-center">{error}</p>
      )}
      <CheckoutConsentDialog
        open={isConsentOpen}
        onOpenChange={setIsConsentOpen}
        onConfirm={handleBuyNow}
        isLoading={isLoading}
        error={error}
        itemCount={1}
      />
    </div>
  )
}
