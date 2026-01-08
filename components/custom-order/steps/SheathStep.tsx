'use client'

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
            <div
              key={sheath.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => dispatch({ type: 'setSheath', sheath: sheath.id })}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>Étui {sheath.label}</span>
                  <Badge variant="secondary" className="text-[10px]">{sheath.badge}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{sheath.description}</p>
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
