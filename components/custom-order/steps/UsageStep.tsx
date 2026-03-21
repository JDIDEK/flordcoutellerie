'use client'

import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import {
  StepHeader,
  PlaceholderVisual,
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
                `grid grid-cols-[minmax(0,1fr)_140px] md:grid-cols-[minmax(0,1fr)_165px] ${
                  option.disabled ? 'opacity-40 cursor-not-allowed' : ''
                }`
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
                <p className="mt-0.5 max-w-[22ch] text-xs leading-relaxed text-muted-foreground">{option.description}</p>
              </div>
              <div className="flex h-full items-center justify-center py-1">
                {option.imageSrc ? (
                  <Image
                    src={option.imageSrc}
                    alt={option.imageAlt ?? `Illustration ${option.label}`}
                    width={165}
                    height={112}
                    sizes="(min-width: 768px) 165px, 140px"
                    className="h-full w-full object-contain object-center scale-x-150 transform-gpu"
                  />
                ) : (
                  <PlaceholderVisual
                    label="Photo"
                    className="h-full rounded-none border-0 bg-transparent"
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
