'use client'

import { StepHeader, PlaceholderVisual, MetricLine } from '../ui'
import { getSteelOptionsForUsage } from '../data'
import type { WizardConfig, Action } from '../types'

interface SteelStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function SteelStep({ config, dispatch }: SteelStepProps) {
  const steels = getSteelOptionsForUsage(config.usage)
  
  return (
    <div className="space-y-6">
      <StepHeader
        title="Acier"
        description={
          config.usage === 'pliant'
            ? 'Visuel et gamme de prix, sans caractéristiques techniques affichées'
            : 'Performance, entretien et esthétique'
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steels.map((steel) => {
          const isSelected = config.steel === steel.id
          return (
            <div
              key={steel.id}
              className={`flex items-stretch border-2 cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'}`}
              onClick={() => dispatch({ type: 'setSteel', steel: steel.id })}
            >
              <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
                <h3 className="font-bold text-base md:text-lg leading-tight">{steel.label}</h3>
                <p className="text-muted-foreground leading-tight mt-1">
                  {steel.description.split('\n').map((line, i) => (
                    <span key={i} className={i === 0 ? 'text-[11px] md:text-xs block' : 'text-[9px] md:text-[10px] italic block'}>
                      {line}
                    </span>
                  ))}
                </p>
                <div className="mt-2 space-y-0.5">
                  {config.usage !== 'pliant' && steel.tech && (
                    <>
                      <MetricLine label="Tenue" value={steel.tech.retention} />
                      <MetricLine label="Affûtage" value={steel.tech.sharpening} />
                      <MetricLine label="Flexibilité" value={steel.tech.flexibility} />
                    </>
                  )}
                  <MetricLine label="Prix" value={steel.tech.price} />
                </div>
              </div>
              <div className="w-28 md:w-40 flex items-center justify-center p-2 shrink-0">
                <div className="w-full h-full flex items-center justify-center">
                  <PlaceholderVisual label={steel.label} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
