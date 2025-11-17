import { Navigation } from '@/components/navigation'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="space-y-8">
              <div className="space-y-3 text-center">
                <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
                  L'Atelier
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
                  Flo RD Coutellerie
                </h1>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
                <p>
                  Dans mon atelier, chaque lame naît du feu et prend forme sous le marteau. 
                  Je forge des couteaux artisanaux qui allient tradition et innovation, 
                  en utilisant les aciers les plus nobles et les techniques ancestrales.
                </p>
                <p>
                  Passionné par la coutellerie japonaise et européenne, je crée des pièces 
                  uniques destinées aux chefs, aux amateurs d'outdoor et aux collectionneurs 
                  exigeants.
                </p>
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <section className="max-w-2xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-serif font-light mb-10 text-center text-foreground">
              Philosophie & Démarche
            </h2>
            <div className="space-y-10">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Forge Traditionnelle</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque lame est façonnée à la main, du lingot d'acier brut jusqu'à la finition finale. 
                  Trempe différentielle, affûtage convexe et polissage miroir ou satiné selon vos préférences.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Aciers d'Exception</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Je travaille exclusivement avec des aciers premium : Damasteel DS93X suédois, 
                  VG10 Suminagashi japonais et 14C28N inox. Chaque acier est sélectionné pour ses 
                  performances et son esthétique.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Pièces Uniques</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pas de production de masse. Chaque couteau est une création originale avec des 
                  variations naturelles de motifs, manches en bois stabilisé, morta ou résines artisanales.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">Sur Mesure</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Accompagnement personnalisé pour créer votre lame idéale. Du choix des aciers aux 
                  dimensions, en passant par le guillochage et la gravure, tout est possible.
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="max-w-2xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-serif font-light mb-10 text-center text-foreground">
              Le Processus de Création
            </h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-muted-foreground font-mono">01</span>
                  <h4 className="font-medium text-foreground">Conception & Échange</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  Discussion sur vos besoins, usage et préférences. Choix des matériaux et validation du design.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-muted-foreground font-mono">02</span>
                  <h4 className="font-medium text-foreground">Forge & Trempe</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  Façonnage de la lame, traitement thermique selon l'acier choisi, rectification et polissage.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-muted-foreground font-mono">03</span>
                  <h4 className="font-medium text-foreground">Manche & Assemblage</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  Travail du manche en bois ou résine, guillochage éventuel, assemblage précis et finitions.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm text-muted-foreground font-mono">04</span>
                  <h4 className="font-medium text-foreground">Affûtage & Livraison</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-8">
                  Affûtage final tranchant rasoir, contrôle qualité, emballage soigné et envoi sécurisé.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Délai moyen : 4 à 8 semaines • Acompte : 20% à la commande
              </p>
            </div>
          </section>

          {/* Materials */}
          <section className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-light mb-10 text-center text-foreground">
              Les Matériaux
            </h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-foreground">Damasteel DS93X™</h3>
                  <span className="text-sm text-muted-foreground font-mono">64 HRC</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Acier Damas suédois de renommée mondiale. Motifs Fafnir, Rose, Vinland, Twist ou Baldur. 
                  Exceptionnelle tenue de coupe et esthétique spectaculaire.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-foreground">VG10 Suminagashi</h3>
                  <span className="text-sm text-muted-foreground font-mono">60-61 HRC</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Acier japonais 67 couches avec motifs ondulés traditionnels. Excellent compromis 
                  entre performance et facilité d'entretien.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-medium text-foreground">14C28N Swedish</h3>
                  <span className="text-sm text-muted-foreground font-mono">58-60 HRC</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Inox suédois réputé pour sa fiabilité. Idéal pour l'outdoor et un usage quotidien intensif. 
                  Excellent rapport qualité-prix.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
