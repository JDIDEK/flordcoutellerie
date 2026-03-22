import { Mail } from 'lucide-react'
import Link from 'next/link'

export function ContactHelp() {
  return (
    <Link
      href="/contact"
      className="inline-flex items-center gap-2 text-xs text-primary underline underline-offset-2 hover:opacity-80"
    >
      <Mail className="h-3 w-3" />
      Besoin d'aide ? Contactez-moi
    </Link>
  )
}
