'use client'

import { useState, useEffect } from 'react'
import { create } from 'zustand'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TransitionLink } from '@/components/TransitionLink'

const COOKIE_CONSENT_KEY = 'cookie-consent'

type ConsentState = 'pending' | 'accepted' | 'rejected'

// Shared reactive store for cookie consent
type ConsentStore = {
  consent: ConsentState
  setConsent: (value: ConsentState) => void
  hydrate: () => void
}

export const useConsentStore = create<ConsentStore>((set) => ({
  consent: 'pending',
  setConsent: (value) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, value)
    set({ consent: value })
  },
  hydrate: () => {
    const saved = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (saved === 'accepted' || saved === 'rejected') {
      set({ consent: saved })
    }
  },
}))

export function CookieBanner() {
  const { consent, setConsent, hydrate } = useConsentStore()
  const [isVisible, setIsVisible] = useState(false)

  // Hydrate from localStorage on mount (avoids SSR mismatch)
  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    if (consent !== 'pending') return
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [consent])

  const handleAccept = () => {
    setConsent('accepted')
    setIsVisible(false)
  }

  const handleReject = () => {
    setConsent('rejected')
    setIsVisible(false)
  }

  const handleClose = () => {
    // Closing without choice = reject (conservative approach for GDPR)
    handleReject()
  }

  // Don't render if consent already given or banner not yet visible
  if (consent !== 'pending' || !isVisible) {
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
                🍪 Nous utilisons des cookies
              </h2>
              <p 
                id="cookie-banner-description" 
                className="text-sm text-muted-foreground leading-relaxed"
              >
                Ce site utilise des cookies analytiques pour mesurer l'audience et améliorer votre expérience. 
                Aucune donnée personnelle n'est vendue à des tiers.{' '}
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
                Refuser
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

// Hook to check consent status reactively
export function useCookieConsent() {
  const { consent, hydrate } = useConsentStore()

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return consent
}
