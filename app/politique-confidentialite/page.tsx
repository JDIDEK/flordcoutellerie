'use client'

import { Navigation } from '@/components/navigation'
import { PageTransitionWrapper } from '@/components/page-transition-wrapper'
import { TransitionLink } from '@/components/transition-link'

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navigation />
      
      <PageTransitionWrapper>
        <main className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase mb-2">
                Protection des données
              </p>
              <h1 className="text-4xl font-serif font-light text-foreground">
                Politique de Confidentialité
              </h1>
            </div>

            <div className="space-y-10">
              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">1. Responsable du traitement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Flo RD Coutellerie</strong><br />
                  SIRET : 914 141 684 00011<br />
                  Email : floribadeaudumas@gmail.com<br />
                  <br />
                  Flo RD Coutellerie s'engage à protéger la vie privée des utilisateurs de son site 
                  et à assurer la confidentialité des informations personnelles fournies.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">2. Données collectées</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Nous collectons les données suivantes :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-foreground">Données de navigation</strong> : adresse IP, 
                      type de navigateur, pages visitées, durée de visite (via Vercel Analytics)
                    </li>
                    <li>
                      <strong className="text-foreground">Données de commande</strong> : nom, prénom, 
                      adresse email, adresse de livraison, informations de paiement (traitées par Stripe)
                    </li>
                    <li>
                      <strong className="text-foreground">Données de contact</strong> : nom, email, 
                      message (via le formulaire de contact)
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">3. Finalités du traitement</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Vos données sont utilisées pour :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Traiter et livrer vos commandes</li>
                    <li>Répondre à vos demandes de contact ou devis sur mesure</li>
                    <li>Améliorer notre site et l'expérience utilisateur</li>
                    <li>Respecter nos obligations légales (facturation, comptabilité)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">4. Base légale</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-foreground">Exécution du contrat</strong> : pour le traitement 
                      des commandes et la livraison
                    </li>
                    <li>
                      <strong className="text-foreground">Consentement</strong> : pour les cookies analytiques 
                      et les communications marketing
                    </li>
                    <li>
                      <strong className="text-foreground">Intérêt légitime</strong> : pour l'amélioration 
                      de nos services et la sécurité du site
                    </li>
                    <li>
                      <strong className="text-foreground">Obligation légale</strong> : pour la conservation 
                      des factures et documents comptables
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">5. Cookies</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Notre site utilise les cookies suivants :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-foreground">Cookies essentiels</strong> : nécessaires au 
                      fonctionnement du panier et du paiement
                    </li>
                    <li>
                      <strong className="text-foreground">Cookies analytiques</strong> : Vercel Analytics, 
                      pour mesurer l'audience et améliorer le site (avec votre consentement)
                    </li>
                  </ul>
                  <p>
                    Vous pouvez gérer vos préférences de cookies à tout moment via la bannière de 
                    consentement ou les paramètres de votre navigateur.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">6. Durée de conservation</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-foreground">Données de navigation</strong> : 26 mois maximum
                    </li>
                    <li>
                      <strong className="text-foreground">Données de commande</strong> : 10 ans (obligation 
                      légale de conservation des documents comptables)
                    </li>
                    <li>
                      <strong className="text-foreground">Données de contact</strong> : 3 ans après le 
                      dernier contact
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">7. Destinataires des données</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Vos données peuvent être transmises à :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong className="text-foreground">Stripe</strong> : pour le traitement sécurisé 
                      des paiements (certifié PCI-DSS)
                    </li>
                    <li>
                      <strong className="text-foreground">Vercel</strong> : hébergement du site et analytics
                    </li>
                    <li>
                      <strong className="text-foreground">Resend</strong> : envoi des emails transactionnels 
                      (confirmations de commande)
                    </li>
                    <li>
                      <strong className="text-foreground">Services postaux</strong> : pour la livraison 
                      de vos commandes
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">8. Transferts hors UE</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Certains de nos prestataires (Vercel, Stripe, Resend) sont basés aux États-Unis. 
                  Ces transferts sont encadrés par des clauses contractuelles types approuvées par 
                  la Commission européenne et/ou le Data Privacy Framework UE-US, garantissant un 
                  niveau de protection adéquat de vos données.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">9. Vos droits</h2>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong className="text-foreground">Droit d'accès</strong> : obtenir une copie de vos données</li>
                    <li><strong className="text-foreground">Droit de rectification</strong> : corriger des données inexactes</li>
                    <li><strong className="text-foreground">Droit à l'effacement</strong> : demander la suppression de vos données</li>
                    <li><strong className="text-foreground">Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
                    <li><strong className="text-foreground">Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                    <li><strong className="text-foreground">Droit de limitation</strong> : limiter le traitement de vos données</li>
                  </ul>
                  <p>
                    Pour exercer ces droits, contactez-nous à : <br />
                    <a href="mailto:floribadeaudumas@gmail.com" className="text-primary hover:underline">
                      floribadeaudumas@gmail.com
                    </a>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">10. Réclamation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Si vous estimez que le traitement de vos données n'est pas conforme à la réglementation, 
                  vous pouvez introduire une réclamation auprès de la CNIL :<br />
                  <a 
                    href="https://www.cnil.fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    www.cnil.fr
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-lg font-medium mb-3 text-foreground">11. Sécurité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                  protéger vos données contre l'accès non autorisé, la perte ou la destruction. 
                  Toutes les transactions de paiement sont chiffrées via HTTPS et traitées par Stripe, 
                  certifié PCI-DSS niveau 1.
                </p>
              </section>

              <p className="text-sm text-muted-foreground text-center pt-10 border-t border-border">
                Dernière mise à jour : Décembre 2024
              </p>

              <div className="text-center pt-4">
                <TransitionLink 
                  href="/mentions-legales" 
                  className="text-sm text-primary hover:underline"
                >
                  Voir les mentions légales
                </TransitionLink>
                {' • '}
                <TransitionLink 
                  href="/cgv" 
                  className="text-sm text-primary hover:underline"
                >
                  Voir les CGV
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
