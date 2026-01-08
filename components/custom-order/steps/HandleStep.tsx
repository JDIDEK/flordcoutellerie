'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { handleFamilies } from '../data'
import type { WizardConfig, Action } from '../types'

interface HandleStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function HandleStep({ config, dispatch }: HandleStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Manche"
        description="Choisissez le matériau de votre manche"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {handleFamilies.map((family) => {
          const isSelected = config.handleFamily === family.id
          return (
            <div
              key={family.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setHandle', family: family.id, variant: undefined })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{family.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{family.description}</p>
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
