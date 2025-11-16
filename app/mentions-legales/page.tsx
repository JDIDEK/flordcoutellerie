import { Navigation } from '@/components/navigation'

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h1 className="text-4xl font-serif font-light mb-8">Mentions Légales</h1>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">Éditeur du Site</h2>
              <p className="text-muted-foreground">
                <strong>Flo RD Coutellerie</strong><br />
                Artisan Coutelier<br />
                SIRET : 914 141 684 00011<br />
                Email : floribadeaudumas@gmail.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">Hébergement</h2>
              <p className="text-muted-foreground">
                Ce site est hébergé par Vercel Inc.<br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">Propriété Intellectuelle</h2>
              <p className="text-muted-foreground">
                L'ensemble de ce site relève de la législation française et internationale sur le droit 
                d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, 
                y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">Données Personnelles</h2>
              <p className="text-muted-foreground">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au RGPD, 
                vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. 
                Pour exercer ce droit, contactez-nous à l'adresse : floribadeaudumas@gmail.com
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-light mb-4">Cookies</h2>
              <p className="text-muted-foreground">
                Ce site utilise des cookies uniquement à des fins d'analyse de trafic et d'amélioration 
                de l'expérience utilisateur. Aucune donnée personnelle n'est collectée sans votre consentement.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
