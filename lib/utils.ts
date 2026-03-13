import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value?: number) {
  return value ? new Intl.NumberFormat('fr-FR').format(value) : null
}

export function formatAmountFromMinorUnits(
  value?: number | null,
  currency = 'EUR'
) {
  if (typeof value !== 'number') {
    return null
  }

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(value / 100)
}
