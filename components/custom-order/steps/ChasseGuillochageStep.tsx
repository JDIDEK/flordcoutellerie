'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { guillochageMotifsCouteaux } from '../data'
import type { WizardConfig, Action } from '../types'

interface ChasseGuillochageStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function ChasseGuillochageStep({ config, dispatch }: ChasseGuillochageStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage"
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
              <span className={`flex-1 flex items-center font-medium px-4 ${isSelected ? 'text-primary' : ''}`}>{motif.label}</span>
              <div className="w-28 aspect-[2/1] bg-muted/30">
                <PlaceholderVisual label="Photo" />
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-sm text-muted-foreground">
        Une question ?{' '}
        <a href="/contact" className="text-primary hover:underline">Contactez-moi directement</a>
      </p>
    </div>
  )
}
