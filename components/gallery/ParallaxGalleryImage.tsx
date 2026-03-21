'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils'

type ParallaxGalleryImageProps = {
  alt: string
  src: string
  sizes: string
  preload?: boolean
  frameClassName?: string
  innerClassName?: string
  imageClassName?: string
  parallaxOffset?: number
}

export function ParallaxGalleryImage({
  alt,
  src,
  sizes,
  preload = false,
  frameClassName,
  innerClassName,
  imageClassName,
  parallaxOffset = 18,
}: ParallaxGalleryImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallaxOffset, -parallaxOffset])

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', frameClassName)}>
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        className={cn('absolute inset-3 md:inset-5 will-change-transform', innerClassName)}
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={cn(
              'origin-center object-contain scale-[0.94] md:scale-[0.96]',
              imageClassName
            )}
          />
        </div>
      </motion.div>
    </div>
  )
}
