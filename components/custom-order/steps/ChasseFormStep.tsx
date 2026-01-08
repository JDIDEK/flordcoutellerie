'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { chasseForms } from '../data'
import type { WizardConfig, Action } from '../types'

interface ChasseFormStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function ChasseFormStep({ config, dispatch }: ChasseFormStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Forme du couteau de chasse"
        description="Choisissez la forme adaptée à votre pratique."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chasseForms.map((form) => {
          const isSelected = config.chasseForm === form.id
          return (
            <div
              key={form.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setChasseForm', form: form.id })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{form.label}</span>
                <span className="text-xs text-muted-foreground">{form.length}</span>
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
