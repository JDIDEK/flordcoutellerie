'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const knives = [
  {
    title: 'Gyuto Damasteel',
    steel: 'Acier Damascus DS93X - Trempe différentielle - 240mm',
    price: '1 150 €',
    image: '/assets/images/damascus-steel-chef-knife-gyuto-kitchen.jpg'
  },
  {
    title: 'Bushcraft Inox',
    steel: '14C28N Swedish Steel - Pleine soie - Fire starter',
    price: '390 €',
    image: '/assets/images/bushcraft-survival-knife-outdoor-blade.jpg'
  },
  {
    title: 'Santoku VG10',
    steel: 'VG10 Suminagashi 67 couches - Affûtage convexe',
    price: '850 €',
    image: '/assets/images/santoku-kitchen-knife-damascus-japanese.jpg'
  },
  {
    title: 'Yanagiba',
    steel: 'VG10 Suminagashi - Biseautage asymétrique - 270mm',
    price: '1 280 €',
    image: '/assets/images/yanagiba-sushi-knife-damascus-steel.jpg'
  },
]

export function SignatureKnivesSection() {
  const [activeKnife, setActiveKnife] = useState(knives[0])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-12 md:py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-[1.4fr_minmax(0,1fr)] lg:gap-12 items-stretch">
          {/* Left Side - Image dynamique */}
          <div className="relative bg-secondary/30 rounded-sm overflow-hidden min-h-[420px] lg:min-h-[70vh]">
            <div className="absolute inset-0 transition-all duration-700">
              <img
                src={activeKnife.image}
                alt={activeKnife.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80" />

            <div className="relative z-10 flex flex-col h-full justify-between p-8 md:p-12 text-white">
              <div className="space-y-4">
                <p className="text-sm tracking-[0.2em] uppercase text-white/80">
                  Pièces signature
                </p>
                <h3 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-tight">
                  {activeKnife.title}
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-lg font-light">{activeKnife.price}</p>
                <p className="text-sm text-white/80">{activeKnife.steel}</p>
              </div>
            </div>
          </div>

          {/* Right Side - Menu des couteaux */}
          <div className="bg-primary/90 rounded-sm p-5 md:p-6 text-primary-foreground h-fit max-h-[60vh] flex flex-col">
            <div className="space-y-2 mb-8">
              <p className="text-xs tracking-[0.4em] uppercase text-primary-foreground/70">
                Sélection
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-light">Couteaux signature</h2>
            </div>

            <div className="space-y-3 overflow-y-auto pr-3 custom-scrollbar flex-1 relative" style={{ maxHeight: '18vh' }}>
              {knives.map((knife, index) => (
                <button
                  key={index}
                  onClick={() => setActiveKnife(knife)}
                  className={`w-full text-left border border-primary-foreground/20 rounded-sm p-4 transition-all duration-300 ${
                    activeKnife.title === knife.title
                      ? 'bg-primary-foreground text-primary shadow-lg shadow-black/10'
                      : 'bg-transparent hover:bg-primary-foreground/10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] mb-2">
                        {knife.title}
                      </p>
                      <p
                        className={`text-sm ${
                          activeKnife.title === knife.title
                            ? 'text-black/80'
                            : 'text-primary-foreground/80'
                        }`}
                      >
                        {knife.steel}
                      </p>
                    </div>
                    <span className="text-base font-light whitespace-nowrap">{knife.price}</span>
                  </div>
                </button>
              ))}
              <div className="pointer-events-none absolute top-3 right-0 h-[calc(100%-1.5rem)] w-1 rounded-full bg-primary-foreground/10">
                <span
                  className="block w-full rounded-full bg-primary-foreground/50"
                  style={{ height: '25%' }}
                />
              </div>
            </div>

            <div className="pt-8">
              <Link
                href="/pieces"
                className="group inline-flex items-center gap-3 text-sm tracking-wide hover:opacity-80 transition-opacity duration-300"
              >
                <span>Voir toutes les pièces</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
