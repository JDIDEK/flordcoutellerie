import { ArrowRight, GalleryVerticalEnd, Hammer, Mail, ShoppingBag } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'
import type { ComponentType } from 'react'

type QuickAccessLink = {
  href: string
  label: string
  cta: string
  featured?: boolean
  icon: ComponentType<{ className?: string }>
}

const quickAccessLinks: QuickAccessLink[] = [
  {
    href: '/pieces',
    label: 'Pièces disponibles',
    cta: 'Ouvrir la boutique',
    featured: true,
    icon: ShoppingBag,
  },
  {
    href: '/sur-mesure',
    label: 'Créer une lame sur mesure',
    cta: 'Démarrer mon projet',
    featured: true,
    icon: Hammer,
  },
  {
    href: '/galerie',
    label: 'Galerie',
    cta: 'Voir la galerie',
    icon: GalleryVerticalEnd,
  },
  {
    href: '/atelier',
    label: "L'atelier",
    cta: "Découvrir l'atelier",
    icon: Hammer,
  },
  {
    href: '/contact',
    label: 'Contact',
    cta: 'Prendre contact',
    icon: Mail,
  },
]

export function HomeQuickAccessSection() {
  return (
    <section className="relative bg-background text-foreground" data-nav-background-trigger>
      <div className="absolute inset-x-0 top-0 h-px bg-border/80" />

      <div className="container mx-auto px-6 pt-10 pb-14 md:py-20">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <h2 className="font-serif text-3xl font-light tracking-tight md:text-5xl">
            Choisissez votre point d&apos;entrée
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            Tout le monde ne vient pas pour la même chose. Accédez directement à ce qui vous intéresse, sans détour.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {quickAccessLinks.map((link) => {
            const Icon = link.icon

            return (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={`group relative flex h-full flex-col justify-between gap-8 rounded-sm border border-border/70 bg-background/70 p-5 transition-colors duration-300 hover:bg-card/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  link.featured ? 'sm:col-span-2 lg:col-span-3' : 'lg:col-span-2'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    {link.featured && (
                      <span className="text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                        Le plus visité
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-light leading-tight">{link.label}</h3>
                </div>

                <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-foreground">
                  {link.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </TransitionLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
