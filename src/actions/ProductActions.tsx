'use server';

import { productManage } from '@/service';

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

export { getProductDetail };
