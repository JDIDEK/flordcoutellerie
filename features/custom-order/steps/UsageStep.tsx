'use client'

import { Badge } from '@/components/ui/badge'
import {
  StepHeader,
  getOptionCardClassName,
  optionCardContentClassName,
} from '../ui'
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
              className={getOptionCardClassName(
                isSelected,
                `flex items-stretch ${option.disabled ? 'opacity-40 cursor-not-allowed' : ''}`
              )}
              onClick={() => {
                if (option.disabled) return
                dispatch({ type: 'setUsage', usage: option.id as Usage })
              }}
            >
              <div className={optionCardContentClassName}>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                  {option.disabled && <Badge variant="outline" className="text-[8px] px-1 py-0 border-foreground/50 text-foreground/70">En cours de création</Badge>}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground whitespace-nowrap">
                  {option.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
