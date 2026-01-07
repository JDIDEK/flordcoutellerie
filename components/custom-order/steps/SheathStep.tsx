'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StepHeader, PlaceholderVisual } from '../ui'
import { sheathOptions } from '../data'
import type { WizardConfig, Action } from '../types'

interface SheathStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function SheathStep({ config, dispatch }: SheathStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Étui"
        description="Adapté à l'usage outdoor"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {sheathOptions.map((sheath) => {
          const isSelected = config.sheath === sheath.id
          return (
            <Card
              key={sheath.id}
              className={`p-6 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => dispatch({ type: 'setSheath', sheath: sheath.id })}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">Étui {sheath.label}</h3>
                    <Badge variant="secondary">{sheath.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{sheath.description}</p>
                  <div className="pt-3">
                    <PlaceholderVisual label="Étui visuel" />
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
