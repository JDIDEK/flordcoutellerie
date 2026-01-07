'use client'

import { Card } from '@/components/ui/card'
import { StepHeader, PlaceholderVisual } from '../ui'
import { pliantMechanisms } from '../data'
import type { WizardConfig, Action } from '../types'

interface PliantMechanismStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PliantMechanismStep({ config, dispatch }: PliantMechanismStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Mécanisme"
        description="Sélectionnez le système d'ouverture"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {pliantMechanisms.map((mechanism) => {
          const isSelected = config.pliantMechanism === mechanism.id
          return (
            <Card
              key={mechanism.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setPliantMechanism', mechanism: mechanism.id })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="font-medium">{mechanism.label}</h3>
                  <p className="text-sm text-muted-foreground">{mechanism.description}</p>
                </div>
                <div className="w-32">
                  <PlaceholderVisual label="Croquis" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
