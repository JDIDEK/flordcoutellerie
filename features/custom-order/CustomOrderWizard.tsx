'use client'

import { useReducer, useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createInternalJsonHeaders } from '@/lib/internal-api'

import type { Action, WizardStep } from './types'
import { wizardReducer, initialConfig } from './reducer'
import { isStepComplete, getSteps } from './helpers'
import {
  UsageStep,
  CuisineFormStep,
  PliantMechanismStep,
  PliantFormStep,
  PliantGuillochageDosStep,
  PliantGuillochagePlatinesStep,
  OutdoorIntensityStep,
  OutdoorFormStep,
  ChasseFormStep,
  GuillochageStep,
  SteelStep,
  DamasteelStep,
  SheathStep,
  HandleStep,
  HandleCompositionStep,
  PersonalizationStep,
  SummaryStep,
} from './steps'

export function CustomOrderWizard() {
  const [config, baseDispatch] = useReducer(wizardReducer, initialConfig)
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const dispatch: React.Dispatch<Action> = (action) => {
    if (submitSuccess) {
      setSubmitSuccess(false)
    }

    if (submitError) {
      setSubmitError(null)
    }

    baseDispatch(action)
  }

  const steps = useMemo(() => getSteps(config), [config])
  const safeActiveStepIndex = Math.min(activeStepIndex, Math.max(steps.length - 1, 0))
  const currentStep = steps[safeActiveStepIndex]

  const canGoNext = currentStep ? isStepComplete(currentStep.id, config) : false

  const goNext = () => {
    if (safeActiveStepIndex < steps.length - 1 && canGoNext) {
      setActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const goBack = () => {
    if (safeActiveStepIndex > 0) {
      setActiveStepIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!isStepComplete('summary', config) || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/sur-mesure', {
        method: 'POST',
        headers: createInternalJsonHeaders(),
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || "Erreur lors de l'envoi.")
      }

      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Erreur lors de l'envoi de la demande."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep?.id) {
      case 'usage':
        return <UsageStep config={config} dispatch={dispatch} />
      case 'cuisine-form':
        return <CuisineFormStep config={config} dispatch={dispatch} />
      case 'cuisine-guillochage':
      case 'outdoor-guillochage':
      case 'chasse-guillochage':
        return <GuillochageStep config={config} dispatch={dispatch} />
      case 'pliant-mechanism':
        return <PliantMechanismStep config={config} dispatch={dispatch} />
      case 'pliant-form':
        return <PliantFormStep config={config} dispatch={dispatch} />
      case 'pliant-guillochage-dos':
        return <PliantGuillochageDosStep config={config} dispatch={dispatch} />
      case 'pliant-guillochage-platines':
        return <PliantGuillochagePlatinesStep config={config} dispatch={dispatch} />
      case 'outdoor-intensity':
        return <OutdoorIntensityStep config={config} dispatch={dispatch} />
      case 'outdoor-form':
        return <OutdoorFormStep config={config} dispatch={dispatch} />
      case 'chasse-form':
        return <ChasseFormStep config={config} dispatch={dispatch} />
      case 'steel':
        return <SteelStep config={config} dispatch={dispatch} />
      case 'damasteel-pattern':
        return <DamasteelStep config={config} dispatch={dispatch} />
      case 'sheath':
        return <SheathStep config={config} dispatch={dispatch} />
      case 'handle':
        return <HandleStep config={config} dispatch={dispatch} />
      case 'handle-composition':
        return <HandleCompositionStep config={config} dispatch={dispatch} />
      case 'personalization':
        return <PersonalizationStep config={config} dispatch={dispatch} />
      case 'summary':
        return (
          <SummaryStep
            config={config}
            dispatch={dispatch}
            isSubmitting={isSubmitting}
            submitSuccess={submitSuccess}
            submitError={submitError}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Barre de progression - cachée à l'étape usage */}
      {currentStep?.id !== 'usage' && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 flex-1">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  index < safeActiveStepIndex
                    ? 'bg-primary'
                    : index === safeActiveStepIndex
                      ? 'bg-primary/60'
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {safeActiveStepIndex + 1}/{steps.length} · {currentStep?.title}
          </p>
        </div>
      )}

      <Card className="p-6 md:p-10 space-y-6">{renderStepContent()}</Card>

      <div className="flex items-center justify-between">
        {safeActiveStepIndex > 0 ? (
          <Button variant="outline" onClick={goBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        ) : (
          <div />
        )}
        {currentStep?.id !== 'summary' && (
          <Button onClick={goNext} disabled={!canGoNext}>
            Continuer
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
