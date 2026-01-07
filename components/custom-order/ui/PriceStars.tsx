import { Star } from 'lucide-react'

interface PriceStarsProps {
  level?: number
}

export function PriceStars({ level }: PriceStarsProps) {
  const value = Math.min(level ?? 0, 5)
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < value ? 'text-primary fill-primary/30' : 'text-muted-foreground/50'
          }`}
        />
      ))}
    </div>
  )
}
