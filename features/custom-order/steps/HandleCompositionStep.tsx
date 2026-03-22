'use client'

import Image from 'next/image'

import {
  StepHeader,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
import { getHandleCompositionAsset } from '../assets'
import type { WizardConfig, Action } from '../types'

interface HandleCompositionStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function HandleCompositionStep({ config, dispatch }: HandleCompositionStepProps) {
  const usage = config.usage ?? 'cuisine'
  const options = [
    {
      id: 'simple',
      label: 'Simple',
      description: 'Un seul matériau pour l\'ensemble du manche',
      imageSrc: getHandleCompositionAsset(usage, 'simple'),
    },
    {
      id: 'compose',
      label: 'Composé',
      description: 'Association de plusieurs matériaux et textures',
      imageSrc: getHandleCompositionAsset(usage, 'compose'),
    },
  ]

  return (
    <div className="space-y-6">
      <StepHeader
        title="Composition"
        description="Simple ou composé de plusieurs matériaux"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = config.handleComposition === option.id
          return (
            <div
              key={option.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setHandleComposition', composition: option.id as 'simple' | 'compose' })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                <p
                  className="mt-0.5 text-xs text-muted-foreground"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {option.description}
                </p>
              </div>
              <div className={optionCardVisualClassName}>
                <Image
                  src={option.imageSrc}
                  alt={`Photo ${option.label}`}
                  width={220}
                  height={160}
                  className={`h-full w-full ${usage === 'pliant' || usage === 'outdoor' ? 'object-cover' : 'object-contain'}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
