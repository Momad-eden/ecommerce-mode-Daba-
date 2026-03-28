import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant, CartItem } from '@/types/product';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant | null, quantity: number) => void;
  removeItem: (productId: number, variantId?: number) => void;
  updateQuantity: (productId: number, quantity: number, variantId?: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, quantity) => {
        const currentItems = get().items;
        const variantId = variant?.id;
        
        // Vérifier si l'article existe déjà
        const existingIndex = currentItems.findIndex(
          item => item.product.id === product.id && item.variant?.id === variantId
        );

        let updatedItems;
        if (existingIndex !== -1) {
          // Mettre à jour la quantité
          updatedItems = [...currentItems];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            quantity: updatedItems[existingIndex].quantity + quantity
          };
        } else {
          // Ajouter un nouvel article
          updatedItems = [...currentItems, { product, variant: variant || null, quantity }];
        }
        
        set({ items: updatedItems });
      },

      removeItem: (productId, variantId) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && item.variant?.id === variantId)
          )
        });
      },

      updateQuantity: (productId, quantity, variantId) => {
        set({
          items: get().items.map(item =>
            item.product.id === productId && item.variant?.id === variantId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        // Protection côté serveur pour éviter l'hydratation mismatch
        if (typeof window === 'undefined') return 0;
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        // Protection côté serveur pour éviter l'hydratation mismatch
        if (typeof window === 'undefined') return 0;
        return get().items.reduce((total, item) => {
          const price = item.variant?.price || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);