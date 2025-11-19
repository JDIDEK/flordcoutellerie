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
  const priceLabel = activePrice ? `${activePrice}€` : 'Sur commande'

  return (
    <section
      className="relative min-h-screen overflow-hidden w-screen"
      style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
    >
      <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        {/* Left Side - Image dynamique */}
        <div className="relative flex-1 lg:h-full bg-secondary/30 flex items-center justify-center overflow-hidden min-h-[45vh] lg:min-h-screen order-1 lg:order-none">
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
          <div className="relative z-10 text-center text-white px-8">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight">
              {activeKnife.title}
            </h3>
            <p className="text-sm uppercase tracking-[0.3em] mt-4 text-white/70">
              {activeKnife.steelSummary ?? 'Signature en création'}
            </p>
            <p className="mt-6 text-xs tracking-[0.35em] text-white/60">{priceLabel}</p>
          </div>
        </div>

        {/* Right Side - Menu des couteaux */}
        <div className="bg-primary/80 flex flex-col justify-center px-6 lg:px-16 py-12 text-primary-foreground min-h-[55vh] lg:min-h-screen order-2 lg:order-none overflow-hidden">
          <div className="max-w-xl w-full space-y-6 mx-auto">
            {/* Titre */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                COUTEAUX
                <br />
                SIGNATURE
              </h2>
            </div>

            {/* Liste desktop */}
            <div className="space-y-1 pt-8 hidden lg:block">
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

            {/* Liste mobile scrollable */}
            <div className="lg:hidden space-y-3 overflow-y-auto pr-3" style={{ maxHeight: '22vh' }}>
              {displayPieces.map((knife, index) => {
                const knifePrice = formatCurrency(knife.price)
                return (
                  <button
                    key={knife.slug ?? `${knife._id}-${index}`}
                    onClick={() => setActiveKnife(knife)}
                    className={`w-full text-left border border-primary-foreground/20 rounded-sm p-4 transition-all duration-300 ${
                      activeKnife.slug === knife.slug
                        ? 'bg-primary-foreground text-primary shadow-lg shadow-black/10'
                        : 'bg-transparent hover:bg-primary-foreground/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] mb-2">{knife.title}</p>
                        <p
                          className={`text-sm ${
                            activeKnife.slug === knife.slug
                              ? 'text-black/70'
                              : 'text-primary-foreground/80'
                          }`}
                        >
                          {knife.steelSummary ?? 'Création sur mesure'}
                        </p>
                      </div>
                      <span className="text-base font-light whitespace-nowrap">
                        {knifePrice ? `${knifePrice}€` : 'Sur commande'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* CTA */}
            <div className="pt-4">
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
