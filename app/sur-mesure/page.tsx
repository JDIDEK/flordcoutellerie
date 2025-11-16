'use client'

import { Navigation } from '@/components/navigation'
import { CustomOrderWizard } from '@/components/custom-order-wizard'

export default function SurMesurePage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="space-y-2">
                <p className="text-sm tracking-[0.3em] text-primary uppercase">
                  Commander
                </p>
                <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">
                  Créer votre Lame
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                Concevons ensemble votre couteau idéal. Choisissez les aciers, 
                formes, manches et finitions selon vos besoins et préférences.
              </p>
            </div>

            {/* Wizard */}
            <CustomOrderWizard />
          </div>
        </div>
      </main>
    </>
  )
}
