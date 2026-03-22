'use client'

import { useId, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AlertTriangle, Loader2, X } from 'lucide-react'

import { TransitionLink } from '@/components/site/TransitionLink'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type CheckoutConsentDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void | Promise<void>
  isLoading?: boolean
  error?: string | null
  itemCount: number
}

export function CheckoutConsentDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  error,
  itemCount,
}: CheckoutConsentDialogProps) {
  const majorityId = useId()
  const cgvId = useId()
  const [isMajor, setIsMajor] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const canConfirm = isMajor && acceptedTerms && !isLoading

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsMajor(false)
      setAcceptedTerms(false)
    }

    onOpenChange(nextOpen)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-[60] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2',
            'rounded-2xl border border-border/70 bg-background p-6 shadow-2xl outline-none',
            'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0',
            'data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
          )}
        >
          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Dialog.Close>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Verification avant paiement
              </p>
              <Dialog.Title className="max-w-lg text-2xl font-light tracking-tight text-foreground">
                Confirmez votre majorité et l&apos;acceptation des CGV
              </Dialog.Title>
              <Dialog.Description className="text-sm leading-relaxed text-muted-foreground">
                {itemCount > 1
                  ? `Vous allez lancer le paiement de ${itemCount} pieces uniques.`
                  : 'Vous allez lancer le paiement d’une piece unique.'}{' '}
                La vente est reservee aux personnes majeures et le transport hors du
                domicile est encadre par la loi.
              </Dialog.Description>
            </div>

            <div className="rounded-2xl border border-amber-200/60 bg-amber-50/70 p-4 text-sm text-amber-950">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Cette verification est requise avant la redirection vers Stripe. Elle
                  n&apos;est pas stockee, mais conditionne l&apos;acces au paiement.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <label
                htmlFor={majorityId}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/70 bg-card/30 p-4 text-sm text-foreground"
              >
                <input
                  id={majorityId}
                  type="checkbox"
                  checked={isMajor}
                  onChange={(event) => setIsMajor(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span>Je confirme etre majeur(e) et autorise(e) a acheter cette piece.</span>
              </label>

              <label
                htmlFor={cgvId}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border/70 bg-card/30 p-4 text-sm text-foreground"
              >
                <input
                  id={cgvId}
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border"
                />
                <span>
                  J&apos;ai lu et j&apos;accepte les{' '}
                  <TransitionLink
                    href="/cgv"
                    skipTransition
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4"
                  >
                    Conditions Generales de Vente
                  </TransitionLink>
                  .
                </span>
              </label>
            </div>

            {error && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Retour
              </Button>
              <Button type="button" onClick={onConfirm} disabled={!canConfirm}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  'Continuer vers Stripe'
                )}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
