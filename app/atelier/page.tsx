import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'

export default function AboutPage() {
  return (
    <>
      <Navigation />
      
      <PageTransitionWrapper>
        <main className="min-h-screen flex flex-col justify-center pt-32 pb-20 bg-background">
          <div className="container mx-auto px-6 text-justify">
            {/* Hero */}
            <h1 className="text-3xl md:text-6xl font-light tracking-tight text-center mb-24 animate-fade-in-up">
              L'Atelier
            </h1>

            {/* L'atelier */}
            <section className="max-w-2xl mx-auto mb-20">
              <p className="text-muted-foreground leading-relaxed">
                Pas de production de masse, pas de compromis sur la qualité. Chaque pièce est
                fabriquée individuellement à la main et sera unique à son propriétaire.
              </p>
            </section>

            {/* Les matériaux */}
            <section className="max-w-2xl mx-auto mb-20">
              <h2 className="text-2xl md:text-3xl font-serif font-light mb-10 text-foreground">
                Les matériaux
              </h2>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Je travaille exclusivement avec de l'acier inoxydable et haut de gamme. Les matériaux
                  utilisés pour les manches sont sélectionnés pour leur caractère. Bois naturels, résines
                  ou matières fossiles présentent chacun des textures, des teintes et des
                  comportements différents.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Chaque morceau est unique par nature : le veinage, la couleur et les variations font
                  partie intégrante du matériau et ne peuvent être reproduits à l'identique.
                </p>
              </div>
            </section>

            {/* L'artisan */}
            <section className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif font-light mb-10 text-foreground">
                L'artisan
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Je m'appelle Florent, 28 ans, ingénieur de formation. J'ai quitté l'industrie, et fait le
                choix d'un travail artisanal indépendant, plus direct et plus maîtrisé.
              </p>
            </section>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}
