'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for saved preference or system preference
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else if (saved === 'light') {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 active:scale-95 ${className}`}
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
