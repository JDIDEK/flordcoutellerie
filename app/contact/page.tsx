'use client'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
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
      name: sanitize(formData.name),
      email: sanitize(formData.email),
      phone: sanitize(formData.phone),
      message: sanitize(formData.message),
    }

    if (!safeData.name) nextErrors.name = 'Merci d’indiquer votre nom.'
    if (!validateEmail(safeData.email)) nextErrors.email = 'Vérifiez votre email.'
    if (!safeData.message) nextErrors.message = 'Un message est requis.'
    if (safeData.phone && !validatePhone(safeData.phone)) {
      nextErrors.phone = 'Format de téléphone invalide.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const subject = 'Contact depuis le site'
    const mailtoLink = `mailto:floribadeaudumas@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `Nom: ${safeData.name}\nEmail: ${safeData.email}\nTéléphone: ${
        safeData.phone || 'Non renseigné'
      }\n\nMessage:\n${safeData.message}`,
    )}`

    window.location.href = mailtoLink
  }

  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen pt-32 pb-20 bg-background text-foreground">
          {/* Hero */}
          <div className="container mx-auto px-6">
            <h1 className="text-3xl md:text-6xl font-light text-center tracking-tight mb-24 animate-fade-in-up">
              Contact
            </h1>
          </div>
          <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-start">
            {/* Colonne gauche : texte */}
            <div className="space-y-8 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight">
                Chaque projet commence par un échange
              </h1>

              <div className="space-y-4 text-sm md:text-base max-w-md">
                <p className="font-medium italic">
                  Les meilleures conversations commencent par un simple bonjour.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Une question, un projet, une commande sur mesure ou simplement un échange ?
                  <br />Ecris-moi, je réponds personnellement à chaque message
                </p>
                <p className="text-xs text-muted-foreground italic">
                  La prise de contact, l'échange et l'élaboration du devis
                  sont entièrement gratuits et sans engagement.
                </p>
              </div>
            </div>

            {/* Colonne droite : formulaire + réseaux en dessous */}
            <div className="space-y-10 animate-fade-in-up">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label
                      className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
                      htmlFor="name"
                    >
                      Votre nom*
                    </label>
                    <input
                      id="name"
                      value={formData.name}
                      onChange={handleFieldChange('name')}
                      required
                      aria-invalid={Boolean(errors.name)}
                      maxLength={80}
                      autoComplete="name"
                      className="w-full bg-transparent border-b border-border/70 py-2 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Votre nom"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <label
                      className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
                      htmlFor="email"
                    >
                      Votre email*
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
                      className="w-full bg-transparent border-b border-border/70 py-2 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                      placeholder="vous@exemple.com"
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
                    htmlFor="phone"
                  >
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleFieldChange('phone')}
                    aria-invalid={Boolean(errors.phone)}
                    maxLength={30}
                    inputMode="tel"
                    autoComplete="tel"
                    className="w-full bg-transparent border-b border-border/70 py-2 text-base placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                    placeholder="+33 6 12 34 56 78"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label
                    className="text-xs uppercase tracking-[0.18em] text-muted-foreground"
                    htmlFor="message"
                  >
                    Message*
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleFieldChange('message')}
                    placeholder="Bonjour..."
                    rows={5}
                    required
                    aria-invalid={Boolean(errors.message)}
                    maxLength={1500}
                    className="w-full bg-transparent border-b border-border/70 py-2 text-base leading-relaxed resize-none placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold tracking-wide uppercase rounded-sm hover:brightness-110 transition-all duration-200 shadow-md"
                  >
                    Envoyer la demande
                  </button>
                </div>
              </form>

              {/* Texte + boutons sous le formulaire, alignés à gauche */}
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  Vous pouvez aussi me retrouver sur les réseaux sociaux :
                </div>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3">
                  {[
                    { label: 'Instagram', href: 'https://www.instagram.com/flo_rd_coutellerie' },
                    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCYYwsqX5t94tmXsty9wFepw/featured' },
                    { label: 'TikTok', href: 'https://www.tiktok.com/@flo_rd_' },
                    { label: 'Facebook', href: 'https://www.facebook.com/FloRDCoutellerie' },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 border border-border text-xs md:text-sm uppercase tracking-[0.12em] hover:bg-primary/10 transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </main>
      </PageTransitionWrapper>
    </>
  )
}
