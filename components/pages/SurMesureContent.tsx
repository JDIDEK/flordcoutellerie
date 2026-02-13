'use client'

import { useEffect, useRef } from 'react'
import { CustomOrderWizard } from '@/components/CustomOrderWizard'

export function SurMesureContent() {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!contentRef.current || typeof ResizeObserver === 'undefined') return

    const resizeLenis = () => {
      const lenis = (window as any).lenis
      if (lenis?.resize) lenis.resize()
    }

    resizeLenis()
    const observer = new ResizeObserver(resizeLenis)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen flex flex-col justify-center pt-32 pb-20 bg-background">
      <div ref={contentRef} className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
                Créer votre Lame
              </h1>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              <strong className="inline-block whitespace-nowrap font-black text-foreground text-[clamp(0.72rem,3.4vw,1rem)]">
                Concevons ensemble une lame qui vous ressemble.
              </strong>
              <br />
              Forme, usage, matières.
              <br />
              Si un point vous échappe, nous en discutons simplement.
            </p>
          </div>

          {/* Wizard */}
          <CustomOrderWizard />
        </div>
      </div>
    </main>
  )
}
