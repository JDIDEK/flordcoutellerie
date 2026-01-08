'use client'

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
            <div
              key={mechanism.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setPliantMechanism', mechanism: mechanism.id })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{mechanism.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{mechanism.description}</p>
              </div>
              <div className="w-28 aspect-[2/1] bg-muted/30 flex-shrink-0">
                <PlaceholderVisual label="Photo" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
