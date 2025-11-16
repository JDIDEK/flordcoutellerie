'use client'

import { Loader } from '@/components/loader'
import { Navigation } from '@/components/navigation'
import { VideoScrollSection } from '@/components/video-scroll-section'
import { TypingText } from '@/components/typing-text'
import { SignatureKnivesSection } from '@/components/signature-knives-section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Hammer, Sparkles, Award } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden text-white">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/assets/images/artisan-knife-blade-damascus-steel-dark-workshop.jpg"
              alt="Atelier Flo RD Coutellerie"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Assombrir l’image comme sur le site de resto */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

          {/* Contenu */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Titre centré façon FLAVORS THAT STAY */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-serif font-light leading-[0.9] tracking-tight">
                  <TypingText
                    lines={['LAMES']}
                    className=""
                    lineClassName="block text-5xl md:text-7xl lg:text-[5.5rem]"
                    speed={50}
                    startDelay={500}
                  />
                  <TypingText
                    lines={['QUI TRAVERSENT']}
                    className=""
                    lineClassName="block text-5xl md:text-7xl lg:text-[5.5rem]"
                    speed={40}
                    startDelay={500}
                  />
                  <TypingText
                    lines={['LES GÉNÉRATIONS.']}
                    className=""
                    lineClassName="block text-5xl md:text-7xl lg:text-[5.5rem]"
                    speed={40}
                    startDelay={500}
                  />
                </h1>
              </div>
            </div>

            {/* Ligne du bas : petite mention à gauche + texte + mention à droite */}
            <div className="container mx-auto px-6 pb-14">
              <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                {/* Texte descriptif en bas */}
                <p className="max-w-xl text-sm md:text-base text-neutral-200 leading-relaxed">
                  Dans mon atelier, chaque couteau est une pièce unique façonnée dans les
                  aciers les plus nobles. Des commandes sur mesure pour chefs,
                  collectionneurs et passionnés qui recherchent une âme dans la lame.
                </p>

                {/* Texte mini à droite */}
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-neutral-300 text-right ">
                  Service sur-mesure • Pièces uniques
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section with Scroll Animation */}
        <VideoScrollSection />

        {/* Featured Pieces Preview - Split Layout */}
        <SignatureKnivesSection />

        {/* CTA Section */}
        <section className="py-32 bg-secondary/30 texture-overlay">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-balance">
                Créons ensemble votre lame sur mesure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Choix des aciers, formes, manches et guillochage. 
                Accompagnement personnalisé de la conception à la livraison.
              </p>
              <Button asChild size="lg" className="group hover-lift">
                <Link href="/sur-mesure">
                  Démarrer un Projet
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-xl font-serif font-light tracking-wider">
                  FLO RD
                </span>
                <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  Coutellerie
                </span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-primary transition-colors">
                  Atelier
                </Link>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
                <Link href="/mentions-legales" className="hover:text-primary transition-colors">
                  Mentions Légales
                </Link>
                <Link href="/cgv" className="hover:text-primary transition-colors">
                  CGV
                </Link>
              </div>

              <p className="text-xs text-muted-foreground">
                SIRET: 914 141 684 00011
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
