type PaymentType = 'CARD' | 'DEPOSIT' | 'PHONE_PAYMENT' | 'NAVERPAY' | 'KAKAOPAY';

type OrderKind =
  | 'direct_order' //디테일 페이지에서 주문
  | 'cart_order' //카트에서 주문
  | 'cart_one_order'; //카트에서 하나 선택 주문 ;
interface OrderListData {
  count: number;
  next: null;
  previous: null;
  results: {
    buyer: number; // 구매자(로그인 된 유저)
    order_number: number; // 주문번호
    order_items: [
      // 구매 상품들
      number,
      number,
    ];
    order_quantity: [
      // 구매 상품들의 수량
      number,
      number,
    ];
    receiver: String; // 받는사람
    receiver_phone_number: String; // 받는사람의 핸드폰번호
    address: String; // 주소
    address_message: String; // 배송메세지
    payment_method: String; // 배송방법
    total_price: number; // 결제금액
    delivery_status: string;
    created_at: string;
  }[];
}

interface OrderCommonData {
  receiver: String;
  receiver_phone_number: String;
  address: String;
  address_message: String;
  payment_method: PaymentType;
  total_price: number;
}

interface OneOrderRequest extends OrderCommonData {
  product_id: number;
  quantity: number;
  order_kind: OrderKind;
}

interface CartOrderRequest extends OrderCommonData {
  order_kind: OrderKind;
}

interface OrderResult extends OrderCommonData {
  buyer: number;
  order_number: number;
  order_items: [number, number];
  order_quantity: [number, number];
  delivery_status: String;
}

export type {
  PaymentType,
  OrderKind,
  OneOrderRequest,
  CartOrderRequest,
  OrderResult,
  OrderListData,
};
