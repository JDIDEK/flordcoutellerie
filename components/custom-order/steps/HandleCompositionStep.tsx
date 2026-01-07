'use client'

import { Card } from '@/components/ui/card'
import { StepHeader, PlaceholderVisual } from '../ui'
import type { WizardConfig, Action } from '../types'

interface HandleCompositionStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function HandleCompositionStep({ config, dispatch }: HandleCompositionStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Composition du manche"
        description="Simple ou composé de plusieurs matériaux"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer transition-all overflow-hidden border-2 ${config.handleComposition === 'simple' ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'}`}
          onClick={() => dispatch({ type: 'setHandleComposition', composition: 'simple' })}
        >
          <div className="flex items-stretch min-h-28">
            {/* Text content - left side */}
            <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
              <h3 className="font-bold text-base md:text-lg leading-tight">Simple</h3>
              <div className="mt-1.5 space-y-0">
                <p className="text-[11px] md:text-xs italic text-muted-foreground leading-tight">Un seul matériau pour l'ensemble du manche</p>
              </div>
            </div>
            {/* Image placeholder - right side */}
            <div className="w-28 md:w-40 flex items-center justify-center p-2 shrink-0 border-l border-foreground/10">
              <div className="w-full h-full flex items-center justify-center">
                <PlaceholderVisual label="Manche simple" />
              </div>
            </div>
          </div>
        </Card>
        <Card
          className={`cursor-pointer transition-all overflow-hidden border-2 ${config.handleComposition === 'compose' ? 'border-primary bg-primary/5' : 'border-foreground/20 hover:border-foreground/40'}`}
          onClick={() => dispatch({ type: 'setHandleComposition', composition: 'compose' })}
        >
          <div className="flex items-stretch min-h-28">
            {/* Text content - left side */}
            <div className="flex-1 p-3 md:p-4 flex flex-col justify-center">
              <h3 className="font-bold text-base md:text-lg leading-tight">Composé</h3>
              <div className="mt-1.5 space-y-0">
                <p className="text-[11px] md:text-xs italic text-muted-foreground leading-tight">Association de plusieurs matériaux et textures</p>
              </div>
            </div>
            {/* Image placeholder - right side */}
            <div className="w-28 md:w-40 flex items-center justify-center p-2 shrink-0 border-l border-foreground/10">
              <div className="w-full h-full flex items-center justify-center">
                <PlaceholderVisual label="Manche composé" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
