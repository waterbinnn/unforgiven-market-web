// <--- signup --->
interface BuyerSignupReq {
  //구매자 회원가입 request
  username: string; // 아이디
  password: string;
  password2: string;
  phone_number: string; // 전화번호는 010으로 시작하는 10~11자리 숫자
  name: string; //
}

interface BuyerSignupRes {
  //구매자 회원가입 response
  name: string;
  phone_number: string;
  type: string;
  username: string;
}

interface SellerSignupReq extends BuyerSignupReq {
  //판매자 회원가입 request
  company_registration_number: string;
  store_name: string;
}

interface SellerSignupRes extends BuyerSignupRes {
  //판매자 회원가입 response
  company_registration_number: string;
  store_name: string;
}

// <--- signIn --->
interface SignInReq {
  username: string;
  password: string;
  login_type: 'BUYER' | 'SELLER'; // BUYER : 일반 구매자, SELLER : 판매자
}
interface SignInRes {
  id: number;
  token: string;
  user_type: 'BUYER' | 'SELLER';
}
export type {
  BuyerSignupReq,
  BuyerSignupRes,
  SellerSignupReq,
  SellerSignupRes,
  SignInReq,
  SignInRes,
};
