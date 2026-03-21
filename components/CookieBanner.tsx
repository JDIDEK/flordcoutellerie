'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/TransitionLink'

const COOKIE_CONSENT_KEY = 'cookie-consent'
const COOKIE_CONSENT_CHANGE_EVENT = 'cookie-consent-change'
const COOKIE_CONSENT_OPEN_EVENT = 'cookie-consent-open'
const COOKIE_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000

type ConsentState = 'pending' | 'accepted' | 'rejected'
type StoredConsent = {
  status: Exclude<ConsentState, 'pending'>
  updatedAt: number
}

function readStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = localStorage.getItem(COOKIE_CONSENT_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredConsent>

    if (
      (parsed.status === 'accepted' || parsed.status === 'rejected') &&
      typeof parsed.updatedAt === 'number'
    ) {
      if (Date.now() - parsed.updatedAt > COOKIE_CONSENT_MAX_AGE_MS) {
        localStorage.removeItem(COOKIE_CONSENT_KEY)
        return null
      }

      return parsed as StoredConsent
    }
  } catch {
    // Ignore legacy or malformed values and ask again.
  }

  localStorage.removeItem(COOKIE_CONSENT_KEY)
  return null
}

function readConsentSnapshot(): ConsentState {
  return readStoredConsent()?.status ?? 'pending'
}

function subscribeToConsent(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handleConsentChange = () => callback()
  const handleStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_KEY) {
      callback()
    }
  }

  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange)
    window.removeEventListener('storage', handleStorage)
  }
}

function setCookieConsent(value: Exclude<ConsentState, 'pending'>) {
  const payload: StoredConsent = {
    status: value,
    updatedAt: Date.now(),
  }

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(payload))
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT))
}

export function openCookiePreferences() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))
}

export function useCookieConsent() {
  return useSyncExternalStore(subscribeToConsent, readConsentSnapshot, () => 'pending')
}

export function CookieBanner() {
  const consent = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (consent !== 'pending') return

    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [consent])

  useEffect(() => {
    const handleOpenPreferences = () => setIsVisible(true)

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenPreferences)

    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenPreferences)
    }
  }, [])

  const handleAccept = () => {
    setCookieConsent('accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    setCookieConsent('rejected')
    setIsVisible(false)
  }

  const handleClose = () => {
    if (consent === 'pending') {
      handleReject()
      return
    }

    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-500"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="relative rounded-lg border border-border bg-card/95 backdrop-blur-md shadow-xl p-5 md:p-6">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fermer la bannière"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pr-8">
            <div className="flex-1 space-y-2">
              <h2 
                id="cookie-banner-title" 
                className="text-base font-medium text-foreground"
              >
                Cookies et traceurs
              </h2>
              <p 
                id="cookie-banner-description" 
                className="text-sm text-muted-foreground leading-relaxed"
              >
                Nous utilisons des traceurs essentiels pour memoriser vos preferences d'interface et
                votre panier, ainsi que des traceurs analytiques optionnels pour mesurer l'audience.
                Votre choix est conserve pendant 6 mois.{' '}
                <TransitionLink 
                  href="/politique-confidentialite" 
                  className="text-primary underline-offset-4 hover:underline"
                >
                  En savoir plus
                </TransitionLink>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="text-sm"
              >
                Refuser l'analytique
              </Button>
              <Button
                size="sm"
                onClick={handleAccept}
                className="text-sm"
              >
                Accepter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
