import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  priceId: string;
  size: string;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      clearCart: () => set({ items: [] }),
      removeFromCart: (id) => set((state) => ({
      	items: state.items.filter((item) => item.id !== id),
      })),
    }),
    {
      name: 'cart-storage', // key in localStorage
    }
  )
);
