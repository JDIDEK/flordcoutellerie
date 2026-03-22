'use client'

import Image from 'next/image'

import {
  StepHeader,
  getOptionCardClassName,
  optionCardContentClassName,
  optionCardVisualClassName,
} from '../ui'
import { defaultGuillochageAsset } from '../assets'
import { guillochageMotifsPlatines } from '../data'
import type { WizardConfig, Action } from '../types'

const defaultPhotoSrc = defaultGuillochageAsset

interface PliantGuillochagePlatinesStepProps {
  config: WizardConfig
  dispatch: React.Dispatch<Action>
}

export function PliantGuillochagePlatinesStep({ config, dispatch }: PliantGuillochagePlatinesStepProps) {
  return (
    <div className="space-y-6">
      <StepHeader
        title="Guillochage (platines)"
        description="L'originalité à la Française"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guillochageMotifsPlatines.map((motif) => {
          const isSelected = config.guillochagePlatineLeft === motif.label
          return (
            <div
              key={motif.id}
              className={getOptionCardClassName(isSelected, 'flex items-stretch')}
              onClick={() => {
                dispatch({ type: 'setGuillochagePlatineLeft', motif: motif.label })
                dispatch({ type: 'setGuillochagePlatineRight', motif: motif.label })
              }}
            >
              <div className={optionCardContentClassName}>
                <span className={`font-medium ${isSelected ? 'text-primary' : ''}`}>{motif.label}</span>
              </div>
              <div className={`${optionCardVisualClassName} w-36 md:w-44`}>
                <Image
                  src={motif.imageSrc ?? defaultPhotoSrc}
                  alt={motif.imageAlt ?? `Photo ${motif.label}`}
                  width={220}
                  height={160}
                  className="h-full w-full translate-y-[2px] scale-110 object-cover"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
