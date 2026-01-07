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
              <Card
                key={form.id}
                className={`cursor-pointer transition-all overflow-hidden border-2 ${isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'}`}
                onClick={() => dispatch({ type: 'setPliantForm', form: form.id })}
              >
                <div className="flex items-stretch min-h-28">
                  {/* Text content - left side */}
                  <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
                    <h3 className="font-bold text-base md:text-lg leading-tight">{form.label}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{form.profile}</p>
                    <div className="mt-1.5 space-y-0">
                      <p className="text-[11px] md:text-xs italic text-muted-foreground leading-tight">{form.description}</p>
                    </div>
                  </div>
                  {/* Image placeholder - right side */}
                  <div className="w-28 md:w-40 flex items-center justify-center p-2 shrink-0 border-l border-foreground/10">
                    <div className="w-full h-full flex items-center justify-center">
                      <PlaceholderVisual label={form.label} />
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
