'use client'

import { useState } from 'react'
import { Facebook, Instagram, Youtube } from 'lucide-react'

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  type FormField = keyof typeof formData
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({})
  const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/flo_rd_coutellerie', Icon: Instagram },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCYYwsqX5t94tmXsty9wFepw/featured', Icon: Youtube },
    { label: 'TikTok', href: 'https://www.tiktok.com/@flo_rd_', Icon: TikTokIcon },
    { label: 'Facebook', href: 'https://www.facebook.com/FloRDCoutellerie', Icon: Facebook },
  ]

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
      subject
    )}&body=${encodeURIComponent(
      `Nom: ${safeData.name}\nEmail: ${safeData.email}\nTéléphone: ${
        safeData.phone || 'Non renseigné'
      }\n\nMessage:\n${safeData.message}`
    )}`

    window.location.href = mailtoLink
  }

  return (
    <main className="min-h-screen flex flex-col justify-center pt-32 pb-20 bg-background text-foreground font-body">
      {/* Hero */}
      <div className="container mx-auto px-6">
        <h1 className="text-3xl md:text-6xl font-serif font-light text-foreground text-center tracking-tight mb-24 animate-fade-in-up">
          Contact
        </h1>
      </div>
      <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-16 items-start">
        {/* Colonne gauche : texte */}
        <div className="space-y-8 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight tracking-tight">
            Chaque projet commence par un échange
          </h2>

          <div className="space-y-4 text-sm md:text-base max-w-md">
            <p className="font-medium italic">
              Les meilleures conversations commencent par un simple bonjour.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Une question, un projet, une commande sur mesure ou simplement un échange ?
              <br />
              Ecris-moi, je réponds personnellement à chaque message
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
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
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

          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Vous pouvez aussi me retrouver sur les réseaux sociaux :
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3">
              {socialLinks.map((item) => {
                const Icon = item.Icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-xs md:text-sm uppercase tracking-[0.12em] hover:bg-primary/10 transition-colors whitespace-nowrap"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
