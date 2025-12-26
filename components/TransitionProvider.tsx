'use client'

import { useRouter } from 'next/navigation'
import { useCallback, createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TransitionContextType = {
  startTransition: (href: string) => void
  isTransitioning: boolean
}

const TransitionContext = createContext<TransitionContextType | null>(null)

export function usePageTransition() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within TransitionProvider')
  }
  return context
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'enter' | 'exit'>('idle')

  const startTransition = useCallback(
    (href: string) => {
      if (isTransitioning) return

      setIsTransitioning(true)
      setPhase('enter')

      setTimeout(() => {
        router.push(href)

        setTimeout(() => {
          setPhase('exit')

          setTimeout(() => {
            setIsTransitioning(false)
            setPhase('idle')
          }, 500)
        }, 100)
      }, 500)
    },
    [router, isTransitioning]
  )

  return (
    <TransitionContext.Provider value={{ startTransition, isTransitioning }}>
      {children}

      <div className={cn('fixed inset-0 z-[9999] pointer-events-none', isTransitioning && 'pointer-events-auto')} aria-hidden="true">
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-1/2 bg-background origin-top transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]',
            phase === 'enter' && 'scale-y-100',
            phase === 'exit' && 'scale-y-0',
            phase === 'idle' && 'scale-y-0'
          )}
        />

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-1/2 bg-background origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]',
            phase === 'enter' && 'scale-y-100',
            phase === 'exit' && 'scale-y-0',
            phase === 'idle' && 'scale-y-0'
          )}
        />
      </div>
    </TransitionContext.Provider>
  )
}
