import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'
import { TransitionLink } from '@/components/TransitionLink'

export const metadata: Metadata = {
  title: 'Conditions Generales de Vente | Flo RD Coutellerie',
  description:
    'Conditions Generales de Vente de Flo RD Coutellerie : commande, paiement Stripe, livraison, retractation et garanties.',
}

const sections = [
  {
    title: '1. Identite du vendeur',
    content: (
      <>
        <p>
          Le site <strong className="text-foreground">Flo RD Coutellerie</strong> est
          exploite par Florent B. Dumas, artisan coutelier, SIRET 914 141 684 00011,
          joignable a l&apos;adresse{' '}
          <a
            href="mailto:floribadeaudumas@gmail.com"
            className="underline underline-offset-4"
          >
            floribadeaudumas@gmail.com
          </a>
          .
        </p>
        <p>
          Les presentes CGV regissent les ventes conclues a distance sur le site pour
          les pieces disponibles en ligne et, plus largement, les echanges prealables
          aux commandes sur mesure.
        </p>
      </>
    ),
  },
  {
    title: '2. Produits proposes',
    content: (
      <>
        <p>
          Les produits presentes sont des couteaux artisanaux, fabriques en piece
          unique ou en tres petite serie. Les visuels et descriptions sont fournis avec
          le plus grand soin, mais de legeres variations de teinte, de veinage ou de
          texture peuvent exister.
        </p>
        <p>
          Les demandes sur mesure font l&apos;objet d&apos;un echange specifique et, sauf
          mention contraire, ne sont pas achetables directement via le tunnel de
          paiement instantane du site.
        </p>
      </>
    ),
  },
  {
    title: '3. Prix',
    content: (
      <>
        <p>
          Les prix affiches sur le site sont exprimes en euros TTC. Les frais de
          livraison, lorsqu&apos;ils s&apos;appliquent, sont precises avant validation du
          paiement.
        </p>
        <p>
          Flo RD Coutellerie se reserve le droit de modifier ses prix a tout moment,
          etant entendu que le prix facture est celui affiche au moment de la
          validation de la commande.
        </p>
      </>
    ),
  },
  {
    title: '4. Commande et disponibilite',
    content: (
      <>
        <p>
          La commande est formee apres validation du paiement par Stripe et reception
          de la confirmation correspondante. Avant cette validation, une piece peut etre
          temporairement reservee pendant la session de paiement.
        </p>
        <p>
          En cas d&apos;incident de paiement, d&apos;expiration de session ou d&apos;erreur
          manifeste de disponibilite, Flo RD Coutellerie pourra annuler la commande et
          remettre la piece en vente apres information du client.
        </p>
      </>
    ),
  },
  {
    title: '5. Paiement',
    content: (
      <>
        <p>
          Les paiements en ligne sont traites via Stripe. Le site n&apos;enregistre pas
          les donnees bancaires completes du client.
        </p>
        <p>
          Le montant total est du en une seule fois au moment de la commande pour les
          pieces disponibles en ligne. Toute commande non valablement reglee ne pourra
          pas etre expediée.
        </p>
      </>
    ),
  },
  {
    title: '6. Livraison',
    content: (
      <>
        <p>
          La livraison est effectuee a l&apos;adresse communiquee par le client lors de la
          commande. Sauf mention particuliere, le delai d&apos;expedition est indicatif et
          peut varier selon les finitions a realiser, les contraintes logistiques et la
          charge de l&apos;atelier.
        </p>
        <p>
          A titre indicatif, les envois sont prepares sous 2 a 4 semaines apres
          confirmation du paiement. Le client doit verifier l&apos;exactitude de ses
          coordonnees avant validation.
        </p>
      </>
    ),
  },
  {
    title: '7. Droit de retractation',
    content: (
      <>
        <p>
          Pour les pieces standards achetees a distance, le client consommateur dispose,
          en principe, d&apos;un droit de retractation de 14 jours a compter de la
          reception, sous reserve que le produit soit retourne complet, non utilise et
          dans son etat d&apos;origine.
        </p>
        <p>
          Conformement a l&apos;article L221-28 du Code de la consommation, le droit de
          retractation ne s&apos;applique pas aux biens confectionnes selon les
          specifications du consommateur ou nettement personnalises. Les commandes sur
          mesure et personnalisations specifiques sont donc exclues de retractation.
        </p>
      </>
    ),
  },
  {
    title: '8. Garanties',
    content: (
      <>
        <p>
          Les produits beneficient des garanties legales de conformite et des vices
          caches dans les conditions prevues par le droit francais.
        </p>
        <p>
          La garantie ne couvre pas l&apos;usure normale, les chocs, une mauvaise
          utilisation, un entretien inapproprie, les modifications realisees par un
          tiers ou le non-respect des consignes d&apos;usage.
        </p>
      </>
    ),
  },
  {
    title: '9. Usage des couteaux et obligations du client',
    content: (
      <>
        <p>
          La vente est reservee aux personnes majeures. Flo RD Coutellerie peut refuser
          ou annuler une commande en cas de doute legitime sur l&apos;age ou l&apos;usage
          prevu.
        </p>
        <p>
          Les couteaux vendus sont des objets tranchants dont le port et le transport
          hors du domicile peuvent etre reglementes ou interdits sans motif legitime.
          Le client est seul responsable du respect de la legislation applicable a son
          lieu de residence, de transport, de detention et d&apos;usage.
        </p>
      </>
    ),
  },
  {
    title: '10. Responsabilite',
    content: (
      <>
        <p>
          Flo RD Coutellerie ne pourra etre tenue responsable d&apos;un dommage indirect,
          d&apos;une mauvaise utilisation du produit ou d&apos;un non-respect par le client des
          regles de securite, d&apos;entretien ou de droit applicable.
        </p>
        <p>
          La responsabilite du vendeur est en toute hypothese limitee au montant de la
          commande effectivement reglee, sauf disposition legale d&apos;ordre public
          contraire.
        </p>
      </>
    ),
  },
  {
    title: '11. Litiges, droit applicable et mediation',
    content: (
      <>
        <p>
          Les presentes CGV sont soumises au droit francais. En cas de difficulte, le
          client est invite a contacter en priorite Flo RD Coutellerie afin de
          rechercher une solution amiable.
        </p>
        <p>
          Si aucun accord amiable n&apos;est trouve, le client consommateur peut solliciter
          un dispositif de mediation de la consommation. A defaut de resolution
          amiable, les juridictions francaises competentes pourront etre saisies.
        </p>
      </>
    ),
  },
]

export default function CGVPage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen bg-background pb-20 pt-32">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <p className="mb-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  Informations contractuelles
                </p>
                <h1 className="text-4xl font-light text-foreground md:text-5xl">
                  Conditions Generales de Vente
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  Ces conditions doivent etre lues avant tout paiement. Elles
                  complettent les informations figurant sur les fiches produit, les{' '}
                  <TransitionLink
                    href="/mentions-legales"
                    className="underline underline-offset-4"
                  >
                    mentions legales
                  </TransitionLink>{' '}
                  et la{' '}
                  <TransitionLink
                    href="/politique-confidentialite"
                    className="underline underline-offset-4"
                  >
                    politique de confidentialite
                  </TransitionLink>
                  .
                </p>
              </div>

              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.title} className="space-y-3">
                    <h2 className="text-lg font-medium text-foreground">{section.title}</h2>
                    <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {section.content}
                    </div>
                  </section>
                ))}

                <p className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                  Derniere mise a jour : 13 mars 2026
                </p>
              </div>
            </div>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}
