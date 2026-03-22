export default function GalerieLoading() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 md:px-10">
      <div className="space-y-8">
        <div className="h-6 w-40 animate-pulse rounded-full bg-card/50" />
        <div className="h-16 w-72 animate-pulse rounded-full bg-card/70" />
      </div>

      <div className="mt-16 flex gap-6 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[60vh] w-[70vw] shrink-0 animate-pulse rounded-[2rem] bg-card/70 md:w-[38vw]"
          />
        ))}
      </div>
    </main>
  )
}
