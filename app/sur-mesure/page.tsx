'use client'

import { useEffect, useRef } from 'react'
import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { CustomOrderWizard } from '@/components/CustomOrderWizard'

export default function SurMesurePage() {
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
    <>
      <Navigation />
      
      <PageTransitionWrapper>
        <main className="min-h-screen pt-32 pb-20 bg-background">
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
                  Concevons ensemble votre couteau idéal. Choisissez les aciers,
                  formes, manches et finitions selon vos besoins et préférences.
                </p>
              </div>

              {/* Wizard */}
              <CustomOrderWizard />
            </div>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}
