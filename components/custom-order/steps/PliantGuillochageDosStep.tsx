'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { guillochageMotifsCouteaux } from '../data'
import type { WizardConfig, Action } from '../types'

interface PliantGuillochageDosStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PliantGuillochageDosStep({ config, dispatch }: PliantGuillochageDosStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage (principal)"
        description="L'originalité à la Française"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guillochageMotifsCouteaux.map((motif) => {
          const isSelected = config.guillochageCentral === motif.label
          return (
            <div
              key={motif.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setGuillochageCentral', motif: motif.label })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{motif.label}</span>
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
