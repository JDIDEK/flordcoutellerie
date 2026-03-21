'use client'

import type { ReactNode } from 'react'

import { useParallax } from '@/hooks/use-parallax'

type ParallaxMediaProps = {
  children: ReactNode
  strength?: number
  scale?: number
  className?: string
}

export function ParallaxMedia({
  children,
  strength = 24,
  scale = 1.1,
  className = '',
}: ParallaxMediaProps) {
  const ref = useParallax<HTMLDivElement>({ strength, scale })

  return (
    <div ref={ref} className={`h-full w-full will-change-transform ${className}`.trim()}>
      {children}
    </div>
  )
}
