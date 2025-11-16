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
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="w-full grid lg:grid-cols-2 h-full">
        {/* Left Side - Image dynamique */}
        <div className="relative h-full bg-secondary/30 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-500">
            <img
              src={activeKnife.image}
              alt={activeKnife.title}
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-8">
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight">
              {activeKnife.title}
            </h3>
          </div>
        </div>

        {/* Right Side - Menu des couteaux */}
        <div className="bg-primary/80 flex items-center justify-center px-8 lg:px-16 py-16 text-primary-foreground h-full overflow-y-auto">
          <div className="max-w-xl w-full space-y-6">
            {/* Titre */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                COUTEAUX
                <br />
                SIGNATURE
              </h2>
            </div>

            {/* Liste de couteaux - style menu */}
            <div className="space-y-1 pt-8">
              {knives.map((knife, index) => (
                <div 
                  key={index}
                  onMouseEnter={() => setActiveKnife(knife)}
                  className={`border-b border-primary-foreground/20 py-6 transition-all duration-300 cursor-pointer px-4 -mx-4 ${
                    activeKnife.title === knife.title 
                      ? 'bg-primary-foreground/10' 
                      : 'hover:bg-primary-foreground/5'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-xl md:text-2xl font-serif font-light">
                      {knife.title}
                    </h3>
                    <span className="text-base font-light whitespace-nowrap">
                      {knife.price}
                    </span>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed">
                    {knife.steel}
                  </p>
                </div>
              ))}
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
