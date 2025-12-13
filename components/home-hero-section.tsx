'use client'

import Image from 'next/image'

import { TypingText } from '@/components/typing-text'

const HERO_LINES = ['LAMES', 'QUI TRAVERSENT', 'LES GÉNÉRATIONS.']
const desktopHeroImage = '/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg'
const mobileHeroImage = '/assets/images/folding-pocket-knife-damascus-premium.jpg'

export function HomeHeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[500px] md:min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 md:hidden">
        <Image
          src={mobileHeroImage}
          alt="Atelier Flo RD Coutellerie"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <Image
          src={desktopHeroImage}
          alt="Atelier Flo RD Coutellerie"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1920px"
          className="object-cover object-[center_40%]"
        />
      </div>

      <div className="absolute inset-0 bg-black/45 md:bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85 md:from-black/40 md:to-black/80" />

      <div className="relative z-10 flex h-full flex-col px-4 pt-20 pb-8 md:px-10 md:pt-0 md:pb-16">
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-neutral-200 md:hidden flex-shrink-0">
          Atelier sur-mesure • Fabrication artisanale
        </p>

        <div className="flex flex-1 flex-col justify-center text-center md:text-left max-w-5xl w-full mx-auto md:mx-0 gap-4 md:gap-8 min-h-0">
          <h1 className="font-serif font-light leading-[1.05] md:leading-[0.9] tracking-tight space-y-1">
            <div className="space-y-1 md:hidden">
              {HERO_LINES.map(line => (
                <span key={line} className="block text-3xl">
                  {line}
                </span>
              ))}
            </div>

            <div className="hidden md:block space-y-2">
              {HERO_LINES.map((line, index) => (
                <TypingText
                  key={line}
                  lines={[line]}
                  lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                  speed={index === 0 ? 50 : 40}
                  startDelay={500}
                />
              ))}
            </div>
          </h1>

          <p className="text-sm md:text-base text-neutral-100 md:text-neutral-200 leading-relaxed max-w-xl mx-auto md:mx-0 md:max-w-none">
            Dans mon atelier, chaque couteau est une pièce unique façonnée dans les aciers les plus
            nobles. Des commandes sur mesure pour chefs, collectionneurs et passionnés qui recherchent
            une âme dans la lame.
          </p>
        </div>

        <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300 md:text-right">
          Service sur-mesure • Pièces uniques
        </p>
      </div>
    </section>
  )
}
