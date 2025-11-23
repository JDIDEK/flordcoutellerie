'use client'

import { usePathname } from 'next/navigation'

import { HomeFooter } from './home-footer'

export function FooterWrapper() {
  const pathname = usePathname()

  const shouldHide =
    pathname?.startsWith('/galerie') || pathname?.startsWith('/studio')

  if (shouldHide) {
    return null
  }

  return <HomeFooter />
}
