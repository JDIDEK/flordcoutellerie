'use client'

import Image from 'next/image'

import { TypingText } from '@/components/typing-text'
import { useIsMobile } from '@/hooks/use-mobile'

export function HomeHeroSection() {
  const isMobile = useIsMobile()
  const desktopHeroImage = '/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg'
  const mobileHeroImage = '/assets/images/folding-pocket-knife-damascus-premium.jpg'

  if (isMobile) {
    return (
      <section className="bg-black text-white h-screen">
        <div className="relative w-full h-full">
          <Image
            src={mobileHeroImage}
            alt="Atelier Flo RD Coutellerie"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

          <div className="absolute inset-0 flex flex-col justify-between px-6 pt-24 pb-8 text-center">
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-neutral-200">
              Atelier sur-mesure • Fabrication artisanale
            </p>
            <div className="space-y-4">
              <h1 className="font-serif font-light text-3xl leading-[1.05] tracking-tight space-y-1">
                <span className="block">LAMES</span>
                <span className="block">QUI TRAVERSENT</span>
                <span className="block">LES GÉNÉRATIONS.</span>
              </h1>
              <p className="text-sm text-neutral-100 leading-relaxed">
                Dans mon atelier, chaque couteau est une pièce unique façonnée dans les aciers les plus
                nobles. Des commandes sur mesure pour chefs, collectionneurs et passionnés qui
                recherchent une âme dans la lame.
              </p>
            </div>
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-neutral-300">
              Service sur-mesure • Pièces uniques
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden text-white h-screen">
      <div className="absolute inset-0">
        <Image
          src={desktopHeroImage}
          alt="Atelier Flo RD Coutellerie"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1920px) 100vw, 1920px"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 flex flex-col h-screen">
        <div className="flex flex-1 flex-col items-center justify-center px-6 pt-24 pb-12 text-center md:px-0 md:pt-0">
          <div className="w-full max-w-5xl">
            <h1 className="font-serif font-light leading-[0.9] tracking-tight">
              <TypingText
                lines={['LAMES']}
                className=""
                lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                speed={50}
                startDelay={500}
                disabled={isMobile}
              />
              <TypingText
                lines={['QUI TRAVERSENT']}
                className=""
                lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                speed={40}
                startDelay={500}
                disabled={isMobile}
              />
              <TypingText
                lines={['LES GÉNÉRATIONS.']}
                className=""
                lineClassName="block text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
                speed={40}
                startDelay={500}
                disabled={isMobile}
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
