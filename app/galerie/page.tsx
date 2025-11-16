'use client'

import { Navigation } from '@/components/navigation'
import { GalleryLightbox } from '@/components/gallery-lightbox'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

const images = [
  {
    id: 1,
    src: '/assets/images/damascus-steel-chef-knife-gyuto-kitchen.jpg',
    title: 'Gyuto Damasteel Fafnir',
    category: 'Cuisine',
    year: '2024'
  },
  {
    id: 2,
    src: '/assets/images/bushcraft-survival-knife-outdoor-blade.jpg',
    title: 'Bushcraft 14C28N',
    category: 'Outdoor',
    year: '2024'
  },
  {
    id: 3,
    src: '/assets/images/santoku-kitchen-knife-damascus-japanese.jpg',
    title: 'Santoku VG10',
    category: 'Cuisine',
    year: '2024'
  },
  {
    id: 4,
    src: '/assets/images/yanagiba-sushi-knife-damascus-steel.jpg',
    title: 'Yanagiba Traditionnel',
    category: 'Cuisine',
    year: '2023'
  },
  {
    id: 5,
    src: '/assets/images/folding-pocket-knife-damascus-premium.jpg',
    title: 'Piémontais Damas Rose',
    category: 'Pliants',
    year: '2024'
  },
  {
    id: 6,
    src: '/assets/images/nakiri-vegetable-knife-steel-blade.jpg',
    title: 'Nakiri Végétal',
    category: 'Cuisine',
    year: '2023'
  },
  {
    id: 7,
    src: '/artisan-knife-blade-damascus-steel-dark-workshop.jpg',
    title: 'Détail Damasteel',
    category: 'Détails',
    year: '2024'
  },
  {
    id: 8,
    src: '/placeholder.svg?key=kxyzp',
    title: 'Kiritsuke Premium',
    category: 'Cuisine',
    year: '2023'
  },
  {
    id: 9,
    src: '/placeholder.svg?key=jgb84',
    title: 'Cran Forcé Morta',
    category: 'Pliants',
    year: '2024'
  },
]

export default function GaleriePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = ['Tous', 'Cuisine', 'Outdoor', 'Pliants', 'Détails']

  const filteredImages = selectedCategory === 'Tous'
    ? images
    : images.filter(img => img.category === selectedCategory)

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-6">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.3em] text-primary uppercase">
                Galerie
              </p>
              <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">
                Créations
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              Une sélection de mes créations photographiées dans l'atelier. 
              Cliquez sur une image pour l'agrandir.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="aspect-square overflow-hidden bg-secondary rounded-sm mb-3">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {image.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{image.category}</span>
                    <span>•</span>
                    <span>{image.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
