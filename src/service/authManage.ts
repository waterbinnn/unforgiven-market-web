import { BuyerSignupReq, SignInReq } from '@/types';
import { AxiosPromise } from 'axios';
import { axiosAuth } from './axiosServer';
import { axiosClient } from './axiosClient';

/**
 * @name authManage
 * @description 로그인, 회원가입 api set 입니다.
 */

interface AuthManage {
  /**
   * @description 구매자 회원가입
   * @name authManage.buyerSignup
   * @method {POST}
   * @param {BuyerSignupReq}
   * @return {AxiosPromise<BuyerSignupRes>}
   **/
  readonly buyerSignup: (data: BuyerSignupReq) => AxiosPromise;

  /**
   * @description 구매자 회원가입
   * @name authManage.buyerSignup
   * @method {POST}
   * @param {SellerSignupReq}
   * @return {AxiosPromise<SellerSignupRes>}
   **/
  readonly sellerSignup: (data: BuyerSignupReq) => AxiosPromise;

  /**
   * @description 구매자 회원가입 ID 중복 검사
   * @name authManage.checkIdValid
   * @method {POST}
   * @param {string}
   * @return {AxiosPromise}
   **/
  readonly checkIdValid: (username: string) => AxiosPromise;

  /**
   * @description 판매자 사업자등록번호 중복 검사
   * @name authManage.checkCompanyNumberValid
   * @method {POST}
   * @param {string}
   * @return {AxiosPromise}
   **/
  readonly checkCompanyNumberValid: (company_registration_number: string) => AxiosPromise;

  //signIn

  /**
   * @description 구매자 로그인
   * @name authManage.signIn
   * @method {POST}
   * @param {SignInReq}
   * @return {AxiosPromise}
   **/
  readonly signIn: (data: any) => AxiosPromise;
}

const authManage: AuthManage = {
  buyerSignup: (data: BuyerSignupReq) => {
    return axiosClient.post(`accounts/signup/`, data);
  },

  sellerSignup: (data: BuyerSignupReq) => {
    return axiosClient.post(`accounts/signup_seller/`, data);
  },

  checkIdValid: (username: string) => {
    return axiosClient.post(`accounts/signup/valid/username/`, { username });
  },

  checkCompanyNumberValid: (company_registration_number: string) => {
    return axiosClient.post(`accounts/signup/valid/company_registration_number/`, {
      company_registration_number,
    });
  },

  signIn: (data: SignInReq) => {
    return axiosAuth.post(`accounts/login/`, data);
  },
};

export { authManage };
