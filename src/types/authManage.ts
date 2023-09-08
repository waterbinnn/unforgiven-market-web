interface BuyerSignupReq {
  username: string; // 아이디
  password: string;
  password2: string;
  phone_number: string; // 전화번호는 010으로 시작하는 10~11자리 숫자
  name: string; //
}

interface BuyerSignupRes {
  name: string;
  phone_number: string;
  type: string;
  username: string;
}

interface SellerSignupReq extends BuyerSignupReq {
  company_registration_number: string;
  store_name: string;
}

interface SellerSignupRes extends BuyerSignupRes {
  company_registration_number: string;
  store_name: string;
}

export type {
  BuyerSignupReq,
  BuyerSignupRes,
  SellerSignupReq,
  SellerSignupRes,
};
