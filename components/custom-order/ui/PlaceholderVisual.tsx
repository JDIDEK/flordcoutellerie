import { cn } from '@/lib/utils'

interface PlaceholderVisualProps {
  label?: string
  className?: string
}

export function PlaceholderVisual({
  label,
  className,
}: PlaceholderVisualProps) {
  return (
    <div
      className={cn(
        'flex h-28 w-full items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/30 text-[10px] uppercase tracking-wide text-muted-foreground',
        className
      )}
    >
      {label ?? 'Visuel à venir'}
    </div>
  )
}
