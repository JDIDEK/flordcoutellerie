'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [{ isDark, mounted }, setThemeState] = useState({ isDark: false, mounted: false })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const resolvedDark = document.documentElement.classList.contains('dark')
    document.documentElement.style.colorScheme = resolvedDark ? 'dark' : 'light'

    const animationFrame = window.requestAnimationFrame(() => {
      setThemeState({ isDark: resolvedDark, mounted: true })
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setThemeState({ isDark: newIsDark, mounted: true })
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className={`w-5 h-5 rounded-full transition-all duration-300 hover:scale-125 active:scale-95 ${className}`}
      style={{
        backgroundColor: isDark ? '#F2EAE4' : '#212120',
        aspectRatio: '1 / 1',
        minWidth: '16px',
        minHeight: '16px',
      }}
      aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
      title={isDark ? 'Thème clair' : 'Thème sombre'}
    />
  )
}
