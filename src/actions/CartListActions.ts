'use server';

import { cartManage } from '@/service';
import { PostCart, UpdateCartQuantity } from '@/types/cartTypes';
import { revalidatePath } from 'next/cache';

const getCartList = async () => {
  try {
    const res = await cartManage.getList();
    revalidatePath('/cart');

    return {
      data: res.data,
    };
  } catch (err) {
    return {
      data: null,
    };
  }
};

const postCart = async (data: PostCart) => {
  try {
    const res = await cartManage.postCart(data);
    revalidatePath('/cart');
    return {
      data: res.data,
    };
  } catch (err) {
    console.log(err);
  }
};

const removeItem = async (id: string) => {
  try {
    await cartManage.removeItem(id);
    revalidatePath('/cart');
  } catch (err) {
    console.log(err);
  }
};

const removeCart = async () => {
  try {
    await cartManage.removeCart();
    revalidatePath('/cart');
  } catch (err) {
    console.log(err);
  }
};

const updateCount = async (cartId: number, data: UpdateCartQuantity) => {
  try {
    await cartManage.updateCount(cartId, data);
    revalidatePath('/cart');
  } catch (err) {
    console.log(err);
  }
};

export { getCartList, postCart, removeCart, removeItem, updateCount };
