'use client'

import Image from 'next/image'
import { ShoppingBag, Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/TransitionLink'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { cn, formatCurrency } from '@/lib/utils'

type CartSheetProps = {
  className?: string
  triggerClassName?: string
}

export function CartSheet({ className, triggerClassName }: CartSheetProps) {
  const { items, removeItem, clear } = useCart()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  )
  const totalLabel = formatCurrency(totalPrice) ?? '0'

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    setError(null)

    try {
      // Build array of product IDs (repeat for quantity)
      const productIds = items.flatMap((item) =>
        Array(item.quantity).fill(item.id)
      )

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du paiement')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet modal={false} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            'relative flex h-10 items-center justify-center text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            triggerClassName
          )}
          type="button"
          aria-label="Ouvrir le panier"
        >
          <ShoppingBag className="h-7 w-15" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      {open && (
        <button
          type="button"
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200"
        />
      )}

      <SheetContent side="right" className={cn('sm:max-w-md', className)}>
        <SheetHeader>
          <SheetTitle>Panier</SheetTitle>
          <SheetDescription>
            {totalItems > 0
              ? `${totalItems} article${totalItems > 1 ? 's' : ''}`
              : 'Votre panier est vide'}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-4 pb-2">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center text-sm text-muted-foreground">
              <p>Aucun article pour le moment.</p>
              <Button variant="outline" asChild>
                <TransitionLink href="/pieces" onClick={() => setOpen(false)}>
                  Voir les pieces
                </TransitionLink>
              </Button>
            </div>
          ) : (
            <ScrollArea className="max-h-[60vh] pr-3">
              <div className="space-y-4">
                {items.map((item) => {
                  const lineTotal = formatCurrency(
                    (item.price ?? 0) * item.quantity
                  )
                  return (
                    <div key={item.id} className="rounded-sm border border-border p-3">
                      <div className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-muted">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                              -
                            </div>
                          )}
                        </div>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium leading-tight">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.price
                                  ? `${formatCurrency(item.price)} EUR`
                                  : 'Prix sur demande'}
                              </p>
                              {item.slug && (
                                <TransitionLink
                                  href={`/pieces/${item.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="text-xs text-primary underline-offset-4 hover:underline"
                                >
                                  Voir la fiche
                                </TransitionLink>
                              )}
                            </div>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => removeItem(item.id)}
                              aria-label="Supprimer cet article"
                              type="button"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-end pt-2">
                            <span className="text-sm font-semibold">
                              {lineTotal ? `${lineTotal} EUR` : '-'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          )}
        </div>

        <Separator className="mt-2" />

        <SheetFooter>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="text-lg font-semibold">
              {totalLabel} EUR
            </span>
          </div>
          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
          <Button
            size="lg"
            disabled={items.length === 0 || isLoading}
            className="w-full"
            onClick={handleCheckout}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirection...
              </>
            ) : (
              'Paiement'
            )}
          </Button>
          {items.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground"
              onClick={clear}
              type="button"
            >
              Vider le panier
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
