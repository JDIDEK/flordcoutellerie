'use client'

import { useState, useEffect } from 'react'

interface TypingTextProps {
  lines: string[]
  className?: string
  lineClassName?: string
  speed?: number
  startDelay?: number
  disabled?: boolean
}

export function TypingText({
  lines,
  className = '',
  lineClassName = '',
  speed = 80,
  startDelay = 500,
  disabled = false,
}: TypingTextProps) {
  const fullText = lines[0] || ''
  const [visibleChars, setVisibleChars] = useState(() => (disabled ? fullText.length : 0))

  useEffect(() => {
    if (disabled) return

    let interval: ReturnType<typeof setInterval> | null = null
    const startTimer = setTimeout(() => {
      setVisibleChars(0)
      interval = setInterval(() => {
        setVisibleChars((current) => {
          if (current >= fullText.length) {
            if (interval) {
              clearInterval(interval)
              interval = null
            }
            return current
          }
          return current + 1
        })
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [disabled, startDelay, speed, fullText])

  const displayedText = disabled ? fullText : fullText.slice(0, visibleChars)

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span 
          key={index} 
          className={lineClassName}
        >
          <span className="inline-block relative">
            <span className="opacity-0">{line}</span>
            <span className="absolute left-0 top-0">{displayedText}</span>
          </span>
        </span>
      ))}
    </span>
  )
}
