'use client';

import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import { OrderDetail } from '../OrderDetail';
import { Button, Checkbox, RadioButton, ShippingForm } from '@/components';
import { useState } from 'react';
import { paymentsOptions } from '../contents';
import { PaymentType } from '@/types';

const cx = classNames.bind(styles);

export const Order = () => {
  const [payment, setPayment] = useState<PaymentType | string>('CARD');
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const handlePaymentRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.id);
  };

  return (
    <div className={cx('container')}>
      <h1 className={cx('page-title')}>ORDER</h1>
      <div className={cx('order-container')}>
        <section className={cx('table-container')}>
          <h2 className={cx('visually-hidden')}>order list</h2>
          <table>
            <thead className={cx('table-header')}>
              <tr>
                <th scope="col">ITEM</th>
                <th scope="col">DISCOUNT</th>
                <th scope="col">DELIVERY</th>
                <th scope="col">PRICE</th>
              </tr>
            </thead>
            <tbody>
              <OrderDetail />
              <OrderDetail />
            </tbody>
          </table>
        </section>

        {/* 배송정보  */}
        <section className={cx('info-layout')}>
          <h2 className={cx('title')}>배송 정보</h2>
          <div className={cx('shipping-form-wrap')}>
            <ShippingForm type="buyer" />
            <ShippingForm type="shipping" />
          </div>
        </section>

        {/* 결제수단  */}
        <section className={cx('info-layout')}>
          <h2 className={cx('title')}>결제 수단</h2>
          <div className={cx('pay-radio-wrap')}>
            {paymentsOptions.map((method, index) => (
              <RadioButton
                checked={method.value === payment}
                key={index}
                label={method.label}
                id={method.value}
                onChange={handlePaymentRadio}
                name={'payment'}
              />
            ))}
          </div>
        </section>

        <section className={cx('info-layout')}>
          <h2 className={cx('title')}>최종결제 정보</h2>

          <dl className={cx('receipt-container')}>
            <div className={cx('top')}>
              <ReceiptLayout title={'상품금액'} content="1000" />
              <ReceiptLayout title={'할인금액'} content="1000" />
              <ReceiptLayout title={'배송비'} content="1000" />
            </div>
            <ReceiptLayout title={'결제금액'} classNames={'total'} content="1000" />
            <div className={cx('agree-wrap')}>
              <Checkbox
                colorType={'white'}
                isChecked={isAgree}
                onClick={() => setIsAgree(!isAgree)}
              />
              <span className={cx('label')} onClick={() => setIsAgree(!isAgree)}>
                주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
              </span>
            </div>
          </dl>
        </section>

        <Button size="l" color="yellow">
          ORDER
        </Button>
      </div>
    </div>
  );
};

const ReceiptLayout = ({
  title,
  content,
  classNames,
}: {
  title: string;
  content: string;
  classNames?: string;
}) => {
  return (
    <div className={cx('receipt-layout-wrap')}>
      <dt className={cx('title')}>{title}</dt>
      <dd className={cx('content', classNames)}>￦ {content}</dd>
    </div>
  );
};
