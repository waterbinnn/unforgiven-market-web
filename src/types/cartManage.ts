interface CommonCartType {
  product_id: number; // 상품 아이디
  quantity: number; // 장바구니에 담긴 상품의 개수
}

interface CartResult {
  my_cart: number; // 카트 고유번호, User가 바뀌지 않는이상 번호가 바뀌지 않음
  cart_item_id: number; // cartItem의 고유번호, 요청시마다 번호가 바뀜
  product_id: number; // 상품 아이디
  quantity: number; // 장바구니에 담긴 상품의 개수
}

//장바구니 목록 조회시 res type
interface CartList {
  count: number;
  next: String;
  previous: String;
  results: CartResult[];
}

// 장바구니 추가시 body type
interface PostCart extends CommonCartType {
  check: boolean; //이미 있는 제품인지 여부 true 시 장바구니 추가 가능
}

// 장바구니 수량 수정시 body type
interface EditCartQuantity extends CommonCartType {
  is_active: boolean; // 장바구니 내 상품 활성화 버튼, 같이 보내지 않으면 False
}

//product id 로 장바구니 데이터를 채워야 함

export type { CartList, CartResult, PostCart, EditCartQuantity };
