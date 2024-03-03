'use server';

import { productManage } from '@/service';
import { revalidatePath } from 'next/cache';

const getProductList = async (page: number) => {
  try {
    const res = await productManage.getProductList(page);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getProductDetail = async (id: string) => {
  try {
    const res = await productManage.getProductDetail(id);
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

export { getProductList, getProductDetail };
