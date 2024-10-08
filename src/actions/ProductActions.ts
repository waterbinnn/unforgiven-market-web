'use server';

import { productManage } from '@/service';
import { dashboardManage } from '@/service/dashboardManage';
import { revalidatePath } from 'next/cache';

const getProductList = async (page?: number) => {
  try {
    const res = await productManage.getProductList(page);
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};

const getProductDetail = async (id: string) => {
  try {
    const res = await productManage.getProductDetail(id);
    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      data: null,
    };
  }
};

const deleteProduct = async (id: number) => {
  try {
    await productManage.deleteProduct(id);
    revalidatePath('/seller/dashboard');
    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

const getSellerProducts = async (page?: string) => {
  try {
    const res = await dashboardManage.getList(page);
    return {
      data: res.data,
      list: res.data.results,
      success: true,
    };
  } catch (err) {
    return {
      data: [],
      list: [],
      success: false,
    };
  }
};

export { getProductList, getProductDetail, deleteProduct, getSellerProducts };
