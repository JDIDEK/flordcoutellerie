'use client'

import Image from 'next/image'

import {
  StepHeader,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
import { defaultKitchenFormAsset } from '../assets'
import { kitchenForms } from '../data'
import type { WizardConfig, Action } from '../types'

const defaultPhotoSrc = defaultKitchenFormAsset

interface CuisineFormStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function CuisineFormStep({ config, dispatch }: CuisineFormStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Forme cuisine"
        description="Choisissez la silhouette adaptée à vos gestes"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kitchenForms.map((form) => {
          const isSelected = config.cuisineForm === form.id
          return (
            <div
              key={form.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setCuisineForm', form: form.id })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{form.label}</span>
                <span className="text-xs text-muted-foreground">{form.length}</span>
              </div>
              <div className={optionCardVisualClassName}>
                <Image
                  src={form.imageSrc ?? defaultPhotoSrc}
                  alt={form.imageAlt ?? `Photo ${form.label}`}
                  width={220}
                  height={160}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
