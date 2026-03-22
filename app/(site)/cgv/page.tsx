import type { Metadata } from 'next'

import { Navigation } from '@/components/site/Navigation'
import { PageTransitionWrapper } from '@/components/site/PageTransitionWrapper'
import { TransitionLink } from '@/components/site/TransitionLink'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Flo RD Coutellerie',
  description:
    'Conditions Générales de Vente de Flo RD Coutellerie : commande, paiement Stripe, livraison, rétractation et garanties.',
}

const sections = [
  {
    title: '1. Identité du vendeur',
    content: (
      <>
        <p>
          Le site <strong className="font-medium text-foreground">Flo RD Coutellerie</strong> est
          exploité par Florent B. Dumas, artisan coutelier, SIRET 914 141 684 00011, joignable à
          l&apos;adresse{' '}
          <a
            href="mailto:floribadeaudumas@gmail.com"
            className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            floribadeaudumas@gmail.com
          </a>
          .
        </p>
        <p>
          Les présentes CGV régissent les ventes conclues à distance sur le site pour les pièces
          disponibles en ligne et, plus largement, les échanges préalables aux commandes sur mesure.
        </p>
      </>
    ),
  },
  {
    title: '2. Produits proposés',
    content: (
      <>
        <p>
          Les produits présentés sont des couteaux artisanaux, fabriqués en pièce unique ou en très
          petite série. Les visuels et descriptions sont fournis avec le plus grand soin, mais de
          légères variations de teinte, de veinage ou de texture peuvent exister.
        </p>
        <p>
          Les demandes sur mesure font l&apos;objet d&apos;un échange spécifique et, sauf mention
          contraire, ne sont pas achetables directement via le tunnel de paiement instantané du
          site.
        </p>
      </>
    ),
  },
  {
    title: '3. Prix',
    content: (
      <>
        <p>
          Les prix affichés sur le site sont exprimés en euros TTC. Les frais de livraison,
          lorsqu&apos;ils s&apos;appliquent, sont précisés avant validation du paiement.
        </p>
        <p>
          Flo RD Coutellerie se réserve le droit de modifier ses prix à tout moment, étant entendu
          que le prix facturé est celui affiché au moment de la validation de la commande.
        </p>
      </>
    ),
  },
  {
    title: '4. Commande et disponibilité',
    content: (
      <>
        <p>
          La commande est formée après validation du paiement par Stripe et réception de la
          confirmation correspondante. Avant cette validation, une pièce peut être temporairement
          réservée pendant la session de paiement.
        </p>
        <p>
          En cas d&apos;incident de paiement, d&apos;expiration de session ou d&apos;erreur
          manifeste de disponibilité, Flo RD Coutellerie pourra annuler la commande et remettre la
          pièce en vente après information du client.
        </p>
      </>
    ),
  },
  {
    title: '5. Paiement',
    content: (
      <>
        <p>
          Les paiements en ligne sont traités via{' '}
          <strong className="font-medium text-foreground">Stripe</strong>. Le site
          n&apos;enregistre pas les données bancaires complètes du client.
        </p>
        <p>
          Le montant total est dû en une seule fois au moment de la commande pour les pièces
          disponibles en ligne. Toute commande non valablement réglée ne pourra pas être expédiée.
        </p>
      </>
    ),
  },
  {
    title: '6. Livraison',
    content: (
      <>
        <p>
          La livraison est effectuée à l&apos;adresse communiquée par le client lors de la commande.
          Sauf mention particulière, le délai d&apos;expédition est indicatif et peut varier selon
          les finitions à réaliser, les contraintes logistiques et la charge de l&apos;atelier.
        </p>
        <p>
          À titre indicatif, les envois sont préparés sous 2 à 4 semaines après confirmation du
          paiement. Le client doit vérifier l&apos;exactitude de ses coordonnées avant validation.
        </p>
      </>
    ),
  },
  {
    title: '7. Droit de rétractation',
    content: (
      <>
        <p>
          Pour les pièces standards achetées à distance, le client consommateur dispose, en
          principe, d&apos;un droit de rétractation de 14 jours à compter de la réception, sous
          réserve que le produit soit retourné complet, non utilisé et dans son état d&apos;origine.
        </p>
        <p>
          Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation
          ne s&apos;applique pas aux biens confectionnés selon les spécifications du consommateur ou
          nettement personnalisés. Les commandes sur mesure et personnalisations spécifiques sont
          donc exclues de rétractation.
        </p>
      </>
    ),
  },
  {
    title: '8. Garanties',
    content: (
      <>
        <p>
          Les produits bénéficient des garanties légales de conformité et des vices cachés dans les
          conditions prévues par le droit français.
        </p>
        <p>
          La garantie ne couvre pas l&apos;usure normale, les chocs, une mauvaise utilisation, un
          entretien inapproprié, les modifications réalisées par un tiers ou le non-respect des
          consignes d&apos;usage.
        </p>
      </>
    ),
  },
  {
    title: '9. Usage des couteaux et obligations du client',
    content: (
      <>
        <p>
          La vente est réservée aux personnes majeures. Flo RD Coutellerie peut refuser ou annuler
          une commande en cas de doute légitime sur l&apos;âge ou l&apos;usage prévu.
        </p>
        <p>
          Les couteaux vendus sont des objets tranchants dont le port et le transport hors du
          domicile peuvent être réglementés ou interdits sans motif légitime. Le client est seul
          responsable du respect de la législation applicable à son lieu de résidence, de transport,
          de détention et d&apos;usage.
        </p>
      </>
    ),
  },
  {
    title: '10. Responsabilité',
    content: (
      <>
        <p>
          Flo RD Coutellerie ne pourra être tenue responsable d&apos;un dommage indirect,
          d&apos;une mauvaise utilisation du produit ou d&apos;un non-respect par le client des
          règles de sécurité, d&apos;entretien ou de droit applicable.
        </p>
        <p>
          La responsabilité du vendeur est en toute hypothèse limitée au montant de la commande
          effectivement réglée, sauf disposition légale d&apos;ordre public contraire.
        </p>
      </>
    ),
  },
  {
    title: '11. Litiges, droit applicable et médiation',
    content: (
      <>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de difficulté, le client est
          invité à contacter en priorité Flo RD Coutellerie afin de rechercher une solution amiable.
        </p>
        <p>
          Si aucun accord amiable n&apos;est trouvé, le client consommateur peut solliciter un
          dispositif de médiation de la consommation. À défaut de résolution amiable, les
          juridictions françaises compétentes pourront être saisies.
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
        <main className="min-h-screen flex flex-col justify-center bg-background pb-20 pt-32 text-foreground font-body">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-2xl animate-fade-in-up">

              {/* En-tête */}
              <div className="mb-24 text-center">
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                  Informations contractuelles
                </p>
                <h1 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-6xl">
                  Conditions Générales de Vente
                </h1>
                <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground sm:text-lg">
                  Ces conditions doivent être lues avant tout paiement. Elles complètent les
                  informations figurant sur les fiches produit, les{' '}
                  <TransitionLink
                    href="/mentions-legales"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    mentions légales
                  </TransitionLink>{' '}
                  et la{' '}
                  <TransitionLink
                    href="/politique-confidentialite"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    politique de confidentialité
                  </TransitionLink>
                  .
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-20 text-center">
                {sections.map((section) => (
                  <section key={section.title} className="space-y-6">
                    <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="space-y-4 leading-relaxed text-muted-foreground sm:text-lg">
                      {section.content}
                    </div>
                  </section>
                ))}

                <p className="border-t border-border pt-10 text-center text-sm text-muted-foreground sm:text-base">
                  Dernière mise à jour : 13 mars 2026
                </p>
              </div>

            </div>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}
