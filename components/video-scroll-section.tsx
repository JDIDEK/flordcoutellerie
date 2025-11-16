'use client'

import { useEffect, useRef, useState } from 'react'

export function VideoScrollSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scale, setScale] = useState(1)
  const [borderRadius, setBorderRadius] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setScale(mobile ? 1 : 0.9)
      setBorderRadius(mobile ? 0 : 24)
    }

    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    videoRef.current?.play().catch(() => {})
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const threshold = windowHeight * 0.6

      if (rect.top >= threshold) {
        setScale(isMobile ? 1 : 0.9)
        setBorderRadius(isMobile ? 0 : 24)
        return
      }

      if (rect.top <= threshold && rect.bottom >= threshold) {
        const distance = Math.max(0, Math.min(threshold, threshold - rect.top))
        const progress = distance / threshold
        const newScale = isMobile ? 1 : 0.9 + progress * 0.1
        setScale(newScale)
        const newRadius = isMobile ? 0 : 24 * (1 - progress)
        setBorderRadius(newRadius)
      } else if (rect.bottom < threshold) {
        setScale(1)
        setBorderRadius(0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${borderRadius}px`,
            overflow: 'hidden',
          }}
        >
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              src="/assets/videos/main-video.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg"
            />
          </div>

          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

          <div className="relative z-10 flex flex-col h-full text-white px-4 sm:px-6">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="font-serif font-light leading-[0.9] tracking-tight">
                  <span className="block text-3xl sm:text-5xl lg:text-7xl">L'ART</span>
                  <span className="block text-3xl sm:text-5xl lg:text-7xl">DE LA FORGE</span>
                </h2>
              </div>
            </div>

            <div className="container mx-auto px-0 sm:px-6 pb-10 sm:pb-14">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8">
                <p className="max-w-xl text-sm sm:text-base text-neutral-200 leading-relaxed">
                  Découvrez le processus de création, de la forge à la finition. Chaque lame raconte une histoire.
                </p>
                <p className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300 text-left sm:text-right">
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
