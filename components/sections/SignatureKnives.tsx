'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'

import { urlFor } from '@/sanity/lib/image'
import { formatCurrency } from '@/lib/utils'
import type { SignaturePiece } from '@/lib/sanity/types'

type SignatureKnivesSectionProps = {
  pieces: SignaturePiece[]
}

const placeholderPiece: SignaturePiece = {
  _id: 'signature-placeholder',
  slug: 'signature-placeholder',
  title: 'Pièces signature inédites',
  steelSummary: 'Créations en cours d’atelier, bientôt disponibles',
}

export function SignatureKnivesSection({ pieces }: SignatureKnivesSectionProps) {
  const displayPieces = pieces.length ? pieces : [placeholderPiece]
  const [activeIndex, setActiveIndex] = useState(0)

  const activeKnife = displayPieces[activeIndex] ?? displayPieces[0]

  const activeImageSrc = useMemo(() => {
    if (activeKnife?.mainImage) {
      return urlFor(activeKnife.mainImage).width(1600).height(1600).fit('crop').url()
    }
    return '/placeholder.jpg'
  }, [activeKnife])

  const activePrice = formatCurrency(activeKnife?.price)

  return (
    <section
      className="relative z-30 w-full min-h-[var(--app-height)] overflow-hidden bg-background lg:sticky lg:top-0"
      data-stack-section
    >
      <div className="flex flex-col min-h-[var(--app-height)] lg:grid lg:grid-rows-1 lg:grid-cols-2 lg:h-screen">
        <div className="order-2 lg:order-1 relative min-h-[52svh] lg:h-full w-full overflow-hidden bg-secondary/30">
          <Image
            src={activeImageSrc}
            alt={activeKnife?.title ?? 'Pièce signature'}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover md:transition-transform md:duration-700"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.28em] text-neutral-100">
            <span>{activeKnife?.title}</span>
            {activePrice && <span>{activePrice}€</span>}
          </div>
        </div>

        <div className="order-1 lg:order-2 flex flex-col justify-center bg-primary/90 lg:bg-primary/80 px-5 py-10 lg:px-16 lg:py-14 text-primary-foreground gap-6">
          <div className="space-y-2">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-primary-foreground/80">Collection atelier</p>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-light tracking-tight">
              COUTEAUX
              <br />
              SIGNATURE
            </h2>
          </div>

          <div className="-mx-3 lg:mx-0">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-3 pb-2 lg:hidden scrollbar-hide">
              {displayPieces.map((knife, index) => {
                const knifePrice = formatCurrency(knife.price)
                const isActive = index === activeIndex

                return (
                  <button
                    key={knife.slug ?? `${knife._id}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`snap-start min-w-[78vw] rounded-sm border border-primary-foreground/20 p-4 text-left transition-all duration-300 ${
                      isActive ? 'bg-primary-foreground text-primary shadow-lg' : 'bg-transparent hover:bg-primary-foreground/10'
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-serif font-light">{knife.title}</h3>
                        <span className="text-base font-light whitespace-nowrap">{knifePrice ? `${knifePrice}€` : 'Sur commande'}</span>
                      </div>
                      <p className={`text-sm leading-relaxed ${isActive ? 'text-primary/70' : 'text-primary-foreground/80'}`}>
                        {knife.steelSummary ?? 'Création sur mesure'}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="hidden lg:flex lg:flex-col">
              {displayPieces.map((knife, index) => {
                const knifePrice = formatCurrency(knife.price)
                const isActive = index === activeIndex

                return (
                  <button
                    key={knife.slug ?? `${knife._id}-${index}`}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`text-left border-b border-primary-foreground/20 py-6 px-4 -mx-4 transition-all duration-300 ${
                      isActive ? 'bg-primary-foreground/10' : 'hover:bg-primary-foreground/5'
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-xl md:text-2xl font-serif font-light">{knife.title}</h3>
                      <span className="text-base font-light whitespace-nowrap">{knifePrice ? `${knifePrice}€` : 'Sur commande'}</span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed">{knife.steelSummary ?? 'Création sur mesure'}</p>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-end pt-1 lg:pt-2">
            <TransitionLink
              href="/pieces"
              className="group inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
            >
              <span>Voir Toutes les Pièces</span>
              <ArrowRight className="h-4 w-4 md:transition-transform md:duration-300 md:group-hover:translate-x-2" />
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
