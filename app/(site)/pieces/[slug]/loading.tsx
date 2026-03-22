export default function PieceDetailLoading() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="h-4 w-32 animate-pulse rounded-full bg-card/60" />

          <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="aspect-square animate-pulse rounded-xl bg-card/70" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-16 w-16 animate-pulse rounded-md bg-card/60"
                  />
                ))}
              </div>
            </div>

            <section className="space-y-6">
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded-full bg-card/50" />
                <div className="h-10 w-3/4 animate-pulse rounded-full bg-card/70" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-card/50" />
              </div>

              <div className="h-8 w-32 animate-pulse rounded-full bg-card/70" />

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-10 animate-pulse rounded-md bg-card/60" />
                <div className="h-10 animate-pulse rounded-md bg-card/50" />
              </div>

              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-11 animate-pulse rounded-md bg-card/50"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
