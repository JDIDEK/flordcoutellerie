import type { SanityPieceStatus } from '@/lib/sanity/types'

export const RESERVATION_WINDOW_MINUTES = 30
export const RESERVATION_WINDOW_MS = RESERVATION_WINDOW_MINUTES * 60 * 1000

export function createReservationExpiry(now = Date.now()) {
  return new Date(now + RESERVATION_WINDOW_MS)
}

export function isReservationExpired(
  reservationExpiresAt?: string | null,
  now = Date.now()
) {
  if (!reservationExpiresAt) return false

  const expiryTime = Date.parse(reservationExpiresAt)
  if (Number.isNaN(expiryTime)) return false

  return expiryTime <= now
}

export function resolvePieceStatus(
  status?: SanityPieceStatus,
  reservationExpiresAt?: string | null,
  now = Date.now()
): SanityPieceStatus | undefined {
  if (status === 'reserved' && isReservationExpired(reservationExpiresAt, now)) {
    return 'available'
  }

  return status
}
