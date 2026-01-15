import { Suspense } from 'react'

import { Navigation } from '@/components/Navigation'
import { MerciContent } from '@/components/pages/MerciContent'

export default function MerciPage() {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <main className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-6 text-center">
              <p className="text-muted-foreground">Chargement...</p>
            </div>
          </main>
        }
      >
        <MerciContent />
      </Suspense>
    </>
  )
}
