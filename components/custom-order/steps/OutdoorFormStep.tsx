'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { outdoorForms } from '../data'
import type { WizardConfig, Action } from '../types'

interface OutdoorFormStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function OutdoorFormStep({ config, dispatch }: OutdoorFormStepProps) {
  const forms =
    config.outdoorUse === 'moderee'
      ? outdoorForms.filter((form) => ['campcraft', 'companion', 'bush'].includes(form.id))
      : outdoorForms.filter((form) => ['survie', 'bush'].includes(form.id))

  return (
    <div className="space-y-6">
      <StepHeader
        title="Forme outdoor"
        description="Longueur et épaisseur selon le terrain"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map((form) => {
          const isSelected = config.outdoorForm === form.id
          return (
            <div
              key={form.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setOutdoorForm', form: form.id })}
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
