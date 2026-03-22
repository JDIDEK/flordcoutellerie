'use client'

import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getPersonalizationAsset } from '../assets'
import { StepHeader } from '../ui'
import { requiresRivetColor } from '../helpers'
import { rivetColors } from '../data'
import type { WizardConfig, Action } from '../types'

interface PersonalizationStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PersonalizationStep({
  config,
  dispatch,
}: PersonalizationStepProps) {
  const usage = config.usage ?? 'cuisine'
  const engravingImageSrc = getPersonalizationAsset(usage, 'engraving')
  const mosaicRivetImageSrc = getPersonalizationAsset(usage, 'mosaic-rivet')

  const showRivetColor = requiresRivetColor(config)
  const cardClassName = 'h-full gap-0 px-5 py-4'
  const cardIntroClassName = 'md:h-[94px]'
  const binaryControlsClassName = 'mt-3 flex h-12 items-start gap-2'
  const ternaryControlsClassName = 'mt-3 grid grid-cols-3 gap-2'

  return (
    <div className="space-y-6">
      <StepHeader
        title="Personnalisation"
        description="Choisissez les finitions"
      />

      <div
        className={`grid gap-4 ${showRivetColor ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}
      >
        <Card className={cardClassName}>
          <div className={cardIntroClassName}>
            <h4 className="font-medium">Gravure</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Initiales, date ou message court gravé sur la lame ou le manche.
            </p>
          </div>

          <div className={binaryControlsClassName}>
            <Button
              variant={config.engraving ? 'default' : 'outline'}
              size="sm"
              onClick={() => dispatch({ type: 'toggleEngraving', enabled: true })}
            >
              Oui
            </Button>
            <Button
              variant={!config.engraving ? 'default' : 'outline'}
              size="sm"
              onClick={() => dispatch({ type: 'toggleEngraving', enabled: false })}
            >
              Non
            </Button>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border">
            <div className="relative aspect-[16/7] w-full bg-muted/20">
              <Image
                src={engravingImageSrc}
                alt="Exemple de gravure"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-2 min-h-0">
            {config.engraving && (
              <Input
                placeholder="Texte à graver"
                value={config.engravingText}
                onChange={(e) =>
                  dispatch({ type: 'setEngravingText', text: e.target.value })
                }
              />
            )}
          </div>
        </Card>

        {showRivetColor && (
          <Card className={cardClassName}>
            <div className={cardIntroClassName}>
              <h4 className="font-medium">Couleur du rivet</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Choisissez la teinte du rivet parmi les finitions disponibles.
              </p>
            </div>

            <div className={ternaryControlsClassName}>
              {rivetColors.map((color) => (
                <Button
                  key={color.id}
                  variant={config.rivetColor === color.id ? 'default' : 'outline'}
                  size="sm"
                  className="h-auto flex-col items-center justify-center gap-1 py-2"
                  onClick={() =>
                    dispatch({ type: 'setRivetColor', color: color.id })
                  }
                >
                  <span className="text-xs leading-none">{color.label}</span>
                  <span
                    className={`relative h-5 w-5 overflow-hidden rounded-full border ${config.rivetColor === color.id ? 'border-primary-foreground/70' : 'border-border'}`}
                  >
                    <Image
                      src={color.imageSrc}
                      alt={color.imageAlt}
                      fill
                      sizes="20px"
                      className="object-cover"
                    />
                  </span>
                </Button>
              ))}
            </div>

            <div className="mt-3 min-h-0" />
          </Card>
        )}

        <Card className={cardClassName}>
          <div className={cardIntroClassName}>
            <h4 className="font-medium">Rivet mosaïque</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Ajoutez une finition décorative pour signer visuellement le manche.
            </p>
          </div>

          <div className={binaryControlsClassName}>
            <Button
              variant={config.mosaicRivet ? 'default' : 'outline'}
              size="sm"
              onClick={() => dispatch({ type: 'toggleMosaic', enabled: true })}
            >
              Oui
            </Button>
            <Button
              variant={!config.mosaicRivet ? 'default' : 'outline'}
              size="sm"
              onClick={() => dispatch({ type: 'toggleMosaic', enabled: false })}
            >
              Non
            </Button>
          </div>

          <div className="mt-3 overflow-hidden rounded-md border">
            <div className="relative aspect-[16/7] w-full bg-muted/20">
              <Image
                src={mosaicRivetImageSrc}
                alt="Exemple de rivet mosaïque"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-2 min-h-0" />
        </Card>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Commentaires additionnels</Label>
        <Textarea
          id="notes"
          placeholder="Détails de dimensions, préférences esthétiques, logo..."
          value={config.notes}
          onChange={(e) => dispatch({ type: 'setNotes', text: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}
