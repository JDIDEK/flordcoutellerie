'use client'

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
  
  // Filtrer les motifs : exclure "largeBladesOnly" pour les pliants (petites lames)
  const availablePatterns = damasteelPatterns.filter((pattern) => {
    if (pattern.largeBladesOnly && scale === 'small') return false
    return true
  })
  
  return (
    <div className="space-y-6">
      <StepHeader
        title="Motifs de Damasteel"
        description="Purement esthétique, le motif n'impacte pas les performances."
      />
      
      {/* Grille principale des motifs standards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availablePatterns.filter(p => !p.largeBladesOnly).map((pattern) => {
          const isSelected = config.damasteelPattern === pattern.id
          return (
            <div
              key={pattern.id}
              className="cursor-pointer group"
              onClick={() => dispatch({ type: 'setDamasteelPattern', pattern: pattern.id })}
            >
              {/* Image rectangulaire */}
              <div className={`aspect-[2/1] w-full bg-muted/30 border-2 transition-all ${isSelected ? 'border-primary' : 'border-transparent group-hover:border-foreground/40'}`}>
                <PlaceholderVisual label={pattern.label} />
              </div>
              {/* Nom sous l'image */}
              <p className={`mt-1 text-sm ${isSelected ? 'font-bold' : 'font-normal'}`}>{pattern.label}</p>
            </div>
          )
        })}
      </div>

      {/* Section motifs exclusifs grandes lames */}
      {availablePatterns.some(p => p.largeBladesOnly) && (
        <div className="space-y-3 pt-4">
          <p className="text-sm font-medium text-muted-foreground">Exclu TRÈS grandes lames :</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availablePatterns.filter(p => p.largeBladesOnly).map((pattern) => {
              const isSelected = config.damasteelPattern === pattern.id
              return (
                <div
                  key={pattern.id}
                  className="cursor-pointer group"
                  onClick={() => dispatch({ type: 'setDamasteelPattern', pattern: pattern.id })}
                >
                  {/* Image rectangulaire */}
                  <div className={`aspect-[2/1] w-full bg-muted/30 border-2 transition-all ${isSelected ? 'border-primary' : 'border-transparent group-hover:border-foreground/40'}`}>
                    <PlaceholderVisual label={pattern.label} />
                  </div>
                  {/* Nom sous l'image */}
                  <p className={`mt-1 text-sm ${isSelected ? 'font-bold' : 'font-normal'}`}>{pattern.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
