'use client'

import { Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StepHeader, PlaceholderVisual } from '../ui'
import { guillochageMotifs } from '../data'
import type { WizardConfig, Action } from '../types'

interface PliantGuillochageDosStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PliantGuillochageDosStep({ config, dispatch }: PliantGuillochageDosStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage principal"
        description="Motif décoratif gravé sur le dos de la lame."
      />
      <Card className="p-6 space-y-4 max-w-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h4 className="font-medium">Dos de lame</h4>
        </div>
        <PlaceholderVisual label="Guillochage dos" />
        <div className="flex flex-wrap gap-2">
          {guillochageMotifs.map((motif) => {
            const active = config.guillochageCentral === motif.label
            return (
              <Button
                key={motif.id}
                variant={active ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'setGuillochageCentral', motif: motif.label })}
              >
                {motif.label}
              </Button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
