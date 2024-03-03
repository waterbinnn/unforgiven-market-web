import { PaymentType } from '@/types/orderTypes';

const paymentsOptions: { label: string; value: PaymentType }[] = [
  {
    label: '신용/체크카드',
    value: 'CARD',
  },
  {
    label: '무통장 입금',
    value: 'DEPOSIT',
  },
  {
    label: '휴대폰 결제',
    value: 'PHONE_PAYMENT',
  },
  {
    label: '네이버페이',
    value: 'NAVERPAY',
  },
  {
    label: '카카오페이',
    value: 'KAKAOPAY',
  },
];

export { paymentsOptions };
