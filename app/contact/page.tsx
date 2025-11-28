'use client'

import { Navigation } from '@/components/navigation'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    object: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  type FormField = keyof typeof formData
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({})

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value.trim())
  const validatePhone = (value: string) => {
    const cleaned = value.replace(/[^\d+]/g, '')
    return cleaned.length >= 7 && /^[+]?[\d\s().-]{7,}$/.test(value)
  }
  const sanitize = (value: string) => value.replace(/[\u0000-\u001F\u007F]/g, '').trim()

  const handleFieldChange =
    (field: FormField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Partial<Record<FormField, string>> = {}

    const safeData = {
      object: sanitize(formData.object),
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      phone: sanitize(formData.phone),
      message: sanitize(formData.message),
    }

    if (!safeData.object) nextErrors.object = 'Indiquez un objet.'
    if (!safeData.name) nextErrors.name = 'Merci d’indiquer votre nom.'
    if (!validateEmail(safeData.email)) nextErrors.email = 'Vérifiez votre email.'
    if (!safeData.message) nextErrors.message = 'Un message est requis.'
    if (!safeData.phone) {
      nextErrors.phone = 'Merci d’indiquer votre téléphone.'
    } else if (!validatePhone(safeData.phone)) {
      nextErrors.phone = 'Format de téléphone invalide.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const subject = safeData.object ? `Contact - ${safeData.object}` : 'Contact depuis le site'
    const mailtoLink = `mailto:floribadeaudumas@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Nom: ${safeData.name}\nEmail: ${safeData.email}\nTéléphone: ${
        safeData.phone || 'Non renseigné'
      }\nSujet: ${safeData.object || 'Non renseigné'}\n\nMessage:\n${safeData.message}`,
    )}`
    window.location.href = mailtoLink
  }

  return (
    <>
      <Navigation />

      <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
        <h1 className="text-3xl md:text-4xl font-light text-center tracking-tight mb-12 animate-fade-in-up">
          Contact
        </h1>
        <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center gap-8">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full max-w-xl bg-card/80 text-foreground rounded-xl border border-border/70 shadow-lg px-4 py-6 sm:px-6 sm:py-7 space-y-7 animate-fade-in-up"
          >
            <div className="border-b border-border/70 pb-2">
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1" htmlFor="object">
                Objet
              </label>
              <input
                id="object"
                value={formData.object}
                onChange={handleFieldChange('object')}
                aria-invalid={Boolean(errors.object)}
                maxLength={120}
                autoComplete="subject"
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-base"
                placeholder="Objet du message"
              />
              {errors.object && <p className="text-xs text-destructive mt-1">{errors.object}</p>}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Votre message</p>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleFieldChange('message')}
                placeholder="Bonjour..."
                rows={5}
                required
                aria-invalid={Boolean(errors.message)}
                maxLength={1500}
                className="w-full bg-card text-foreground text-base leading-relaxed resize-none rounded-sm border border-border focus:border-primary focus:outline-none p-3 transition-colors placeholder:text-muted-foreground/50"
              />
              {errors.message && (
                <p className="text-xs text-destructive mt-1">{errors.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Vos coordonnées</p>
              <div className="space-y-3">
                <div className="border-b border-border/70 pb-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1" htmlFor="name">
                    Nom
                  </label>
                  <input
                    id="name"
                    value={formData.name}
                    onChange={handleFieldChange('name')}
                    required
                    aria-invalid={Boolean(errors.name)}
                    maxLength={80}
                    autoComplete="name"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-base"
                    placeholder="Votre nom"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                <div className="border-b border-border/70 pb-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFieldChange('email')}
                    required
                    aria-invalid={Boolean(errors.email)}
                    maxLength={120}
                    autoComplete="email"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-base"
                    placeholder="vous@exemple.com"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>

                <div className="border-b border-border/70 pb-2">
                  <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1" htmlFor="phone">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFieldChange('phone')}
                    required
                    aria-invalid={Boolean(errors.phone)}
                    maxLength={30}
                    inputMode="tel"
                    autoComplete="tel"
                    className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none text-base"
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="h-11 w-11 rounded-full bg-primary text-primary-foreground hover:brightness-110 transition-all duration-200 flex items-center justify-center shadow-lg shadow-primary/30"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          <section className="w-full max-w-5xl mt-6 animate-fade-in-up">
            <div className="space-y-5">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/FloRDCoutellerie' },
                { label: 'Instagram', href: 'https://www.instagram.com/flo_rd_coutellerie' },
                { label: 'YouTube', href: 'https://www.youtube.com/channel/UCYYwsqX5t94tmXsty9wFepw/featured' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@flo_rd_' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block border-b border-border/70 pb-3 text-2xl sm:text-3xl font-semibold uppercase tracking-[0.06em] hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
