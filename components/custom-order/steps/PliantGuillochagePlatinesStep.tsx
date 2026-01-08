'use client'

import { Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StepHeader, PlaceholderVisual } from '../ui'
import { guillochageMotifs } from '../data'
import type { WizardConfig, Action } from '../types'

interface PliantGuillochagePlatinesStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PliantGuillochagePlatinesStep({ config, dispatch }: PliantGuillochagePlatinesStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage platines"
        description="Motifs décoratifs gravés sur les platines gauche et droite."
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-sm">Platine gauche</h4>
          </div>
          <PlaceholderVisual label="Guillochage" />
          <div className="flex flex-wrap gap-2">
            {guillochageMotifs.map((motif) => {
              const active = config.guillochagePlatineLeft === motif.label
              return (
                <Button
                  key={motif.id}
                  variant={active ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => dispatch({ type: 'setGuillochagePlatineLeft', motif: motif.label })}
                >
                  {motif.label}
                </Button>
              )
            })}
          </div>
        </Card>
        <Card className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-sm">Platine droite</h4>
          </div>
          <PlaceholderVisual label="Guillochage" />
          <div className="flex flex-wrap gap-2">
            {guillochageMotifs.map((motif) => {
              const active = config.guillochagePlatineRight === motif.label
              return (
                <Button
                  key={motif.id}
                  variant={active ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => dispatch({ type: 'setGuillochagePlatineRight', motif: motif.label })}
                >
                  {motif.label}
                </Button>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
