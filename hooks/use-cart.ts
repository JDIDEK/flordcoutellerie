'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  id: string
  name: string
  price?: number
  quantity: number
  image?: string
  slug?: string
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  clear: () => void
  setQuantity: (id: string, quantity: number) => void
  isInCart: (id: string) => boolean
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Pièces uniques : on ne peut en ajouter qu'une seule
          const existing = state.items.find((cartItem) => cartItem.id === item.id)

          if (existing) {
            // L'article est déjà dans le panier, on ne l'ajoute pas
            return state
          }

          return { items: [...state.items, { ...item, quantity: 1 }] }
        }),
      isInCart: (id: string) => get().items.some((item) => item.id === id),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ items: state.items }),
    }
  )
)
