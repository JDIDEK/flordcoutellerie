'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

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
  const [activeKnife, setActiveKnife] = useState(displayPieces[0])

  const activeImageSrc = useMemo(() => {
    if (activeKnife.mainImage) {
      return urlFor(activeKnife.mainImage).width(1600).height(1600).fit('crop').url()
    }
    return '/placeholder.jpg'
  }, [activeKnife.mainImage])

  const activePrice = formatCurrency(activeKnife.price)

  return (
    <section
      className="relative min-h-screen w-screen overflow-visible lg:overflow-hidden"
      style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
    >
      <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2 lg:h-screen">
        {/* Image - Mobile: stack vertical, Desktop: left side */}
        <div className="relative h-[50vh] lg:h-full bg-secondary/30 flex items-center justify-center overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 transition-opacity duration-500">
            <Image
              src={activeImageSrc}
              alt={activeKnife.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content - Mobile: top, Desktop: right side */}
        <div className="bg-primary/90 lg:bg-primary/80 flex flex-col justify-center px-6 lg:px-16 py-8 lg:py-12 text-primary-foreground order-1 lg:order-2">
          <div className="max-w-xl w-full space-y-4 lg:space-y-6 mx-auto">
            {/* Titre */}
            <div className="space-y-2 lg:space-y-4">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-light tracking-tight">
                COUTEAUX
                <br />
                SIGNATURE
              </h2>
            </div>

            {/* Liste desktop */}
            <div className="space-y-1 pt-6 lg:pt-8 hidden lg:block">
              {displayPieces.map((knife, index) => {
                const knifePrice = formatCurrency(knife.price)
                return (
                  <div
                    key={knife.slug ?? `${knife._id}-${index}`}
                    onMouseEnter={() => setActiveKnife(knife)}
                    className={`border-b border-primary-foreground/20 py-6 transition-all duration-300 cursor-pointer px-4 -mx-4 ${
                      activeKnife.slug === knife.slug
                        ? 'bg-primary-foreground/10'
                        : 'hover:bg-primary-foreground/5'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="text-xl md:text-2xl font-serif font-light">{knife.title}</h3>
                      <span className="text-base font-light whitespace-nowrap">
                        {knifePrice ? `${knifePrice}€` : 'Sur commande'}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 leading-relaxed">
                      {knife.steelSummary ?? 'Création sur mesure'}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Cards mobile scrollables horizontalement */}
            <div className="lg:hidden -mx-6 px-6">
              <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory pb-4 scrollbar-hide">
                {displayPieces.map((knife, index) => {
                  const knifePrice = formatCurrency(knife.price)
                  return (
                    <button
                      key={knife.slug ?? `${knife._id}-${index}`}
                      onClick={() => setActiveKnife(knife)}
                      className={`snap-start min-w-[85vw] text-left border border-primary-foreground/20 rounded-sm p-4 transition-all duration-300 ${
                        activeKnife.slug === knife.slug
                          ? 'bg-primary-foreground text-primary shadow-lg'
                          : 'bg-transparent hover:bg-primary-foreground/10'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-serif font-light">{knife.title}</h3>
                          <span className="text-base font-light whitespace-nowrap">
                            {knifePrice ? `${knifePrice}€` : 'Sur commande'}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${
                            activeKnife.slug === knife.slug
                              ? 'text-primary/70'
                              : 'text-primary-foreground/80'
                          }`}
                        >
                          {knife.steelSummary ?? 'Création sur mesure'}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2 lg:pt-4">
              <Link
                href="/pieces"
                className="group inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-70 transition-opacity duration-300"
              >
                <span>Voir Toutes les Pièces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
