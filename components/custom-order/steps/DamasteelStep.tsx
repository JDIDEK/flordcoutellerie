'use client'

import { StepHeader, PlaceholderVisual } from '../ui'
import { damasteelPatternsLarge, damasteelPatternsSmall } from '../data'
import type { WizardConfig, Action } from '../types'

interface DamasteelStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function DamasteelStep({ config, dispatch }: DamasteelStepProps) {
  // Pliant = petites lames (24 motifs), autres = grandes lames (9 motifs)
  const isPliant = config.usage === 'pliant'
  const patterns = isPliant ? damasteelPatternsSmall : damasteelPatternsLarge
  
  // Pour grandes lames : séparer les motifs standard et les exclusifs
  const standardPatterns = patterns.filter(p => !p.largeBladesOnly)
  const exclusivePatterns = patterns.filter(p => p.largeBladesOnly)
  
  return (
    <div className="space-y-6">
      <StepHeader
        title="Motifs de Damasteel"
        description="Purement esthétique, le motif n'impacte pas les performances."
      />
      
      {/* Grille principale des motifs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {standardPatterns.map((pattern) => {
          const isSelected = config.damasteelPattern === pattern.id
          return (
            <div
              key={pattern.id}
              className="cursor-pointer group"
              onClick={() => dispatch({ type: 'setDamasteelPattern', pattern: pattern.id })}
            >
              <div className={`aspect-[2/1] w-full bg-muted/30 border-2 transition-all ${isSelected ? 'border-primary' : 'border-transparent group-hover:border-foreground/40'}`}>
                <PlaceholderVisual label={pattern.label} />
              </div>
              <p className={`mt-1 text-sm ${isSelected ? 'font-bold' : 'font-normal'}`}>{pattern.label}</p>
            </div>
          )
        })}
      </div>

      {/* Section motifs exclusifs grandes lames (uniquement pour cuisine, outdoor, chasse) */}
      {exclusivePatterns.length > 0 && (
        <div className="space-y-3 pt-4">
          <p className="text-sm font-medium text-muted-foreground">Exclu TRÈS grandes lames :</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {exclusivePatterns.map((pattern) => {
              const isSelected = config.damasteelPattern === pattern.id
              return (
                <div
                  key={pattern.id}
                  className="cursor-pointer group"
                  onClick={() => dispatch({ type: 'setDamasteelPattern', pattern: pattern.id })}
                >
                  <div className={`aspect-[2/1] w-full bg-muted/30 border-2 transition-all ${isSelected ? 'border-primary' : 'border-transparent group-hover:border-foreground/40'}`}>
                    <PlaceholderVisual label={pattern.label} />
                  </div>
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
