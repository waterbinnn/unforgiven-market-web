import { BuyerSignupReq, SignInReq } from '@/types';
import axios, { AxiosPromise } from 'axios';
import { axiosAuth } from './axiosServer';

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

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const header = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const authManage: AuthManage = {
  buyerSignup: (data: BuyerSignupReq) => {
    return axios.post(`${baseUrl}accounts/signup/`, data, header);
  },

  sellerSignup: (data: BuyerSignupReq) => {
    return axios.post(`${baseUrl}accounts/signup_seller/`, data, header);
  },

  checkIdValid: (username: string) => {
    return axios.post(`${baseUrl}accounts/signup/valid/username/`, { username }, header);
  },

  checkCompanyNumberValid: (company_registration_number: string) => {
    return axios.post(
      `${baseUrl}accounts/signup/valid/company_registration_number/`,
      { company_registration_number },
      header,
    );
  },

  signIn: (data: SignInReq) => {
    return axiosAuth.post(`accounts/login/`, data);
  },
};

export { authManage };
