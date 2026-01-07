'use client'

import { Card } from '@/components/ui/card'
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
        title="Utilisation outdoor"
        description="Modérée ou intensive, cela impacte la forme"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outdoorUseCases.map((option) => {
          const isSelected = config.outdoorUse === option.id
          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all overflow-hidden border-2 ${isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'}`}
              onClick={() => dispatch({ type: 'setOutdoorUse', usage: option.id })}
            >
              <div className="flex items-stretch min-h-28">
                {/* Text content - left side */}
                <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
                  <h3 className="font-bold text-base md:text-lg leading-tight">{option.label}</h3>
                  <div className="mt-1.5 space-y-0">
                    <p className="text-[11px] md:text-xs italic text-muted-foreground leading-tight">{option.description}</p>
                  </div>
                </div>
                {/* Image placeholder - right side */}
                <div className="w-28 md:w-40 flex items-center justify-center p-2 shrink-0 border-l border-foreground/10">
                  <div className="w-full h-full flex items-center justify-center">
                    <PlaceholderVisual label={option.label} />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
