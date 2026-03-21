export default function GalerieCategoryLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="sticky top-0 z-30 px-6 pt-28 pb-8 md:pt-32 md:pb-10 bg-background border-b border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="h-3 w-20 mb-6 animate-pulse rounded-full bg-card/50" />
          <div className="h-4 w-16 mb-2 animate-pulse rounded-full bg-card/40" />
          <div className="h-12 w-48 animate-pulse rounded-full bg-card/70" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-96 animate-pulse rounded-full bg-card/40" />
            <div className="h-3 w-72 animate-pulse rounded-full bg-card/40" />
          </div>
        </div>
      </div>

      {/* Images skeleton */}
      <div className="container mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-20 space-y-3 md:space-y-4">
        {/* Row 1 : 3 colonnes */}
        <div className="grid grid-cols-[1.6fr_1fr] gap-3 md:gap-4">
          <div className="aspect-[4/5] animate-pulse rounded-sm bg-card/70" />
          <div className="grid grid-rows-2 gap-3 md:gap-4">
            <div className="aspect-square animate-pulse rounded-sm bg-card/60" />
            <div className="aspect-square animate-pulse rounded-sm bg-card/60" />
          </div>
        </div>

        {/* Row 2 : 2 colonnes */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="aspect-[3/4] animate-pulse rounded-sm bg-card/60" />
          <div className="aspect-[3/4] animate-pulse rounded-sm bg-card/50" />
        </div>

        {/* Row 3 : pleine largeur */}
        <div className="aspect-[21/9] animate-pulse rounded-sm bg-card/70" />
      </div>
    </main>
  )
}