'use client'

import { useCallback, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Image {
  id: number
  src: string
  title: string
  category: string
  year: string
}

interface GalleryLightboxProps {
  images: Image[]
  currentIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export function GalleryLightbox({ images, currentIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const currentImage = images[currentIndex]

  const handlePrevious = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : images.length - 1)
  }, [currentIndex, images.length, onNavigate])

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < images.length - 1 ? currentIndex + 1 : 0)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleNext, handlePrevious, onClose])

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 z-10 text-foreground hover:text-primary"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-foreground hover:text-primary"
        onClick={handlePrevious}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-foreground hover:text-primary"
        onClick={handleNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Image Container */}
      <div className="flex items-center justify-center h-full p-20">
        <div className="max-w-7xl w-full flex flex-col items-center gap-8">
          <div className="relative w-full h-[70vh] flex items-center justify-center">
            <img
              src={currentImage.src || "/placeholder.svg"}
              alt={currentImage.title}
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl"
            />
          </div>

          {/* Image Info */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-serif font-light">
              {currentImage.title}
            </h2>
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <span>{currentImage.category}</span>
              <span>•</span>
              <span>{currentImage.year}</span>
              <span>•</span>
              <span>
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
        <div className="flex gap-2 justify-center overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onNavigate(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-sm overflow-hidden transition-all ${
                index === currentIndex
                  ? 'ring-2 ring-primary md:scale-110'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
