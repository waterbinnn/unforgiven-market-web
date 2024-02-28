import { OrderKind, ProductListType } from '@/types';
import { create } from 'zustand';

import { persist } from 'zustand/middleware';

// 초기화 할 때 : const clearStore = useOrderStore.persist.clearStorage

type OrderDetailType = {
  count?: number;
} & ProductListType;

interface OrderStore {
  orderKind: OrderKind | null;
  setOrderKind: (orderKind: OrderKind) => void;
  orderDetail: OrderDetailType[] | null;
  setOrderDetail: (orderDetail: OrderDetailType[]) => void;
}

export const useOrderStore = create(
  persist<OrderStore>(
    (set) => ({
      orderDetail: [],
      setOrderDetail: (orderDetail) => set((state) => ({ ...state, orderDetail })),

      orderKind: null,
      setOrderKind: (orderKind) =>
        set(() => ({
          orderKind,
        })),
    }),
    {
      name: 'orderStore',
    },
  ),
);

export type { OrderDetailType };
