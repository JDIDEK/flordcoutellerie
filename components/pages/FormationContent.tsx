'use client'

import { useState } from 'react'

const LAUNCH_EMAIL = 'floribadeaudumas@gmail.com'

export function FormationContent() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim())
  const sanitize = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, '').trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const safeEmail = sanitize(email)
    if (!validateEmail(safeEmail)) {
      setError('Vérifiez votre email.')
      setIsSubmitted(false)
      return
    }

    setError('')
    setIsSubmitted(true)

    const subject = encodeURIComponent('Inscription newsletter - Formation')
    const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite être informé lors de l'ouverture des formations.\n\nEmail: ${safeEmail}\n`
    )

    window.location.href = `mailto:${LAUNCH_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen flex flex-col justify-center pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
            Formation
          </h1>
          <p className="text-lg text-foreground">En construction.</p>
          <p className="text-muted-foreground leading-relaxed">
            Les contenus de formation arrivent bientôt.
            <br />
            Laissez votre email pour être informé dès la mise en ligne.
          </p>
        </div>

        <div className="max-w-xl mx-auto border border-border/70 bg-background/70 p-6 md:p-8 rounded-sm">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="formation-newsletter-email"
                className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
              >
                Votre email
              </label>
              <input
                id="formation-newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError('')
                }}
                aria-invalid={Boolean(error)}
                autoComplete="email"
                maxLength={120}
                placeholder="vous@exemple.com"
                className="w-full bg-transparent border-b border-border/70 py-2 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
              />
              {error && <p className="text-xs text-destructive mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase rounded-sm hover:brightness-110 transition-all duration-200 shadow-md"
            >
              Me prévenir du lancement
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Uniquement un message lors de l&apos;ouverture des formations.
          </p>

          {isSubmitted && (
            <p className="text-xs text-foreground mt-3">
              Votre application email va s&apos;ouvrir pour confirmer votre inscription.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
