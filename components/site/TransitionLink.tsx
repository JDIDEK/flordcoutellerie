'use client'

import NextLink from 'next/link'
import { usePageTransition } from './TransitionProvider'
import { type ComponentProps, useCallback } from 'react'

type TransitionLinkProps = ComponentProps<typeof NextLink> & {
  skipTransition?: boolean
}

export function TransitionLink({ href, onClick, skipTransition = false, children, ...props }: TransitionLinkProps) {
  const { startTransition, isTransitioning } = usePageTransition()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e)

      if (e.defaultPrevented) return
      if (skipTransition) return

      const url = typeof href === 'string' ? href : href.pathname || ''

      if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:')) return

      e.preventDefault()
      if (!isTransitioning) {
        startTransition(url)
      }
    },
    [href, onClick, skipTransition, startTransition, isTransitioning]
  )

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  )
}
