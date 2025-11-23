'use client'

import { usePathname } from 'next/navigation'

import { HomeFooter } from './home-footer'

export function FooterWrapper() {
  const pathname = usePathname()

  if (pathname?.startsWith('/galerie')) {
    return null
  }

  return <HomeFooter />
}
