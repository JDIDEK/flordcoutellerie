'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import type { WizardConfig, Action } from '../types'

interface HandleCompositionStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function HandleCompositionStep({ config, dispatch }: HandleCompositionStepProps) {
  const options = [
    { id: 'simple', label: 'Simple', description: 'Un seul matériau pour l\'ensemble du manche' },
    { id: 'compose', label: 'Composé', description: 'Association de plusieurs matériaux et textures' },
  ]

  return (
    <div className="space-y-6">
      <StepHeader
        title="Composition"
        description="Simple ou composé de plusieurs matériaux"
      />
      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => {
          const isSelected = config.handleComposition === option.id
          return (
            <div
              key={option.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setHandleComposition', composition: option.id as 'simple' | 'compose' })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
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
