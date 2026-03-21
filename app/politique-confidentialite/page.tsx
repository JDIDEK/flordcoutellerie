import type { Metadata } from 'next'
import { CookiePreferencesButton } from '@/components/CookiePreferencesButton'
import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { TransitionLink } from '@/components/TransitionLink'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Flo RD Coutellerie',
  description:
    'Politique de confidentialité de Flo RD Coutellerie : données collectées, finalités, durée de conservation et vos droits RGPD.',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen flex flex-col justify-center bg-background pb-20 pt-32 text-foreground font-body">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-2xl animate-fade-in-up">

              {/* En-tête */}
              <div className="mb-24 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  Protection des données
                </p>
                <h1 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-6xl">
                  Politique de Confidentialité
                </h1>
              </div>

              <div className="space-y-20 text-center">

                {/* 1. Responsable */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    1. Responsable du traitement
                  </h2>
                  <div className="space-y-4 leading-relaxed text-muted-foreground sm:text-lg">
                    <p>
                      <strong className="font-medium text-foreground">Flo RD Coutellerie</strong>
                      <br />
                      SIRET : 914 141 684 00011
                      <br />
                      <a
                        href="mailto:floribadeaudumas@gmail.com"
                        className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        floribadeaudumas@gmail.com
                      </a>
                    </p>
                    <p>
                      Flo RD Coutellerie s&apos;engage à protéger la vie privée des utilisateurs de
                      son site et à assurer la confidentialité des informations personnelles
                      fournies.
                    </p>
                  </div>
                </section>

                {/* 2. Données collectées */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    2. Données collectées
                  </h2>
                  <div className="divide-y divide-border text-left">
                    {[
                      {
                        label: 'Navigation',
                        desc: 'Adresse IP, type de navigateur, pages visitées, durée de visite (via Vercel Analytics)',
                      },
                      {
                        label: 'Commande',
                        desc: 'Nom, prénom, adresse email, adresse de livraison, informations de paiement (traitées par Stripe)',
                      },
                      {
                        label: 'Contact',
                        desc: 'Nom, email, message (via le formulaire de contact)',
                      },
                    ].map(({ label, desc }) => (
                      <div
                        key={label}
                        className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                      >
                        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-1/3 shrink-0">
                          {label}
                        </p>
                        <p className="leading-relaxed text-muted-foreground sm:text-lg sm:w-2/3">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 3. Finalités */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    3. Finalités du traitement
                  </h2>
                  <div className="space-y-4 leading-relaxed text-muted-foreground sm:text-lg">
                    <p>Vos données sont utilisées pour :</p>
                    <ul className="space-y-2">
                      <li>Traiter et livrer vos commandes</li>
                      <li>Répondre à vos demandes de contact ou devis sur mesure</li>
                      <li>Améliorer notre site et l&apos;expérience utilisateur</li>
                      <li>Respecter nos obligations légales (facturation, comptabilité)</li>
                    </ul>
                  </div>
                </section>

                {/* 4. Base légale */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    4. Base légale
                  </h2>
                  <div className="divide-y divide-border text-left">
                    {[
                      {
                        label: 'Exécution du contrat',
                        desc: 'Pour le traitement des commandes et la livraison',
                      },
                      {
                        label: 'Consentement',
                        desc: 'Pour les cookies analytiques et les communications marketing',
                      },
                      {
                        label: 'Intérêt légitime',
                        desc: "Pour l'amélioration de nos services et la sécurité du site",
                      },
                      {
                        label: 'Obligation légale',
                        desc: 'Pour la conservation des factures et documents comptables',
                      },
                    ].map(({ label, desc }) => (
                      <div
                        key={label}
                        className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                      >
                        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-1/3 shrink-0">
                          {label}
                        </p>
                        <p className="leading-relaxed text-muted-foreground sm:text-lg sm:w-2/3">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Cookies */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    5. Cookies
                  </h2>
                  <div className="space-y-4 leading-relaxed text-muted-foreground sm:text-lg">
                    <p>
                      Notre site utilise des cookies et autres traceurs locaux (localStorage) pour
                      les usages suivants :
                    </p>
                    <div className="divide-y divide-border text-left">
                      {[
                        {
                          label: 'Essentiels',
                          desc: "Nécessaires au fonctionnement du panier, à la mémorisation du thème d'affichage et à la conservation de votre choix de consentement",
                        },
                        {
                          label: 'Analytiques',
                          desc: "Vercel Analytics, pour mesurer l'audience et améliorer le site (avec votre consentement)",
                        },
                      ].map(({ label, desc }) => (
                        <div
                          key={label}
                          className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                        >
                          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-1/3 shrink-0">
                            {label}
                          </p>
                          <p className="leading-relaxed text-muted-foreground sm:text-lg sm:w-2/3">
                            {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p>
                      Votre choix concernant les traceurs analytiques est conservé pendant 6 mois
                      maximum.
                    </p>
                    <p>Vous pouvez gérer vos préférences à tout moment :</p>
                    <div className="flex justify-center pt-2">
                      <CookiePreferencesButton variant="outline" size="sm">
                        Gérer mes cookies
                      </CookiePreferencesButton>
                    </div>
                  </div>
                </section>

                {/* 6. Durée de conservation */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    6. Durée de conservation
                  </h2>
                  <div className="divide-y divide-border text-left">
                    {[
                      { label: 'Données de navigation', desc: '26 mois maximum' },
                      { label: 'Consentement cookies', desc: '6 mois maximum' },
                      {
                        label: 'Données de commande',
                        desc: '10 ans (obligation légale de conservation des documents comptables)',
                      },
                      { label: 'Données de contact', desc: '3 ans après le dernier contact' },
                    ].map(({ label, desc }) => (
                      <div
                        key={label}
                        className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                      >
                        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-1/3 shrink-0">
                          {label}
                        </p>
                        <p className="leading-relaxed text-muted-foreground sm:text-lg sm:w-2/3">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 7. Destinataires */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    7. Destinataires des données
                  </h2>
                  <div className="divide-y divide-border text-left">
                    {[
                      {
                        label: 'Stripe',
                        desc: 'Traitement sécurisé des paiements (certifié PCI-DSS)',
                      },
                      { label: 'Vercel', desc: 'Hébergement du site et analytics' },
                      {
                        label: 'Resend',
                        desc: 'Envoi des emails transactionnels (confirmations de commande)',
                      },
                      {
                        label: 'Services postaux',
                        desc: 'Livraison de vos commandes',
                      },
                    ].map(({ label, desc }) => (
                      <div
                        key={label}
                        className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                      >
                        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-1/3 shrink-0">
                          {label}
                        </p>
                        <p className="leading-relaxed text-muted-foreground sm:text-lg sm:w-2/3">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 8. Transferts hors UE */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    8. Transferts hors UE
                  </h2>
                  <p className="leading-relaxed text-muted-foreground sm:text-lg">
                    Certains de nos prestataires (
                    <strong className="font-medium text-foreground">Vercel</strong>,{' '}
                    <strong className="font-medium text-foreground">Stripe</strong>,{' '}
                    <strong className="font-medium text-foreground">Resend</strong>) sont basés aux
                    États-Unis. Ces transferts sont encadrés par des clauses contractuelles types
                    approuvées par la Commission européenne et/ou le Data Privacy Framework UE-US,
                    garantissant un niveau de protection adéquat de vos données.
                  </p>
                </section>

                {/* 9. Vos droits */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    9. Vos droits
                  </h2>
                  <div className="space-y-6 leading-relaxed text-muted-foreground sm:text-lg">
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <div className="divide-y divide-border text-left">
                      {[
                        { label: 'Accès', desc: 'Obtenir une copie de vos données' },
                        { label: 'Rectification', desc: 'Corriger des données inexactes' },
                        { label: 'Effacement', desc: 'Demander la suppression de vos données' },
                        {
                          label: 'Portabilité',
                          desc: 'Recevoir vos données dans un format structuré',
                        },
                        { label: 'Opposition', desc: 'Vous opposer au traitement de vos données' },
                        { label: 'Limitation', desc: 'Limiter le traitement de vos données' },
                      ].map(({ label, desc }) => (
                        <div
                          key={label}
                          className="py-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                        >
                          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:w-1/3 shrink-0">
                            {label}
                          </p>
                          <p className="leading-relaxed text-muted-foreground sm:text-lg sm:w-2/3">
                            {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p>
                      Pour exercer ces droits, contactez-nous à :{' '}
                      <a
                        href="mailto:floribadeaudumas@gmail.com"
                        className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        floribadeaudumas@gmail.com
                      </a>
                    </p>
                  </div>
                </section>

                {/* 10. Réclamation */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    10. Réclamation
                  </h2>
                  <p className="leading-relaxed text-muted-foreground sm:text-lg">
                    Si vous estimez que le traitement de vos données n&apos;est pas conforme à la
                    réglementation, vous pouvez introduire une réclamation auprès de la{' '}
                    <strong className="font-medium text-foreground">CNIL</strong> :{' '}
                    <a
                      href="https://www.cnil.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                    >
                      www.cnil.fr
                    </a>
                  </p>
                </section>

                {/* 11. Sécurité */}
                <section className="space-y-6">
                  <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                    11. Sécurité
                  </h2>
                  <p className="leading-relaxed text-muted-foreground sm:text-lg">
                    Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
                    pour protéger vos données contre l&apos;accès non autorisé, la perte ou la
                    destruction. Toutes les transactions de paiement sont chiffrées via HTTPS et
                    traitées par{' '}
                    <strong className="font-medium text-foreground">Stripe</strong>, certifié
                    PCI-DSS niveau 1.
                  </p>
                </section>

                {/* Footer */}
                <p className="border-t border-border pt-10 text-center text-sm text-muted-foreground sm:text-base">
                  Dernière mise à jour : Mars 2026
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-sm">
                  <TransitionLink
                    href="/mentions-legales"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    Mentions légales
                  </TransitionLink>
                  <span className="text-muted-foreground">•</span>
                  <TransitionLink
                    href="/cgv"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    CGV
                  </TransitionLink>
                </div>

              </div>
            </div>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}