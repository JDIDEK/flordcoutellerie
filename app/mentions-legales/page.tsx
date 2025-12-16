import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />
      
      <PageTransitionWrapper>
        <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-2">
                Informations légales
              </p>
              <h1 className="text-4xl font-serif font-light text-foreground">
                Mentions Légales
              </h1>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">Éditeur du Site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Flo RD Coutellerie</strong><br />
                  Artisan Coutelier<br />
                  SIRET : 914 141 684 00011<br />
                  Email : floribadeaudumas@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">Hébergement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site est hébergé par Vercel Inc.<br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789<br />
                  États-Unis
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">Propriété Intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit 
                  d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, 
                  y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">Données Personnelles</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au RGPD, 
                  vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. 
                  Pour exercer ce droit, contactez-nous à l'adresse : floribadeaudumas@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ce site utilise des cookies uniquement à des fins d'analyse de trafic et d'amélioration 
                  de l'expérience utilisateur. Aucune donnée personnelle n'est collectée sans votre consentement.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      </PageTransitionWrapper>
    </>
  )
}
