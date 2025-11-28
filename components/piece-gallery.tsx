'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type GalleryImage = {
  src: string
  alt: string
}

type PieceGalleryProps = {
  images: GalleryImage[]
  status?: string
}

export function PieceGallery({ images, status }: PieceGalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)
  const hasMultiple = images.length > 1

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrentIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  const statusLabel =
    status === 'sold' ? 'Vendu' : status === 'reserved' ? 'Réservé' : null

  return (
    <div className="space-y-4">
      <Carousel
        opts={{ align: 'start', loop: hasMultiple }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {images.map((image, idx) => (
            <CarouselItem key={idx} className="pl-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted animate-scale-in">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                  priority={idx === 0}
                />
                {statusLabel && idx === 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground">
                    {statusLabel}
                  </Badge>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMultiple && (
          <>
            <CarouselPrevious className="top-1/2 -left-6 -translate-y-1/2 bg-white/90 text-foreground shadow-lg hover:bg-white" />
            <CarouselNext className="top-1/2 -right-6 -translate-y-1/2 bg-white/90 text-foreground shadow-lg hover:bg-white" />
          </>
        )}
      </Carousel>

      {hasMultiple && (
        <div className="flex flex-wrap gap-3">
          {images.map((image, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              className={cn(
                'relative h-20 w-20 overflow-hidden rounded-md border transition-all duration-200',
                currentIndex === idx
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-transparent opacity-80 hover:opacity-100',
              )}
              aria-label={`Voir l'image ${idx + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
