import type { SiteNotice } from '@/lib/sanity/types'

type SiteNoticeBannerProps = {
  notice: SiteNotice
  className?: string
}

export function SiteNoticeBanner({ notice, className = '' }: SiteNoticeBannerProps) {
  return (
    <div
      className={`rounded-sm border border-amber-400/35 bg-amber-50/80 px-5 py-4 text-left text-amber-950 shadow-sm backdrop-blur-sm dark:border-amber-300/20 dark:bg-amber-950/30 dark:text-amber-50 ${className}`.trim()}
    >
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-amber-800/80 dark:text-amber-100/70">
        Information atelier
      </p>
      <h2 className="mt-2 font-serif text-2xl font-light tracking-tight">
        {notice.title || 'Information atelier'}
      </h2>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-amber-900/90 dark:text-amber-50/85 md:text-base">
        {notice.message}
      </p>
    </div>
  )
}
