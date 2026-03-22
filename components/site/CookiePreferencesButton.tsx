'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import { openCookiePreferences } from './CookieBanner'

type CookiePreferencesButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function CookiePreferencesButton({
  children = 'Gerer mes cookies',
  type = 'button',
  onClick,
  ...props
}: CookiePreferencesButtonProps) {
  return (
    <Button
      type={type}
      onClick={(event) => {
        onClick?.(event)

        if (!event.defaultPrevented) {
          openCookiePreferences()
        }
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
