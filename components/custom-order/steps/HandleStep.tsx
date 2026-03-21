'use client'

import {
  StepHeader,
  PlaceholderVisual,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
import { handleFamilies } from '../data'
import type { WizardConfig, Action } from '../types'

interface HandleStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function HandleStep({ config, dispatch }: HandleStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Manche"
        description="Chaque matériau a son caractère et son histoire"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {handleFamilies.map((family) => {
          const isSelected = config.handleFamily === family.id
          return (
            <div
              key={family.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => dispatch({ type: 'setHandle', family: family.id, variant: undefined })}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{family.label}</span>
                <p
                  className="mt-0.5 text-xs text-muted-foreground"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {family.description}
                </p>
                {family.note && (
                  <p
                    className="mt-0.5 text-xs italic text-muted-foreground"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {family.note}
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
