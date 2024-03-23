'use client';

import { authManage } from '@/service';
import { BuyerSignupReq } from '@/types';

const buyerSignup = async (formData: BuyerSignupReq) => {
  try {
    const res = await authManage.buyerSignup(formData);
    return {
      success: true,
      res: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      res: err,
    };
  }
};

const sellerSignup = async (formData: BuyerSignupReq) => {
  try {
    const res = await authManage.sellerSignup(formData);
    return {
      success: true,
      res: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      res: err,
    };
  }
};

export { buyerSignup, sellerSignup };
