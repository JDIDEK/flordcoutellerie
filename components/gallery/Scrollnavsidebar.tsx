'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useHydrated } from '@/hooks/use-hydrated'

export type ThumbEntry =
  | { type: 'single'; src: string; alt: string; targetId: string }
  | { type: 'double'; left: { src: string; alt: string }; right: { src: string; alt: string } }

interface ScrollNavSidebarProps {
  thumbs: ThumbEntry[]
}

export function ScrollNavSidebar({ thumbs }: ScrollNavSidebarProps) {
  const innerRef = useRef<HTMLDivElement>(null)
  const [frameStyle, setFrameStyle] = useState({ top: 0, height: 60 })
  const mounted = useHydrated()

  useEffect(() => {
    function update() {
      if (!innerRef.current) return

      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = window.innerHeight

      const ratio = scrollTop / Math.max(scrollHeight - clientHeight, 1)
      const visRatio = clientHeight / scrollHeight

      const totalH = innerRef.current.scrollHeight
      const height = Math.max(visRatio * totalH, 36)
      const top = ratio * (totalH - height)

      setFrameStyle({ top, height })
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  function scrollToThumb(entry: ThumbEntry, index: number) {
    const target =
      entry.type === 'single'
        ? Array.from(document.querySelectorAll<HTMLElement>('[data-thumb-id]')).find(
            (el) => el.dataset.thumbId === entry.targetId,
          )
        : document.querySelector<HTMLElement>(`[data-thumb-index="${index}"]`)

    if (!target) return

    const rect = target.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const targetTop = absoluteTop - (window.innerHeight - rect.height) / 2
    const maxTop = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
    const clampedTop = Math.max(0, Math.min(targetTop, maxTop))

    window.scrollTo({ top: clampedTop, behavior: 'smooth' })
  }

  const sidebar = (
    <div
      className="hidden md:block"
      style={{
        position: 'fixed',
        right: 80,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        width: 120,
      }}
    >
      <div
        ref={innerRef}
        style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6 }}
      >
        {/* Cadre viewport */}
        <div
          className="border-2 border-black dark:border-white"
          style={{
            position: 'absolute',
            top: frameStyle.top,
            height: frameStyle.height,
            left: -6,
            right: -6,
            pointerEvents: 'none',
            zIndex: 50,
          }}
        />

        {thumbs.map((entry, i) => {
          if (entry.type === 'single') {
            return (
              <button
                key={i}
                onClick={() => scrollToThumb(entry, i)}
                className="group transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'block',
                  padding: 0,
                  border: 'none',
                  background: 'none',
                }}
              >
                <img
                  src={entry.src}
                  alt={entry.alt}
                  className="transition-opacity duration-200 group-hover:opacity-90"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </button>
            )
          }

          return (
            <button
              key={i}
              onClick={() => scrollToThumb(entry, i)}
              className="group transition-transform duration-200 hover:scale-[1.02]"
              style={{
                width: '100%',
                aspectRatio: '16/9',
                display: 'flex',
                gap: 2,
                cursor: 'pointer',
                padding: 0,
                border: 'none',
                background: 'none',
              }}
            >
              <img
                src={entry.left.src}
                alt={entry.left.alt}
                className="transition-opacity duration-200 group-hover:opacity-90"
                style={{ width: '47%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
              <img
                src={entry.right.src}
                alt={entry.right.alt}
                className="transition-opacity duration-200 group-hover:opacity-90"
                style={{ width: '47%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )

  if (!mounted) return null

  return createPortal(sidebar, document.body)
}
