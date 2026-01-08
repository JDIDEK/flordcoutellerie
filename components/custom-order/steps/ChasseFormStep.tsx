'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StepHeader, PlaceholderVisual } from '../ui'
import { chasseForms } from '../data'
import type { WizardConfig, Action } from '../types'

interface ChasseFormStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function ChasseFormStep({ config, dispatch }: ChasseFormStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Forme du couteau de chasse"
        description="Choisissez la forme adaptée à votre pratique."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chasseForms.map((form) => {
          const isSelected = config.chasseForm === form.id
          return (
            <Card
              key={form.id}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              onClick={() => dispatch({ type: 'setChasseForm', form: form.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  dispatch({ type: 'setChasseForm', form: form.id })
                }
              }}
              className={`p-4 cursor-pointer transition-all border-2 hover:shadow-md ${
                isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:border-muted-foreground/20'
              }`}
            >
              <PlaceholderVisual label={form.label} />
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{form.label}</h3>
                  <Badge variant="secondary">{form.length}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{form.description}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
