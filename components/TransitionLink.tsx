'use client'

import NextLink from 'next/link'
import { usePageTransition } from './TransitionProvider'
import { type ComponentProps, useCallback } from 'react'

type TransitionLinkProps = ComponentProps<typeof NextLink> & {
  skipTransition?: boolean
}

export function TransitionLink({ 
  href, 
  onClick, 
  skipTransition = false,
  children, 
  ...props 
}: TransitionLinkProps) {
  const { startTransition, isTransitioning } = usePageTransition()

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call original onClick if provided
    onClick?.(e)
    
    // Skip if default prevented, external link, or skipTransition
    if (e.defaultPrevented) return
    if (skipTransition) return
    
    const url = typeof href === 'string' ? href : href.pathname || ''
    
    // Skip for external links, hash links, or same page
    if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:')) return
    
    // Prevent default and start transition
    e.preventDefault()
    if (!isTransitioning) {
      startTransition(url)
    }
  }, [href, onClick, skipTransition, startTransition, isTransitioning])

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  )
}
