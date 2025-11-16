import { Loader } from '@/components/loader'
import { Navigation } from '@/components/navigation'
import { VideoScrollSection } from '@/components/video-scroll-section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Hammer, Sparkles, Award } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Loader />
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
                  <span className="block text-5xl md:text-7xl lg:text-[5.5rem]">
                    LAMES
                  </span>
                  <span className="block text-5xl md:text-7xl lg:text-[5.5rem]">
                    QUI TRAVERSENT
                  </span>
                  <span className="block text-5xl md:text-7xl lg:text-[5.5rem]">
                    LES GÉNÉRATIONS.
                  </span>
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

        {/* Values Section */}
        <section className="py-32 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-4 group hover-lift stagger-item">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Hammer className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-light">Artisanat</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Chaque pièce est forgée à la main dans mon atelier, respectant les traditions anciennes de la coutellerie.
                </p>
              </div>

              <div className="text-center space-y-4 group hover-lift stagger-item">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-light">Matériaux Précieux</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Aciers Damasteel DS93X, VG10 Suminagashi, 14C28N. Manches en bois stabilisé et résines nobles.
                </p>
              </div>

              <div className="text-center space-y-4 group hover-lift stagger-item">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-light">Pièces Uniques</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Collections limitées et commandes sur mesure. Guillochage fleuri, gravures personnalisées.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Pieces Preview */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="text-center space-y-4 mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight">
                Créations Récentes
              </h2>
              <p className="text-muted-foreground">
                Une sélection de pièces disponibles
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Gyuto Damasteel',
                  steel: 'DS93X Fafnir 67 couches',
                  price: '1 150 €',
                  image: '/assets/images/damascus-steel-chef-knife-gyuto-kitchen.jpg'
                },
                {
                  title: 'Bushcraft Inox',
                  steel: '14C28N Swedish Steel',
                  price: '390 €',
                  image: '/assets/images/bushcraft-survival-knife-outdoor-blade.jpg'
                },
                {
                  title: 'Santoku VG10',
                  steel: 'VG10 Suminagashi 67 couches',
                  price: '850 €',
                  image: '/assets/images/santoku-kitchen-knife-damascus-japanese.jpg'
                },
              ].map((piece, index) => (
                <Link 
                  key={index}
                  href="/pieces" 
                  className="group block space-y-4 stagger-item hover-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary rounded-sm image-reveal">
                    <img
                      src={piece.image || "/placeholder.svg"}
                      alt={piece.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-light group-hover:text-primary transition-colors">
                          {piece.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {piece.steel}
                        </p>
                      </div>
                      <p className="text-lg font-light text-primary">
                        {piece.price}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-in-up">
              <Button asChild variant="outline" size="lg" className="hover-lift">
                <Link href="/pieces">
                  Voir Toutes les Pièces
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

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
