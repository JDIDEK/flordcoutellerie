'use client'

import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:floribadeaudumas@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Contact depuis le site'
    )}&body=${encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`
    window.location.href = mailtoLink
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="space-y-2">
                <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
                  Parlons de votre projet
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
                  Contact
                </h1>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Une question ? Un projet de couteau sur mesure ? N'hésitez pas à me contacter. 
                Je réponds généralement sous 24-48h.
              </p>
            </div>

            {/* Contact Form */}
            <div className="border border-border p-8 md:p-10 rounded-sm bg-card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      placeholder="Jean Dupont"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jean@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    id="subject"
                    placeholder="Commande sur mesure, question technique, demande de devis..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Décrivez votre projet, vos besoins ou vos questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={8}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer le Message
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  En soumettant ce formulaire, vous acceptez que vos données soient utilisées 
                  pour vous recontacter concernant votre demande.
                </p>
              </form>
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-border text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">SIRET :</strong> 914 141 684 00011
              </p>
              <p className="text-sm text-muted-foreground">Artisan Coutelier • France</p>
              <a 
                href="mailto:floribadeaudumas@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
              >
                floribadeaudumas@gmail.com
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
