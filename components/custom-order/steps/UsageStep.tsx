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
              className={`flex items-stretch border-2 cursor-pointer transition-all overflow-hidden ${
                option.disabled ? 'opacity-40 cursor-not-allowed' : ''
              } ${
                isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'
              }`}
              onClick={() => {
                if (option.disabled) return
                dispatch({ type: 'setUsage', usage: option.id as Usage })
              }}
            >
              <div className="flex-1 flex flex-col justify-center px-4 py-3 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                  {option.disabled && <Badge variant="outline" className="text-[10px]">En cours de création</Badge>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
              </div>
              <div className="w-24 h-16 bg-muted/30 flex-shrink-0 overflow-hidden">
                <PlaceholderVisual label="Photo" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
