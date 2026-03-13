import Image from 'next/image'

type WorkshopRailImage = {
  id: string
  src: string
  alt: string
}

type WorkshopSideRailsProps = {
  leftImages: WorkshopRailImage[]
  rightImages: WorkshopRailImage[]
}

function repeatImages(images: WorkshopRailImage[]) {
  if (images.length === 0) return []

  const repeated: WorkshopRailImage[] = []
  while (repeated.length < 10) {
    repeated.push(...images)
  }

  return repeated.slice(0, 10)
}

function RailColumn({
  images,
  reverse = false,
  position,
}: {
  images: WorkshopRailImage[]
  reverse?: boolean
  position: 'left' | 'right'
}) {
  const repeatedImages = repeatImages(images)

  return (
    <div 
      className={`fixed top-0 bottom-0 w-[20vw] min-w-[120px] max-w-[260px] overflow-hidden -z-10 opacity-20 pointer-events-none ${
        position === 'left' ? 'left-0 -translate-x-4 md:translate-x-0' : 'right-0 translate-x-4 md:translate-x-0'
      }`}
    >
      {/* On ajoute un masque de dégradé en haut et en bas pour fondre les images dans le décor */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div
        className="workshop-marquee-vertical flex w-full flex-col gap-6 py-4"
        style={{
          animationDuration: '35s', // Ralenti un peu pour l'effet "fond"
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {[...repeatedImages, ...repeatedImages].map((image, index) => (
          <article
            key={`${image.id}-${index}`}
            className="relative h-64 w-full overflow-hidden rounded-3xl border border-muted/20 grayscale transition-all duration-700 md:grayscale-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 150px, 260px"
              className="object-cover"
            />
          </article>
        ))}
      </div>
    </div>
  )
}

export function WorkshopSideRails({
  leftImages,
  rightImages,
}: WorkshopSideRailsProps) {
  if (leftImages.length === 0 && rightImages.length === 0) {
    return null
  }

  return (
    <>
      <div className="hidden sm:block">
        <RailColumn images={leftImages} position="left" />
      </div>
      <div className="hidden sm:block">
        <RailColumn images={rightImages} position="right" reverse />
      </div>
    </>
  )
}