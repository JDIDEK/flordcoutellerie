'use client'

import { useState, useEffect } from 'react'

interface TypingTextProps {
  lines: string[]
  className?: string
  lineClassName?: string
  speed?: number
  startDelay?: number
}

export function TypingText({ 
  lines, 
  className = '', 
  lineClassName = '',
  speed = 80,
  startDelay = 500
}: TypingTextProps) {
  const [visibleChars, setVisibleChars] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, startDelay)

    return () => clearTimeout(startTimer)
  }, [startDelay])

  useEffect(() => {
    if (!isStarted) return

    const fullText = lines[0] || ''
    
    if (visibleChars >= fullText.length) return

    const timer = setTimeout(() => {
      setVisibleChars(visibleChars + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [visibleChars, lines, speed, isStarted])

  const fullText = lines[0] || ''
  const displayedText = fullText.slice(0, visibleChars)

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
