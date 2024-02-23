'use server';

import { authOptions } from '@/lib/auth';
import { cartManage } from '@/service';
import { PostCart, UpdateCartQuantity } from '@/types/cartTypes';
import { getServerSession } from 'next-auth';

const getCartList = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.token.toString();

  if (token) {
    try {
      const res = await cartManage.getList(token);

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
      await cartManage.postCart(token!, data);
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
      const res = await cartManage.updateCount(token!, cartId, data);
      return {
        msg: res.FAIL_message,
      };
    } catch (err) {
      console.log(err);
      return {
        msg: 'fail',
      };
    }
  } else {
    console.log('error');
  }
};

export { getCartList, postCart, removeCart, removeItem, updateCount };
