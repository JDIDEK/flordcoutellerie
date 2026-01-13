'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { outdoorUseCases } from '../data'
import type { WizardConfig, Action } from '../types'

interface OutdoorIntensityStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function OutdoorIntensityStep({ config, dispatch }: OutdoorIntensityStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Utilisation"
        description="Quel type d’activité est prévue ?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outdoorUseCases.map((option) => {
          const isSelected = config.outdoorUse === option.id
          return (
            <div
              key={option.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setOutdoorUse', usage: option.id })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                <p className="text-[10px] md:text-[11px] text-muted-foreground mt-0.5">{option.description}</p>
                {option.note && (
                  <p className="text-[9px] md:text-[10px] text-muted-foreground italic mt-0.5">{option.note}</p>
                )}
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
