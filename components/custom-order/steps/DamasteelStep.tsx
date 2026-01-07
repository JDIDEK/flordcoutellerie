'use client'

import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { StepHeader, PlaceholderVisual } from '../ui'
import { damasteelPatterns } from '../data'
import { getPatternScale } from '../helpers'
import type { WizardConfig, Action } from '../types'

interface DamasteelStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function DamasteelStep({ config, dispatch }: DamasteelStepProps) {
  const scale = getPatternScale(config)
  const patterns = damasteelPatterns[scale]
  
  return (
    <div className="space-y-6">
      <StepHeader
        title="Motif Damasteel"
        description={`Liste adaptée aux ${scale === 'large' ? 'grandes' : 'petites'} lames`}
      />
      <ScrollArea className="h-80 rounded-md border border-border/50 p-2">
        <div className="grid md:grid-cols-2 gap-3 pr-2">
          {patterns.map((pattern) => {
            const isSelected = config.damasteelPattern === pattern
            return (
              <Card
                key={pattern}
                className={`p-4 cursor-pointer transition-all hover:border-primary ${isSelected ? 'border-primary bg-primary/5' : ''}`}
                onClick={() => dispatch({ type: 'setDamasteelPattern', pattern })}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{pattern}</h3>
                    <p className="text-xs text-muted-foreground">
                      Motif {scale === 'large' ? 'aéré' : 'dense'} pour Damasteel
                    </p>
                  </div>
                  <div className="w-20">
                    <PlaceholderVisual label="Motif" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
