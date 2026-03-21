import type { Metadata } from 'next'

import { Navigation } from '@/components/Navigation'
import { PageTransitionWrapper } from '@/components/PageTransitionWrapper'

export const metadata: Metadata = {
  title: 'Mentions Légales | Flo RD Coutellerie',
  description:
    'Mentions légales du site Flo RD Coutellerie : éditeur, hébergement, propriété intellectuelle et données personnelles.',
}

export default function MentionsLegalesPage() {
  return (
    <>
      <Navigation />

      <PageTransitionWrapper>
        <main className="min-h-screen flex flex-col justify-center bg-background pb-20 pt-32 text-foreground font-body">
          <div className="container mx-auto px-6">
            <h1 className="mb-24 text-center font-serif text-3xl font-light tracking-tight text-foreground animate-fade-in-up md:text-6xl">
              Mentions Légales
            </h1>

            <div className="mx-auto max-w-2xl space-y-20 text-center animate-fade-in-up">

              {/* Éditeur */}
              <section className="space-y-6">
                <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                  Éditeur du Site
                </h2>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  <strong className="font-medium text-foreground">Flo RD Coutellerie</strong>,
                  artisan coutelier, est immatriculé sous le numéro SIRET 914 141 684 00011 et
                  peut être contacté à l&apos;adresse suivante :{' '}
                  <a
                    href="mailto:floribadeaudumas@gmail.com"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    floribadeaudumas@gmail.com
                  </a>
                  .
                </p>
              </section>

              {/* Hébergement */}
              <section className="space-y-6">
                <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                  Hébergement
                </h2>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Ce site est hébergé par{' '}
                  <strong className="font-medium text-foreground">Vercel Inc.</strong>, 340 S Lemon
                  Ave #4133, Walnut, CA 91789, États-Unis.
                </p>
              </section>

              {/* Crédits — version restructurée */}
              <section className="space-y-10">
                <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                  Crédits
                </h2>

                <div className="divide-y divide-border">

                  {/* Développement */}
                  <div className="py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 text-left">
                    <div className="sm:w-1/3">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Développement
                      </p>
                    </div>
                    <div className="sm:w-2/3 space-y-1">
                      <p className="font-medium text-foreground">Josselin D.</p>
                      <p className="text-sm text-muted-foreground">
                        Conception et développement du site
                      </p>
                      <a
                        href="mailto:contact@didev.fr"
                        className="inline-block text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        contact@didev.fr 
                      </a>
                    </div>
                  </div>

                  {/* Illustration */}
                  <div className="py-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 text-left">
                    <div className="sm:w-1/3">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Illustrations
                      </p>
                    </div>
                    <div className="sm:w-2/3 space-y-1">
                      <p className="font-medium text-foreground">Morgane B.</p>
                      <p className="text-sm text-muted-foreground">
                        Dessins et illustrations originaux
                      </p>
                      <a
                        href="mailto:leynart.pro@gmail.com"
                        className="block text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        leynart.pro@gmail.com
                      </a>
                      <a
                        href="https://linktr.ee/leynaid#267236855"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        Linktree
                      </a>
                    </div>
                  </div>

                </div>
              </section>

              {/* Propriété intellectuelle */}
              <section className="space-y-6">
                <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                  Propriété Intellectuelle
                </h2>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  L&apos;ensemble de ce site relève de la législation française et internationale sur
                  le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction
                  sont réservés, y compris pour les documents téléchargeables et les représentations
                  iconographiques et photographiques.
                </p>
              </section>

              {/* Données personnelles */}
              <section className="space-y-6">
                <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                  Données Personnelles
                </h2>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et
                  au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression
                  des données vous concernant. Pour exercer ce droit, contactez-nous à l&apos;adresse :{' '}
                  <a
                    href="mailto:floribadeaudumas@gmail.com"
                    className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                  >
                    floribadeaudumas@gmail.com
                  </a>
                  .
                </p>
              </section>

              {/* Cookies */}
              <section className="space-y-6">
                <h2 className="font-serif text-2xl font-light text-foreground sm:text-3xl">
                  Cookies
                </h2>
                <p className="leading-relaxed text-muted-foreground sm:text-lg">
                  Ce site utilise des cookies uniquement à des fins d&apos;analyse de trafic et
                  d&apos;amélioration de l&apos;expérience utilisateur. Aucune donnée personnelle n&apos;est
                  collectée sans votre consentement.
                </p>
              </section>

            </div>
          </div>
        </main>
      </PageTransitionWrapper>
    </>
  )
}