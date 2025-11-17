'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Check, Mail, ZoomIn } from 'lucide-react'

interface Piece {
  id: number
  title: string
  subtitle: string
  steel: string
  layers: string
  hrc: string
  handle: string
  length: string
  price: string
  originalPrice?: string
  stock: 'available' | 'sold'
  image: string
  features: string[]
}

export function ProductCard({ piece }: { piece: Piece }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  return (
    <>
      <div className="group space-y-4 hover-lift">
        {/* Image with Zoom */}
        <div 
          className="relative aspect-[4/3] overflow-hidden bg-secondary rounded-sm cursor-pointer image-reveal"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <Image
            src={piece.image || "/placeholder.svg"}
            alt={piece.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center space-y-2">
              <ZoomIn className="w-8 h-8 text-foreground mx-auto" />
              <p className="text-sm">Voir les détails</p>
            </div>
          </div>

          {/* Stock Badge */}
          {piece.stock === 'sold' && (
            <Badge className="absolute top-4 left-4 bg-destructive/90 text-destructive-foreground">
              Vendu
            </Badge>
          )}
          {piece.originalPrice && piece.stock === 'available' && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              Promo
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-serif font-light group-hover:text-primary transition-colors cursor-pointer" onClick={() => setIsOpen(true)}>
              {piece.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {piece.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="text-xs">
              {piece.steel}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">{piece.hrc}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-light text-primary">
                {piece.price}€
              </span>
              {piece.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {piece.originalPrice}€
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={() => setIsOpen(true)}
              disabled={piece.stock === 'sold'}
              className="hover-lift"
            >
              {piece.stock === 'sold' ? 'Épuisé' : 'Voir'}
            </Button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
          <DialogHeader>
            <DialogTitle className="text-3xl font-serif font-light">
              {piece.title}
            </DialogTitle>
            <p className="text-muted-foreground">{piece.subtitle}</p>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-secondary rounded-sm">
              <Image
                src={piece.image || "/placeholder.svg"}
                alt={piece.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-light text-primary">
                  {piece.price}€
                </span>
                {piece.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {piece.originalPrice}€
                  </span>
                )}
              </div>

              <Separator />

              {/* Specifications */}
              <div className="space-y-4">
                <h4 className="font-medium text-sm uppercase tracking-wider">
                  Spécifications
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Acier</span>
                    <span className="font-medium">{piece.steel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Couches</span>
                    <span className="font-medium">{piece.layers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dureté</span>
                    <span className="font-medium">{piece.hrc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manche</span>
                    <span className="font-medium">{piece.handle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Longueur</span>
                    <span className="font-medium">{piece.length}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm uppercase tracking-wider">
                  Caractéristiques
                </h4>
                <ul className="space-y-2">
                  {piece.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* CTA */}
              {piece.stock === 'available' ? (
                <div className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <a href="mailto:floribadeaudumas@gmail.com?subject=Commande%20-%20${piece.title}">
                      <Mail className="mr-2 h-4 w-4" />
                      Commander par Email
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Acompte de 20% à la commande • Livraison sous 2-4 semaines
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button className="w-full" size="lg" variant="outline" asChild>
                    <a href={`mailto:floribadeaudumas@gmail.com?subject=Recréation%20-%20${piece.title}`}>
                      Recréer cette Pièce
                    </a>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Cette pièce est vendue mais peut être recréée avec des variations uniques
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
