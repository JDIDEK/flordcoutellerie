'use client'

import {
  StepHeader,
  PlaceholderVisual,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
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
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setChasseForm', form: form.id })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{form.label}</span>
                <span className="text-xs text-muted-foreground">{form.length}</span>
              </div>
              <div className={optionCardVisualClassName}>
                <PlaceholderVisual
                  label="Photo"
                  className="h-full rounded-none border-0 bg-transparent"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
