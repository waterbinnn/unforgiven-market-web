import { ProductListType } from '@/types';
import { create } from 'zustand';

import { persist } from 'zustand/middleware';

type CartDetailType = {
  count?: number;
} & ProductListType;

interface CartStore {
  cartDetail: CartDetailType[] | null;
  setCartDetail: (cartDetail: CartDetailType[]) => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      cartDetail: [],
      setCartDetail: (cartDetail) =>
        set((state) => ({
          ...state,
          cartDetail,
        })),
    }),
    {
      name: 'cartStore',
    },
  ),
);
