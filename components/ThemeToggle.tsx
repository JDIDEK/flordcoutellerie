'use client'

import { useSyncExternalStore } from 'react'

const THEME_STORAGE_KEY = 'theme'
const THEME_CHANGE_EVENT = 'theme-change'

type ThemeMode = 'light' | 'dark'

function readThemeSnapshot(): ThemeMode | null {
  if (typeof document === 'undefined') {
    return null
  }

  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function subscribeToTheme(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handleThemeChange = () => callback()
  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      callback()
    }
  }

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange)
    window.removeEventListener('storage', handleStorage)
  }
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeToTheme, readThemeSnapshot, () => null)

  const toggleTheme = () => {
    if (theme === null) return

    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    const isDark = nextTheme === 'dark'

    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = nextTheme
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
  }

  if (theme === null) return null

  const isDark = theme === 'dark'

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
