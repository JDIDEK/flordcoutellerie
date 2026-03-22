'use client'

import Image from 'next/image'

import {
  StepHeader,
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
          const isDisabled = Boolean(form.disabled)
          return (
            <div
              key={form.id}
              className={getOptionCardClassName(
                isSelected,
                `flex items-stretch ${isDisabled ? 'cursor-not-allowed opacity-40' : ''}`
              )}
              onClick={() => {
                if (isDisabled) return
                dispatch({ type: 'setOutdoorForm', form: form.id })
              }}
            >
              <div className={optionCardContentClassName}>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{form.label}</span>
                </div>
              </div>
              <div className={optionCardVisualClassName}>
                {form.imageSrc ? (
                  <Image
                    src={form.imageSrc}
                    alt={form.imageAlt ?? `Photo ${form.label}`}
                    width={220}
                    height={160}
                    className="h-full w-full object-contain"
                  />
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
