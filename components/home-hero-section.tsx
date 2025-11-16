'use client'

import { TypingText } from '@/components/typing-text'

export function HomeHeroSection() {
  return (
    <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0">
        <img
          src="/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg"
          alt="Atelier Flo RD Coutellerie"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 flex flex-col min-h-[80vh] md:min-h-screen">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-12 text-center md:px-0 md:pt-0">
          <div className="w-full max-w-5xl">
            <h1 className="font-serif font-light leading-[0.9] tracking-tight">
              <TypingText
                lines={['LAMES']}
                className=""
                lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                speed={50}
                startDelay={500}
              />
              <TypingText
                lines={['QUI TRAVERSENT']}
                className=""
                lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                speed={40}
                startDelay={500}
              />
              <TypingText
                lines={['LES GÉNÉRATIONS.']}
                className=""
                lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                speed={40}
                startDelay={500}
              />
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-6 pb-10 md:pb-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
            <p className="max-w-xl text-sm md:text-base text-neutral-200 leading-relaxed">
              Dans mon atelier, chaque couteau est une pièce unique façonnée dans les aciers les
              plus nobles. Des commandes sur mesure pour chefs, collectionneurs et passionnés
              qui recherchent une âme dans la lame.
            </p>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300 text-right">
              Service sur-mesure • Pièces uniques
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
