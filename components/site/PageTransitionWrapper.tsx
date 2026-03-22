'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageTransitionWrapperProps {
  children: ReactNode
  className?: string
}

export function PageTransitionWrapper({ children, className }: PageTransitionWrapperProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === 'undefined') return false
    return document.documentElement.dataset.siteLoaderComplete === 'true'
  })

  useEffect(() => {
    let frameId: number | null = null

    const reveal = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
      frameId = requestAnimationFrame(() => {
        setIsVisible(true)
      })
    }

    if (document.documentElement.dataset.siteLoaderComplete === 'true') {
      reveal()
      return () => {
        if (frameId !== null) {
          cancelAnimationFrame(frameId)
        }
      }
    }

    const handleLoaderFinished = () => {
      reveal()
    }

    window.addEventListener('site-loader-finished', handleLoaderFinished)

    return () => {
      window.removeEventListener('site-loader-finished', handleLoaderFinished)
      if (frameId !== null) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [])

  return (
    <div
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4',
        className
      )}
    >
      {children}
    </div>
  )
}
