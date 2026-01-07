'use client'

import { Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StepHeader, PlaceholderVisual } from '../ui'
import { guillochageMotifs, guillochageSets } from '../data'
import type { WizardConfig, Action } from '../types'

interface GuillochageStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function GuillochageStep({ config, dispatch }: GuillochageStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage pliant"
        description="1 central (dos de lame) + 2 platines. Choisissez un set ou personnalisez."
      />
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          {guillochageSets.map((set) => {
            const isSelected = config.guillochageSet === set.id && config.guillochageMode === 'set'
            return (
              <Button
                key={set.id}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                onClick={() => dispatch({ type: 'setGuillochageSet', setId: set.id })}
              >
                {set.label}
              </Button>
            )
          })}
          <Badge variant="outline" className="ml-auto">Ou personnalisez ci-dessous</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Dos de lame</h4>
            </div>
            <PlaceholderVisual label="Guillochage" />
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
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Platine gauche</h4>
            </div>
            <PlaceholderVisual label="Guillochage" />
            <div className="flex flex-wrap gap-2">
              {guillochageMotifs.map((motif) => {
                const active = config.guillochagePlatineLeft === motif.label
                return (
                  <Button
                    key={motif.id}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => dispatch({ type: 'setGuillochagePlatineLeft', motif: motif.label })}
                  >
                    {motif.label}
                  </Button>
                )
              })}
            </div>
          </Card>
          <Card className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h4 className="font-medium text-sm">Platine droite</h4>
            </div>
            <PlaceholderVisual label="Guillochage" />
            <div className="flex flex-wrap gap-2">
              {guillochageMotifs.map((motif) => {
                const active = config.guillochagePlatineRight === motif.label
                return (
                  <Button
                    key={motif.id}
                    variant={active ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => dispatch({ type: 'setGuillochagePlatineRight', motif: motif.label })}
                  >
                    {motif.label}
                  </Button>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
