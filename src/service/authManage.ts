import { BuyerSignupReq, BuyerSignupRes, SellerSignupRes, SignInReq } from '@/types';

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
   * @return {BuyerSignupRes}
   **/
  readonly buyerSignup: (data: BuyerSignupReq) => Promise<BuyerSignupRes>;

  /**
   * @description 구매자 회원가입
   * @name authManage.buyerSignup
   * @method {POST}
   * @param {SellerSignupReq}
   * @return {SellerSignupRes}
   **/
  readonly sellerSignup: (data: BuyerSignupReq) => Promise<SellerSignupRes>;

  /**
   * @description 구매자 회원가입 ID 중복 검사
   * @name authManage.checkIdValid
   * @method {POST}
   * @param {string}
   * @return {Promise}
   **/
  readonly checkIdValid: (username: string) => Promise<any>;

  /**
   * @description 판매자 사업자등록번호 중복 검사
   * @name authManage.checkCompanyNumberValid
   * @method {POST}
   * @param {string}
   * @return {Promise}
   **/
  readonly checkCompanyNumberValid: (company_registration_number: string) => Promise<any>;

  //signIn

  /**
   * @description 구매자 로그인
   * @name authManage.signIn
   * @method {POST}
   * @param {SignInReq}
   * @return {Promise}
   **/
  readonly signIn: (data: any) => Promise<any>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const authManage: AuthManage = {
  buyerSignup: async (data: BuyerSignupReq) => {
    const res = await fetch(`${baseUrl}accounts/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  sellerSignup: async (data: BuyerSignupReq) => {
    const res = await fetch(`${baseUrl}accounts/signup_seller/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  checkIdValid: async (username: string) => {
    const res = await fetch(`${baseUrl}accounts/signup/valid/username/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username }),
    });
    return res.json();
  },
  checkCompanyNumberValid: async (company_registration_number: string) => {
    const res = await fetch(`${baseUrl}accounts/signup/valid/company_registration_number/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_registration_number: company_registration_number,
      }),
    });
    return res.json();
  },
  signIn: async (data: SignInReq) => {
    const res = await fetch(`${baseUrl}accounts/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

export { authManage };
