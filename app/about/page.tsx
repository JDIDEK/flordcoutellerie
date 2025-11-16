import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Hammer, Flame, Award, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="max-w-4xl mx-auto mb-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm tracking-[0.3em] text-primary uppercase">
                    L'Atelier
                  </p>
                  <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight">
                    Flo RD
                  </h1>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p className="text-pretty">
                    Dans mon atelier, chaque lame naît du feu et prend forme sous le marteau. 
                    Je forge des couteaux artisanaux qui allient tradition et innovation, 
                    en utilisant les aciers les plus nobles et les techniques ancestrales.
                  </p>
                  <p className="text-pretty">
                    Passionné par la coutellerie japonaise et européenne, je crée des pièces 
                    uniques destinées aux chefs, aux amateurs d'outdoor et aux collectionneurs 
                    exigeants.
                  </p>
                </div>
              </div>
              <div className="aspect-square overflow-hidden bg-secondary rounded-sm">
                <img
                  src="/placeholder.svg?key=workshop-artisan-knife-maker-forge"
                  alt="Atelier Flo RD Coutellerie"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <section className="max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-12 text-center">
              Philosophie & Démarche
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 p-6 bg-secondary/30 rounded-sm">
                <Hammer className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-serif font-light">Forge Traditionnelle</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Chaque lame est façonnée à la main, du lingot d'acier brut jusqu'à la finition finale. 
                  Trempe différentielle, affûtage convexe et polissage miroir ou satiné selon vos préférences.
                </p>
              </div>

              <div className="space-y-4 p-6 bg-secondary/30 rounded-sm">
                <Flame className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-serif font-light">Aciers d'Exception</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Je travaille exclusivement avec des aciers premium : Damasteel DS93X suédois, 
                  VG10 Suminagashi japonais et 14C28N inox. Chaque acier est sélectionné pour ses 
                  performances et son esthétique.
                </p>
              </div>

              <div className="space-y-4 p-6 bg-secondary/30 rounded-sm">
                <Award className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-serif font-light">Pièces Uniques</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Pas de production de masse. Chaque couteau est une création originale avec des 
                  variations naturelles de motifs, manches en bois stabilisé, morta ou résines artisanales.
                </p>
              </div>

              <div className="space-y-4 p-6 bg-secondary/30 rounded-sm">
                <Users className="w-10 h-10 text-primary" />
                <h3 className="text-xl font-serif font-light">Sur Mesure</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  Accompagnement personnalisé pour créer votre lame idéale. Du choix des aciers aux 
                  dimensions, en passant par le guillochage et la gravure, tout est possible.
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="max-w-4xl mx-auto mb-24 texture-overlay bg-secondary/20 p-12 rounded-sm">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">
              Le Processus de Création
            </h2>
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-serif text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Conception & Échange</h4>
                  <p className="text-muted-foreground text-pretty">
                    Discussion sur vos besoins, usage et préférences. Choix des matériaux et validation du design.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-serif text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Forge & Trempe</h4>
                  <p className="text-muted-foreground text-pretty">
                    Façonnage de la lame, traitement thermique selon l'acier choisi, rectification et polissage.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-serif text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Manche & Assemblage</h4>
                  <p className="text-muted-foreground text-pretty">
                    Travail du manche en bois ou résine, guillochage éventuel, assemblage précis et finitions.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-serif text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Affûtage & Livraison</h4>
                  <p className="text-muted-foreground text-pretty">
                    Affûtage final tranchant rasoir, contrôle qualité, emballage soigné et envoi sécurisé.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-background/50 rounded-sm border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Délai moyen :</strong> 4 à 8 semaines selon la complexité • 
                <strong> Acompte :</strong> 20% à la commande • 
                <strong> Garantie :</strong> Qualité artisanale française
              </p>
            </div>
          </section>

          {/* Materials */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-light mb-8">
              Les Matériaux
            </h2>
            <div className="space-y-6">
              <div className="border border-border p-6 rounded-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-1">Damasteel DS93X™</h3>
                    <Badge>Premium</Badge>
                  </div>
                  <span className="text-2xl font-serif font-light text-primary">64 HRC</span>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Acier Damas suédois de renommée mondiale. Motifs Fafnir, Rose, Vinland, Twist ou Baldur. 
                  Exceptionnelle tenue de coupe et esthétique spectaculaire.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Tenue de coupe</Badge>
                  <Badge variant="outline">Résistance corrosion</Badge>
                  <Badge variant="outline">Beauté</Badge>
                </div>
              </div>

              <div className="border border-border p-6 rounded-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-1">VG10 Suminagashi</h3>
                    <Badge>Haut de gamme</Badge>
                  </div>
                  <span className="text-2xl font-serif font-light text-primary">60-61 HRC</span>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Acier japonais 67 couches avec motifs ondulés traditionnels. Excellent compromis 
                  entre performance et facilité d'entretien.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Affûtage facile</Badge>
                  <Badge variant="outline">Motifs élégants</Badge>
                  <Badge variant="outline">Polyvalent</Badge>
                </div>
              </div>

              <div className="border border-border p-6 rounded-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-medium mb-1">14C28N Swedish</h3>
                    <Badge>Accessible</Badge>
                  </div>
                  <span className="text-2xl font-serif font-light text-primary">58-60 HRC</span>
                </div>
                <p className="text-muted-foreground mb-4 text-pretty">
                  Inox suédois réputé pour sa fiabilité. Idéal pour l'outdoor et un usage quotidien intensif. 
                  Excellent rapport qualité-prix.
                </p>
                <div className="flex gap-2">
                  <Badge variant="outline">Robuste</Badge>
                  <Badge variant="outline">Entretien facile</Badge>
                  <Badge variant="outline">Fiable</Badge>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
