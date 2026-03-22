import { Star } from 'lucide-react'

interface MetricLineProps {
  label: string
  value: number
}

export function MetricLine({ label, value }: MetricLineProps) {
  return (
    <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground gap-2">
      <span className="shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={`h-2.5 w-2.5 md:h-3 md:w-3 ${
              index < Math.min(value, 5) ? 'text-primary fill-primary/30' : 'text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
