export default function PiecesLoading() {
  return (
    <main className="min-h-screen bg-background pb-16 pt-24 md:pb-20 md:pt-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto mb-12 h-10 w-48 animate-pulse rounded-full bg-card/60 md:mb-24 md:h-14" />

        <div className="grid grid-cols-2 gap-4 md:gap-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <article key={index} className="space-y-3">
              <div className="aspect-[4/5] animate-pulse rounded-lg bg-card/70" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-card/60" />
              <div className="h-4 w-1/3 animate-pulse rounded-full bg-card/50" />
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
