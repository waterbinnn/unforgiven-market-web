// store.ts
import { cartManage, productManage } from '@/service';
import { CartItemType } from '@/types/cartManage';
import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
  detail: CartItemType;
}

interface State {
  cartItems: any[];
  setCartItems: (items: CartItem[]) => void;
  fetchCartDetail: (token: string) => Promise<void>;
}

export const useCartStore = create<State>((set, get) => ({
  cartItems: [],
  setCartItems: (items) => set({ cartItems: items }),
  fetchCartDetail: async (token) => {
    const data = await cartManage.getList(token);
    const details = await Promise.all(
      data.results.map(async (item) => {
        const detail = await productManage.getProductDetail(item.product_id.toString());
        return { ...item, detail };
      }),
    );
    set({ cartItems: details });
  },
}));
