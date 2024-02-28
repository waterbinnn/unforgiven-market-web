'use server';
import { authOptions } from '@/lib';
import { orderManage } from '@/service';
import { OrderRequest } from '@/types';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const getOrderList = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.token.toString();

  if (token) {
    try {
      const { results } = await orderManage.getList(token);
      return {
        list: results,
      };
    } catch (err) {
      return {
        list: [],
      };
    }
  } else {
    redirect('/');
  }
};

const postOrder = async (data: OrderRequest) => {
  const session = await getServerSession(authOptions);
  const token = session?.token.toString();

  if (token) {
    try {
      const res = await orderManage.postOrder(token, data);
      revalidatePath('/order');
      return {
        res,
        success: true,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  } else {
    throw new Error('invalid token');
  }
};

export { getOrderList, postOrder };
