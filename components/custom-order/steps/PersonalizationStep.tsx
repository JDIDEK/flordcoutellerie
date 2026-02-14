'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { StepHeader, PlaceholderVisual } from '../ui'
import type { WizardConfig, Action } from '../types'

interface PersonalizationStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PersonalizationStep({ config, dispatch }: PersonalizationStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Personnalisation"
        description="Choisissez les finitions"
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Gravure</h4>
              <p className="text-sm text-muted-foreground">Initiales, date, message court</p>
            </div>
            <div className="flex gap-2">
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
          </div>
          <PlaceholderVisual label="Zone gravure" />
          {config.engraving && (
            <Input
              placeholder="Texte à graver"
              value={config.engravingText}
              onChange={(e) => dispatch({ type: 'setEngravingText', text: e.target.value })}
            />
          )}
        </Card>
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Rivet mosaïque</h4>
              <p className="text-sm text-muted-foreground">Finition décorative sur le manche</p>
            </div>
            <div className="flex gap-2">
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
          </div>
          <PlaceholderVisual label="Rivet" />
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
