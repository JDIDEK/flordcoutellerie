'use client'

import Image from 'next/image'

import {
  StepHeader,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
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
        description="Fonctionnement du pliant
"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {pliantMechanisms.map((mechanism) => {
          const isSelected = config.pliantMechanism === mechanism.id
          return (
            <div
              key={mechanism.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setPliantMechanism', mechanism: mechanism.id })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{mechanism.label}</span>
                <p
                  className="mt-0.5 text-xs text-muted-foreground"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {mechanism.description}
                </p>
              </div>
              <div className={optionCardVisualClassName}>
                {mechanism.imageSrc ? (
                  <Image
                    src={mechanism.imageSrc}
                    alt={mechanism.imageAlt ?? `Photo ${mechanism.label}`}
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
