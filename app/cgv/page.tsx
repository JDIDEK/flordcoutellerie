import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'

export default function CGVPage() {
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
                Conditions Générales de Vente
              </h1>
            </div>

            <div className="space-y-10">

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">1. Commandes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente. 
                  Les commandes sont fermes et définitives après versement de l'acompte de 20%.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">2. Prix et Paiement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les prix sont indiqués en euros TTC. Un acompte de 20% est demandé à la commande, 
                  le solde étant dû avant expédition. Les paiements s'effectuent par virement bancaire ou PayPal.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">3. Délais de Réalisation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les délais de fabrication sont de 4 à 8 semaines selon la complexité de la pièce. 
                  Ces délais sont donnés à titre indicatif et peuvent varier en fonction de la charge de travail.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">4. Livraison</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les envois sont effectués en Colissimo Recommandé avec assurance. Les frais de port sont à 
                  la charge du client. La livraison est effectuée à l'adresse indiquée lors de la commande.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">5. Droit de Rétractation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne 
                  peut être exercé pour les biens confectionnés selon les spécifications du consommateur ou 
                  nettement personnalisés. Les couteaux sur mesure sont donc exclus du droit de rétractation.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">6. Garantie</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tous les couteaux sont garantis contre les vices de fabrication. En cas de défaut constaté, 
                  le couteau sera réparé ou remplacé gratuitement. Cette garantie ne couvre pas l'usure normale, 
                  les dommages résultant d'un usage inapproprié ou d'un mauvais entretien.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">7. Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les couteaux vendus sont des outils tranchants destinés à un usage professionnel ou de loisir. 
                  L'acheteur s'engage à les utiliser conformément à leur destination et dans le respect de la 
                  législation en vigueur concernant le port et le transport d'armes blanches.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">8. Litiges</h2>
                <p className="text-muted-foreground leading-relaxed">
                  En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. 
                  À défaut, les tribunaux français seront seuls compétents.
                </p>
              </section>

              <p className="text-sm text-muted-foreground text-center pt-10 border-t border-border">
                Dernière mise à jour : Novembre 2024
              </p>
            </div>
          </div>
        </div>
      </main>
      </PageTransitionWrapper>
    </>
  )
}
