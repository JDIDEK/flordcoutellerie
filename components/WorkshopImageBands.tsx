import Image from 'next/image'

import { TransitionLink } from '@/components/site/TransitionLink'

type WorkshopBandImage = {
  id: string
  src: string
  alt: string
}

type WorkshopBandSection = {
  id: string
  eyebrow: string
  title: string
  description: string
  images: WorkshopBandImage[]
}

type WorkshopImageBandsProps = {
  sections: WorkshopBandSection[]
}

function createBandImages(images: WorkshopBandImage[]) {
  if (images.length === 0) {
    return []
  }

  const targetLength = Math.max(images.length, 8)
  const repeated: WorkshopBandImage[] = []

  while (repeated.length < targetLength) {
    repeated.push(...images)
  }

  return repeated.slice(0, targetLength)
}

export function WorkshopImageBands({ sections }: WorkshopImageBandsProps) {
  return (
    <div className="space-y-20 md:space-y-28">
      {sections.map((section, index) => {
        const bandImages = createBandImages(section.images)
        const direction = index % 2 === 0 ? 'normal' : 'reverse'
        const duration = 34 + index * 4

        return (
          <section key={section.id} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-[0.45fr_0.55fr] md:items-end">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  {section.eyebrow}
                </p>
                <h2 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
                  {section.title}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {section.description}
              </p>
            </div>

            <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
              <div
                className="flex w-max gap-4 workshop-marquee"
                style={{
                  animationDuration: `${duration}s`,
                  animationDirection: direction,
                }}
              >
                {[...bandImages, ...bandImages].map((image, imageIndex) => (
                  <article
                    key={`${section.id}-${image.id}-${imageIndex}`}
                    className="relative h-[16rem] w-[14rem] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-stone-950 md:h-[20rem] md:w-[18rem]"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 224px, 288px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-xs uppercase tracking-[0.28em] text-white/65">
                        Atelier
                      </p>
                      <p className="mt-2 text-sm font-medium leading-tight">
                        {image.alt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <section className="rounded-[2rem] border border-border/60 bg-card/20 px-6 py-8 text-center md:px-10 md:py-12">
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          En voir plus
        </p>
        <h2 className="mt-3 text-3xl font-light tracking-tight text-foreground md:text-4xl">
          Les pieces terminées, vues autrement
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          La galerie rassemble les familles de couteaux, tandis que l&apos;atelier
          montre le rythme, les matieres et la repetition du geste.
        </p>
        <TransitionLink
          href="/galerie"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Ouvrir la galerie
        </TransitionLink>
      </section>
    </div>
  )
}
