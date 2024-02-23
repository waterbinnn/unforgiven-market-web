'use server';

import { authOptions } from '@/lib/auth';
import { cartManage } from '@/service';
import { PostCart, UpdateCartQuantity } from '@/types/cartTypes';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

const getCartList = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.token.toString();

  if (token) {
    try {
      const res = await cartManage.getList(token);
      revalidatePath('/cart');

      return {
        data: res,
      };
    } catch (err) {
      console.log(err);
      return {
        data: null,
      };
    }
  } else {
    return {
      data: null,
    };
  }
};

const postCart = async (data: PostCart) => {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  if (token) {
    try {
      const res = await cartManage.postCart(token!, data);
      revalidatePath('/cart');
      return {
        res,
      };
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('token error');
  }
};

const removeItem = async (id: string) => {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  if (token) {
    try {
      await cartManage.removeItem(token, id);
      revalidatePath('/cart');
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('token error');
  }
};

const removeCart = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  if (token) {
    try {
      await cartManage.removeCart(token!);
      revalidatePath('/cart');
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('token error');
  }
};

const updateCount = async (cartId: number, data: UpdateCartQuantity) => {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  if (token) {
    try {
      await cartManage.updateCount(token!, cartId, data);
      revalidatePath('/cart');
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('token error');
  }
};

export { getCartList, postCart, removeCart, removeItem, updateCount };
