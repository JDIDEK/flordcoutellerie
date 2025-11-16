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
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-6">
              <div className="space-y-2">
                <p className="text-sm tracking-[0.3em] text-primary uppercase">
                  Parlons de votre projet
                </p>
                <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">
                  Contact
                </h1>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                Une question ? Un projet de couteau sur mesure ? N'hésitez pas à me contacter. 
                Je réponds généralement sous 24-48h.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Contact Cards */}
              <Card className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a 
                    href="mailto:floribadeaudumas@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    floribadeaudumas@gmail.com
                  </a>
                </div>
              </Card>

              <Card className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Localisation</h3>
                  <p className="text-sm text-muted-foreground">
                    France
                  </p>
                </div>
              </Card>

              <Card className="p-6 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Réponse</h3>
                  <p className="text-sm text-muted-foreground">
                    Sous 24-48h
                  </p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 md:p-12">
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
            </Card>

            {/* Additional Info */}
            <Card className="mt-12 p-8 bg-secondary/30">
              <h3 className="text-xl font-serif font-light mb-4">
                Informations Légales
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>SIRET :</strong> 914 141 684 00011</p>
                <p><strong>Artisan Coutelier</strong></p>
                <p><strong>Atelier :</strong> France</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
