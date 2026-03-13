export default function AtelierLoading() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-32">
      <div className="container mx-auto px-6">
        <div className="xl:grid xl:grid-cols-[220px_minmax(0,1fr)_220px] xl:gap-10">
          <div className="hidden xl:block">
            <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-hidden space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-52 animate-pulse rounded-[1.75rem] bg-card/70"
                />
              ))}
            </div>
          </div>

          <div className="text-justify">
            <div className="mx-auto mb-24 h-14 w-64 animate-pulse rounded-full bg-card/70" />

            <section className="mx-auto mb-20 max-w-2xl">
              <div className="space-y-3">
                <div className="h-4 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-card/50" />
              </div>
            </section>

            <section className="mx-auto mb-20 max-w-2xl">
              <div className="mb-10 h-10 w-48 animate-pulse rounded-full bg-card/70" />
              <div className="space-y-3">
                <div className="h-4 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-card/50" />
              </div>
            </section>

            <section className="mx-auto max-w-2xl">
              <div className="mb-10 h-10 w-40 animate-pulse rounded-full bg-card/70" />
              <div className="space-y-3">
                <div className="h-4 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 animate-pulse rounded-full bg-card/50" />
                <div className="h-4 w-3/4 animate-pulse rounded-full bg-card/50" />
              </div>
            </section>
          </div>

          <div className="hidden xl:block">
            <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-hidden space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-52 animate-pulse rounded-[1.75rem] bg-card/70"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
