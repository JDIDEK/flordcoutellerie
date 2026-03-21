'use client'

import {
  StepHeader,
  PlaceholderVisual,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
import { outdoorFormsModerate, outdoorFormsIntensive } from '../data'
import type { WizardConfig, Action } from '../types'

interface OutdoorFormStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function OutdoorFormStep({ config, dispatch }: OutdoorFormStepProps) {
  const isModerate = config.outdoorUse === 'moderee'
  const forms = isModerate ? outdoorFormsModerate : outdoorFormsIntensive
  const intensityLabel = isModerate ? 'modérée' : 'intensive'

  return (
    <div className="space-y-6">
      <StepHeader
        title={`Forme (${intensityLabel})`}
        description="Designs originaux et uniques"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {forms.map((form) => {
          const isSelected = config.outdoorForm === form.id
          return (
            <div
              key={form.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setOutdoorForm', form: form.id })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{form.label}</span>
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
