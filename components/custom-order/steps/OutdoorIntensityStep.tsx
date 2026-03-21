'use client'

import {
  StepHeader,
  PlaceholderVisual,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
import { outdoorUseCases } from '../data'
import type { WizardConfig, Action } from '../types'

interface OutdoorIntensityStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function OutdoorIntensityStep({ config, dispatch }: OutdoorIntensityStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Utilisation"
        description="Quel type d’activité est prévue ?"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outdoorUseCases.map((option) => {
          const isSelected = config.outdoorUse === option.id
          return (
            <div
              key={option.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setOutdoorUse', usage: option.id })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{option.label}</span>
                <p
                  className="mt-0.5 text-[10px] text-muted-foreground md:text-[11px]"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {option.description}
                </p>
                {option.note && (
                  <p
                    className="mt-0.5 text-[9px] italic text-muted-foreground md:text-[10px]"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {option.note}
                  </p>
                )}
              </div>
              <div className={optionCardVisualClassName}>
                <PlaceholderVisual
                  label="Photo"
                  className="h-full rounded-none border-0 bg-transparent"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
