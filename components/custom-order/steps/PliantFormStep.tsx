'use client'

import { Card } from '@/components/ui/card'
import { StepHeader, PlaceholderVisual } from '../ui'
import { pliantFormsByMechanism } from '../data'
import type { WizardConfig, Action } from '../types'

interface PliantFormStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PliantFormStep({ config, dispatch }: PliantFormStepProps) {
  const forms = config.pliantMechanism ? pliantFormsByMechanism[config.pliantMechanism] : []
  
  return (
    <div className="space-y-6">
      <StepHeader
        title="Forme de pliant"
        description="La silhouette dépend du mécanisme choisi"
      />
      {!config.pliantMechanism ? (
        <Card className="p-6 border-dashed border-primary/30 bg-primary/5 text-sm text-muted-foreground">
          Choisissez d'abord un mécanisme pour voir les formes disponibles.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forms?.map((form) => {
            const isSelected = config.pliantForm === form.id
            return (
              <div
                key={form.id}
                className={`flex items-stretch border-2 cursor-pointer transition-all ${
                  isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
                }`}
                onClick={() => dispatch({ type: 'setPliantForm', form: form.id })}
              >
                <div className="flex-1 flex flex-col justify-center px-4 py-3">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{form.label}</span>
                  <span className="text-xs text-muted-foreground">{form.profile}</span>
                </div>
                <div className="w-28 aspect-[2/1] bg-muted/30 flex-shrink-0">
                  <PlaceholderVisual label="Photo" />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
