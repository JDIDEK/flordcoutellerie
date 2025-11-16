'use client'

import { useEffect, useRef, useState } from 'react'

export function VideoScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.9)
  const [borderRadius, setBorderRadius] = useState(24)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculer si on est dans la section (visible à l'écran)
      const isInView = rect.top < windowHeight && rect.bottom > 0
      
      if (isInView) {
        // Calculer la progression dans la section
        const progress = Math.max(0, Math.min(1, 
          (windowHeight - rect.top) / windowHeight
        ))
        
        // Animation de 0.9 à 1 (90% à 100%)
        const newScale = 0.9 + (progress * 0.1)
        setScale(newScale)
        
        // Animation du border radius (de 24px à 0)
        const newBorderRadius = 24 * (1 - progress)
        setBorderRadius(newBorderRadius)
      } else {
        // Quand on n'est pas dans la section, revenir à l'état initial
        setScale(0.9)
        setBorderRadius(24)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[150vh] overflow-hidden"
    >
      {/* Container full screen */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Container de la vidéo */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            overflow: 'hidden'
          }}
        >
          {/* Background video */}
          <div className="absolute inset-0">
            <video
              src="/assets/videos/main-video.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

          {/* Contenu */}
          <div className="relative z-10 flex flex-col h-full text-white">
            {/* Titre centré */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="font-serif font-light leading-[0.9] tracking-tight">
                  <span className="block text-4xl md:text-6xl lg:text-7xl">
                    L'ART
                  </span>
                  <span className="block text-4xl md:text-6xl lg:text-7xl">
                    DE LA FORGE
                  </span>
                </h2>
              </div>
            </div>

            {/* Texte en bas */}
            <div className="container mx-auto px-6 pb-14">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                <p className="max-w-xl text-sm md:text-base text-neutral-200 leading-relaxed">
                  Découvrez le processus de création, de la forge à la finition. Chaque lame raconte une histoire.
                </p>
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300 text-right">
                  Atelier • Tradition • Passion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
