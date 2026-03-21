export const ACTIVE_CHECKOUT_RESERVATION_KEY = 'active-checkout-reservation'
const ACTIVE_CHECKOUT_RESERVATION_CHANGE_EVENT = 'active-checkout-reservation-change'
let cachedReservationRaw: string | null = null
let cachedReservation: ActiveCheckoutReservation | null = null

export type ActiveCheckoutReservation = {
  expiresAt: string
  productIds: string[]
  itemCount: number
  reservationId?: string
  sessionId?: string
  checkoutUrl?: string
}

export function readActiveCheckoutReservation() {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = localStorage.getItem(ACTIVE_CHECKOUT_RESERVATION_KEY)
  if (!raw) {
    cachedReservationRaw = null
    cachedReservation = null
    return null
  }

  if (raw === cachedReservationRaw) {
    return cachedReservation
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ActiveCheckoutReservation>
    const expiresAt = typeof parsed.expiresAt === 'string' ? parsed.expiresAt : null
    const productIds = Array.isArray(parsed.productIds)
      ? parsed.productIds.filter((value): value is string => typeof value === 'string')
      : []
    const itemCount =
      typeof parsed.itemCount === 'number' && parsed.itemCount > 0
        ? parsed.itemCount
        : productIds.length

    if (!expiresAt || productIds.length === 0 || Number.isNaN(Date.parse(expiresAt))) {
      cachedReservationRaw = raw
      cachedReservation = null
      return null
    }

    if (Date.parse(expiresAt) <= Date.now()) {
      cachedReservationRaw = raw
      cachedReservation = null
      return null
    }

    cachedReservationRaw = raw
    cachedReservation = {
      expiresAt,
      productIds,
      itemCount,
      reservationId: typeof parsed.reservationId === 'string' ? parsed.reservationId : undefined,
      sessionId: typeof parsed.sessionId === 'string' ? parsed.sessionId : undefined,
      checkoutUrl: typeof parsed.checkoutUrl === 'string' ? parsed.checkoutUrl : undefined,
    } satisfies ActiveCheckoutReservation

    return cachedReservation
  } catch {
    cachedReservationRaw = raw
    cachedReservation = null
    return null
  }
}

export function storeActiveCheckoutReservation(reservation: ActiveCheckoutReservation) {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(
    ACTIVE_CHECKOUT_RESERVATION_KEY,
    JSON.stringify(reservation)
  )
  cachedReservationRaw = null
  cachedReservation = null
  window.dispatchEvent(new Event(ACTIVE_CHECKOUT_RESERVATION_CHANGE_EVENT))
}

export function clearActiveCheckoutReservation() {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(ACTIVE_CHECKOUT_RESERVATION_KEY)
  cachedReservationRaw = null
  cachedReservation = null
  window.dispatchEvent(new Event(ACTIVE_CHECKOUT_RESERVATION_CHANGE_EVENT))
}

export function subscribeToActiveCheckoutReservation(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handleChange = () => callback()
  const handleStorage = (event: StorageEvent) => {
    if (event.key === ACTIVE_CHECKOUT_RESERVATION_KEY) {
      callback()
    }
  }

  window.addEventListener(ACTIVE_CHECKOUT_RESERVATION_CHANGE_EVENT, handleChange)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(ACTIVE_CHECKOUT_RESERVATION_CHANGE_EVENT, handleChange)
    window.removeEventListener('storage', handleStorage)
  }
}
