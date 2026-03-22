import { cn } from '@/lib/utils'

export const optionCardContentClassName =
  'flex min-w-0 flex-1 flex-col justify-center px-4 py-3'

export const optionCardVisualClassName =
  'flex h-full w-28 shrink-0 items-stretch bg-muted/30'

export function getOptionCardClassName(
  isSelected: boolean,
  className?: string
) {
  return cn(
    'h-[112px] overflow-hidden border-2 cursor-pointer transition-all md:h-[116px]',
    isSelected
      ? 'border-primary bg-primary/5'
      : 'border-foreground/20 hover:border-foreground/40',
    className
  )
}
