'use client'

import { useEffect, useState } from 'react'

export function Loader() {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!isVisible) return
    if (progress < 100) return

    const timeout = setTimeout(() => setIsVisible(false), 500)
    return () => clearTimeout(timeout)
  }, [progress, isVisible])

  if (!isVisible) return null

  const isComplete = progress >= 100
  const progressValue = Math.max(0, Math.min(progress, 100))

  return (
    <div
      className="fixed inset-0 z-50 bg-background text-foreground"
      style={{
        opacity: isComplete ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: isComplete ? 'none' : 'auto',
      }}
    >
      <div className="relative h-full w-full">
        <div className="absolute top-10 left-10 space-y-1 text-muted-foreground">
          <p className="uppercase tracking-[0.5em] text-xs">FloRDCoutellerie</p>
          <p className="text-sm text-muted-foreground/80">France</p>
        </div>

        <div className="absolute bottom-20 left-10 space-y-4">
          <p className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-[0.3em]">
            FloRDCoutellerie
          </p>
          <span className="block h-px w-16 bg-primary" />
        </div>

        <div className="absolute bottom-8 left-10 right-10 h-px bg-border/20 overflow-hidden pointer-events-none">
          <span
            className="block h-full bg-foreground/70 transition-[width] duration-300 ease-out"
            style={{ width: `${progressValue}%` }}
          />
        </div>

        <div className="absolute bottom-12 right-12 flex flex-col items-end gap-3">
          <p className="text-5xl md:text-6xl font-light">{Math.round(progressValue)}%</p>
          <span className="block h-2 w-2 rounded-full bg-muted-foreground" />
        </div>
      </div>
    </div>
  )
}
