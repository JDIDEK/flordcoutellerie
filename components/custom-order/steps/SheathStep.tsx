'use client'

import {
  StepHeader,
  PlaceholderVisual,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
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
        description="Pour emporter votre lame partout avec vous"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {sheathOptions.map((sheath) => {
          const isSelected = config.sheath === sheath.id
          return (
            <div
              key={sheath.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setSheath', sheath: sheath.id })}
            >
              <div className={optionCardContentClassName}>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>Étui {sheath.label}</span>
                </div>
                <p
                  className="mt-0.5 text-xs text-muted-foreground"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {sheath.description}
                </p>
                {sheath.note && (
                  <p
                    className="mt-0.5 text-xs italic text-muted-foreground"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {sheath.note}
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
