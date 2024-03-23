'use client';

import { authManage } from '@/service';

const checkIdValidation = async (username: string) => {
  try {
    const res = await authManage.checkIdValid(username);

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      data: err,
      success: false,
    };
  }
};

const checkCompanyNumber = async (companyNumber: string) => {
  try {
    const res = await authManage.checkCompanyNumberValid(companyNumber);

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.log(err);
    return {
      data: err,
      success: false,
    };
  }
};

export { checkIdValidation, checkCompanyNumber };
