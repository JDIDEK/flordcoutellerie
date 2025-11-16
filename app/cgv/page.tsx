import { Navigation } from '@/components/navigation'

export default function CGVPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl font-serif font-light mb-8">
              Conditions Générales de Vente
            </h1>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">1. Commandes</h2>
              <p className="text-muted-foreground">
                Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente. 
                Les commandes sont fermes et définitives après versement de l'acompte de 20%.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">2. Prix et Paiement</h2>
              <p className="text-muted-foreground">
                Les prix sont indiqués en euros TTC. Un acompte de 20% est demandé à la commande, 
                le solde étant dû avant expédition. Les paiements s'effectuent par virement bancaire ou PayPal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">3. Délais de Réalisation</h2>
              <p className="text-muted-foreground">
                Les délais de fabrication sont de 4 à 8 semaines selon la complexité de la pièce. 
                Ces délais sont donnés à titre indicatif et peuvent varier en fonction de la charge de travail.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">4. Livraison</h2>
              <p className="text-muted-foreground">
                Les envois sont effectués en Colissimo Recommandé avec assurance. Les frais de port sont à 
                la charge du client. La livraison est effectuée à l'adresse indiquée lors de la commande.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">5. Droit de Rétractation</h2>
              <p className="text-muted-foreground">
                Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne 
                peut être exercé pour les biens confectionnés selon les spécifications du consommateur ou 
                nettement personnalisés. Les couteaux sur mesure sont donc exclus du droit de rétractation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">6. Garantie</h2>
              <p className="text-muted-foreground">
                Tous les couteaux sont garantis contre les vices de fabrication. En cas de défaut constaté, 
                le couteau sera réparé ou remplacé gratuitement. Cette garantie ne couvre pas l'usure normale, 
                les dommages résultant d'un usage inapproprié ou d'un mauvais entretien.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">7. Responsabilité</h2>
              <p className="text-muted-foreground">
                Les couteaux vendus sont des outils tranchants destinés à un usage professionnel ou de loisir. 
                L'acheteur s'engage à les utiliser conformément à leur destination et dans le respect de la 
                législation en vigueur concernant le port et le transport d'armes blanches.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">8. Litiges</h2>
              <p className="text-muted-foreground">
                En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. 
                À défaut, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-12">
              Dernière mise à jour : Novembre 2024
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
