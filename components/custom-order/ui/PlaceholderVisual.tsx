interface PlaceholderVisualProps {
  label?: string
}

export function PlaceholderVisual({ label }: PlaceholderVisualProps) {
  return (
    <div className="rounded-md border border-dashed border-border/60 bg-muted/30 h-28 w-full flex items-center justify-center text-[10px] uppercase tracking-wide text-muted-foreground">
      {label ?? 'Visuel à venir'}
    </div>
  )
}
