'use client'

import { useEffect, useState, useCallback } from 'react'

export function SiteLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const finishLoading = useCallback(() => {
    // S'assurer que la barre arrive à 100% avant de disparaître
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setIsVisible(false), 700)
    }, 300)
  }, [])

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const videoSrc = isDesktop 
      ? '/assets/videos/main-video.mp4' 
      : '/assets/videos/mobile_main-video.mp4'

    // Ressources à charger
    const resources = {
      video: { loaded: false, weight: 70 }, // La vidéo compte pour 70%
      dom: { loaded: false, weight: 20 },   // Le DOM compte pour 20%
      fonts: { loaded: false, weight: 10 }, // Les fonts comptent pour 10%
    }

    const updateProgress = () => {
      let totalProgress = 0
      Object.values(resources).forEach((resource) => {
        if (resource.loaded) {
          totalProgress += resource.weight
        }
      })
      setProgress(totalProgress)

      // Si tout est chargé
      if (totalProgress >= 100) {
        finishLoading()
      }
    }

    // Charger la vidéo
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true

    // Suivre le progrès du téléchargement de la vidéo
    let videoProgress = 0
    video.addEventListener('progress', () => {
      if (video.buffered.length > 0 && video.duration > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const newProgress = (bufferedEnd / video.duration) * 100
        if (newProgress > videoProgress) {
          videoProgress = newProgress
          // Mettre à jour le progrès partiel de la vidéo
          setProgress((prev) => {
            const videoContribution = (videoProgress / 100) * resources.video.weight
            const otherProgress = resources.dom.loaded ? resources.dom.weight : 0
            const fontProgress = resources.fonts.loaded ? resources.fonts.weight : 0
            return Math.min(videoContribution + otherProgress + fontProgress, 99)
          })
        }
      }
    })

    video.addEventListener('canplaythrough', () => {
      resources.video.loaded = true
      updateProgress()
    })

    video.addEventListener('error', () => {
      // En cas d'erreur, on considère la vidéo comme chargée pour ne pas bloquer
      resources.video.loaded = true
      updateProgress()
    })

    video.src = videoSrc
    video.load()

    // Vérifier le DOM
    const checkDOM = () => {
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        resources.dom.loaded = true
        updateProgress()
      }
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      checkDOM()
    } else {
      document.addEventListener('DOMContentLoaded', checkDOM)
    }

    // Vérifier les fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        resources.fonts.loaded = true
        updateProgress()
      })
    } else {
      // Fallback si l'API fonts n'est pas disponible
      resources.fonts.loaded = true
      updateProgress()
    }

    // Timeout de sécurité (max 8 secondes)
    const timeout = setTimeout(() => {
      finishLoading()
    }, 8000)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('DOMContentLoaded', checkDOM)
    }
  }, [finishLoading])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo ou Nom */}
        <div className="overflow-hidden">
          <h1 
            className={`font-serif text-2xl sm:text-3xl tracking-[0.3em] text-white transition-transform duration-700 delay-100 ${
              isLoading ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            FLO RD
          </h1>
        </div>
        
        {/* Sous-titre */}
        <div className="overflow-hidden">
          <p 
            className={`text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.4em] text-neutral-400 transition-transform duration-700 delay-200 ${
              isLoading ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            Coutellerie d&apos;Art
          </p>
        </div>

        {/* Barre de chargement réelle */}
        <div className="relative mt-4 h-[1px] w-32 overflow-hidden bg-neutral-800">
          <div 
            className="absolute inset-y-0 left-0 bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pourcentage */}
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-neutral-500 tabular-nums">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  )
}
