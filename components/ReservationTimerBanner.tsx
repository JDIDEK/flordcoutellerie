'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { Clock3 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { useCurrentTime } from '@/hooks/use-current-time'
import {
  clearActiveCheckoutReservation,
  readActiveCheckoutReservation,
  subscribeToActiveCheckoutReservation,
} from '@/lib/checkout-reservation'

function formatRemainingTime(remainingMs: number) {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function ReservationTimerBanner() {
  const reservation = useSyncExternalStore(
    subscribeToActiveCheckoutReservation,
    readActiveCheckoutReservation,
    () => null
  )
  const now = useCurrentTime(Boolean(reservation))
  const remainingMs = reservation ? Date.parse(reservation.expiresAt) - now : null

  useEffect(() => {
    if (remainingMs !== null && remainingMs <= 0) {
      clearActiveCheckoutReservation()
    }
  }, [remainingMs])

  if (!reservation) {
    return null
  }

  if (remainingMs === null || remainingMs <= 0) {
    return null
  }

  const isEndingSoon = remainingMs <= 5 * 60 * 1000

  return (
    <div className="fixed left-4 right-4 top-20 z-40 md:left-auto md:right-6 md:top-24 md:w-[24rem]">
      <div className="rounded-xl border border-border/70 bg-background/95 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Clock3 className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                Reservation en cours
              </p>
              <Badge variant={isEndingSoon ? 'destructive' : 'secondary'}>
                {formatRemainingTime(remainingMs)}
              </Badge>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {reservation.itemCount > 1
                ? `${reservation.itemCount} pieces sont reservees pour votre paiement Stripe.`
                : 'Cette piece est reservee pour votre paiement Stripe.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
