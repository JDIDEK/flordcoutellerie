'use client'

import { Badge } from '@/components/ui/badge'
import { StepHeader, PlaceholderVisual } from '../ui'
import { usageOptions } from '../data'
import type { Usage, WizardConfig, Action } from '../types'

interface UsageStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function UsageStep({ config, dispatch }: UsageStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader title="Usage principal" description="Choisissez la branche du configurateur" />
      <div className="grid md:grid-cols-2 gap-4">
        {usageOptions.map((option) => {
          const isSelected = config.usage === option.id
          return (
            <div
              key={option.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${
                option.disabled ? 'opacity-40 cursor-not-allowed' : ''
              } ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => {
                if (option.disabled) return
                dispatch({ type: 'setUsage', usage: option.id as Usage })
              }}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                  {option.disabled && <Badge variant="outline" className="text-[10px]">En cours</Badge>}
                </div>
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
