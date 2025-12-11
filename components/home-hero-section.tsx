'use client'

import Image from 'next/image'

import { TypingText } from '@/components/typing-text'
import { useIsMobile } from '@/hooks/use-mobile'

export function HomeHeroSection() {
  const isMobile = useIsMobile()
  const desktopHeroImage = '/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg'
  const mobileHeroImage = '/assets/images/folding-pocket-knife-damascus-premium.jpg'

  return (
    <section className="bg-black text-white h-screen">
      <div className="relative w-full h-full">
        {/* Image mobile - toujours rendue, cachée sur desktop */}
        <Image
          src={mobileHeroImage}
          alt="Atelier Flo RD Coutellerie"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 0px"
          className="object-cover object-center md:hidden"
        />
        {/* Image desktop - toujours rendue, cachée sur mobile */}
        <Image
          src={desktopHeroImage}
          alt="Atelier Flo RD Coutellerie"
          fill
          priority
          sizes="(max-width: 768px) 0px, 1920px"
          className="object-cover object-[center_40%] hidden md:block"
        />
        <div className="absolute inset-0 bg-black/45 md:bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85 md:from-black/40 md:to-black/80" />

        <div className="absolute inset-0 flex flex-col justify-between md:justify-center px-4 pt-20 pb-6 md:px-6 md:pt-0 md:pb-14 text-center">
          {/* Header mobile only */}
          <p className="text-[0.6rem] md:hidden uppercase tracking-[0.35em] text-neutral-200">
            Atelier sur-mesure • Fabrication artisanale
          </p>

          {/* Main content */}
          <div className="space-y-4 md:space-y-8 max-w-5xl mx-auto w-full">
            <h1 className="font-serif font-light leading-[1.05] md:leading-[0.9] tracking-tight space-y-1">
              {isMobile ? (
                <>
                  <span className="block text-3xl">LAMES</span>
                  <span className="block text-3xl">QUI TRAVERSENT</span>
                  <span className="block text-3xl">LES GÉNÉRATIONS.</span>
                </>
              ) : (
                <>
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
                </>
              )}
            </h1>
            
            <p className="text-sm md:text-base text-neutral-100 md:text-neutral-200 leading-relaxed max-w-xl mx-auto md:mx-0 md:max-w-none">
              Dans mon atelier, chaque couteau est une pièce unique façonnée dans les aciers les plus
              nobles. Des commandes sur mesure pour chefs, collectionneurs et passionnés qui
              recherchent une âme dans la lame.
            </p>
          </div>

          {/* Footer */}
          <p className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300 md:text-right">
            Service sur-mesure • Pièces uniques
          </p>
        </div>
      </div>
    </section>
  )
}
