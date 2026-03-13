export default function AtelierLoading() {
  return (
    <main className="min-h-screen flex flex-col justify-center bg-background pb-20 pt-32 text-foreground font-body">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-24 h-14 w-64 animate-pulse rounded-full bg-card/70" />

          <section className="mb-20">
            <div className="space-y-3">
              <div className="h-4 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-card/50" />
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-10 h-10 w-48 animate-pulse rounded-full bg-card/70" />
            <div className="space-y-3">
              <div className="h-4 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 w-2/3 animate-pulse rounded-full bg-card/50" />
            </div>
          </section>

          <section>
            <div className="mb-10 h-10 w-40 animate-pulse rounded-full bg-card/70" />
            <div className="space-y-3">
              <div className="h-4 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 animate-pulse rounded-full bg-card/50" />
              <div className="h-4 w-3/4 animate-pulse rounded-full bg-card/50" />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
