'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StepHeader } from '../ui'
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
            <Card
              key={option.id}
              className={`p-6 transition-all ${option.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-primary'} ${isSelected ? 'border-primary bg-primary/5' : ''}`}
              onClick={() => {
                if (option.disabled) return
                dispatch({ type: 'setUsage', usage: option.id as Usage })
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{option.label}</h3>
                    {option.disabled && <Badge variant="outline">En cours</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
