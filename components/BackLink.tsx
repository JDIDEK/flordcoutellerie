'use client'

import { ArrowLeft } from 'lucide-react'
import { TransitionLink } from '@/components/TransitionLink'

interface BackLinkProps {
  href: string
  label: string
  className?: string
}

export function BackLink({ href, label, className }: BackLinkProps) {
  return (
    <TransitionLink
      href={href}
      className={className}
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </TransitionLink>
  )
}
