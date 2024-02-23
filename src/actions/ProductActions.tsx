'use server';

import { productManage } from '@/service';
import { revalidatePath } from 'next/cache';

const getProductDetail = async (id: string) => {
  try {
    const res = await productManage.getProductDetail(id);
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
};

export { getProductDetail };
