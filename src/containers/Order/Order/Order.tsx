'use client';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import { OrderDetail } from '../OrderDetail';
import { Checkbox, RadioButton, Input, Table, LoadingSpinner } from '@/components';
import { paymentsOptions } from '../contents';

import { CartOrderRequest, PaymentType } from '@/types';
import { useOrderStore } from '@/store';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { postOrder } from '@/actions';
import { message } from 'antd';
import { Button } from '@waterbin/design-system';

const cx = classNames.bind(styles);

export const Order = () => {
  const { orderDetail, orderKind } = useOrderStore();
  const [payment, setPayment] = useState<PaymentType>('CARD');
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [total, setTotal] = useState(0);
  const [isCSR, setIsCSR] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const handlePaymentRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(e.target.id as PaymentType);
  };

  useEffect(() => {
    setIsCSR(typeof window !== 'undefined');
    return () => setIsCSR(false);
  }, []);

  useEffect(() => {
    if (!orderDetail || orderDetail.length === 0) {
      return;
    }
    const price = orderDetail.map((item) => item.quantity! * item.price + item.shipping_fee);

    if (orderKind === 'cart_order') {
      setTotal(price.reduce((a, c) => a + c, 0));
    } else {
      setTotal(price[0]);
    }
  }, [orderKind]);

  const handleOrder = async (data: FieldValues) => {
    if (!isAgree) {
      message.warning('최종 결제 정보의 동의 항목을 체크해 주세요.');
    }
    if (isAgree) {
      const formData: CartOrderRequest = {
        receiver: data.receiver,
        receiver_phone_number: String(data.receiver_phone_number),
        address: data.address,
        address_message: data.address_message,
        payment_method: payment,
        total_price: total,
        order_kind: orderKind!,
      };

      if (orderKind === 'cart_order') {
        //카트의 모든 상품 주문시 동작
        const { success } = await postOrder(formData);
        if (success) {
          message.success('주문이 완료되었습니다.');
          router.push('/order/complete');
        } else {
          message.error('오류가 발생했습니다. 다시 시도해 주세요.');
        }
      } else {
        //상품 하나만 주문할 때 동작
        if (!orderDetail) {
          return;
        }
        const oneReq = {
          product_id: orderDetail[0].product_id,
          quantity: orderDetail[0].quantity,
        };
        const { success } = await postOrder({ ...formData, ...oneReq });
        if (success) {
          message.success('주문이 완료되었습니다.');

          router.push('/order/complete');
        } else {
          message.error('오류가 발생했습니다. 다시 시도해 주세요.');
        }
      }
    }
  };

  const handleFormCoincide = () => {
    const name = getValues('buyer');
    const phone = getValues('phone_number');
    setValue('receiver', name);
    setValue('receiver_phone_number', phone);
  };

  return isCSR ? (
    <div className={cx('container')}>
      <h1 className={cx('page-title')}>ORDER</h1>

      <div className={cx('order-container')}>
        {orderDetail ? (
          <Table thList={['ITEM', 'DISCOUNT', 'DELIVERY', 'PRICE']}>
            {orderDetail &&
              orderDetail.map((item) => <OrderDetail detail={item} key={item.product_id} />)}
          </Table>
        ) : (
          <LoadingSpinner />
        )}

        <div className={cx('total-price')}>total : {total.toLocaleString()}</div>

        <form onSubmit={handleSubmit(handleOrder)}>
          <section className={cx('info-layout')}>
            <div className={cx('side-wrap')}>
              <h2 className={cx('title')}>배송 정보</h2>
              <span className={cx('required-title-msg')}>(* 는 필수 항목입니다.)</span>
            </div>

            <div className={cx('shipping-form-wrap')}>
              <h3 className={cx('title')}>{'주문자'} 정보</h3>

              <div className={cx('shipping-form')}>
                <span className={cx('label')}>* 이름</span>
                <Input
                  className={cx('form-input')}
                  placeholder={'주문자 이름을 입력해 주세요.'}
                  {...register('buyer', { required: true })}
                  needMessage
                  isInputError={errors.buyer ? 'error' : 'none'}
                />
                <span className={cx('label')}>* 휴대폰번호</span>
                <Input
                  className={cx('form-input')}
                  defaultValue={'010'}
                  placeholder="01012345678"
                  {...register('phone_number', {
                    required: true,
                    onChange: (e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                      setValue('phone_number', onlyNums.slice(0, 11));
                    },
                  })}
                  isInputError={errors.phone_number ? 'error' : 'none'}
                />
                <span className={cx('label')}>이메일주소</span>
                <Input
                  className={cx('form-input')}
                  placeholder="이메일주소를 입력해 주세요."
                  type="text"
                />
              </div>

              <div className={cx('form-header-wrap')}>
                <h3 className={cx('title')}>{'배송지'} 정보</h3>
                <Button kind={'tag'} color={'black'} onClick={handleFormCoincide}>
                  주문자 정보 불러오기
                </Button>
              </div>

              <div className={cx('shipping-form')}>
                <span className={cx('label')}>* 수령인</span>
                <Input
                  className={cx('form-input')}
                  {...register('receiver', { required: true })}
                  isInputError={errors.receiver ? 'error' : 'none'}
                  placeholder={'수령인 이름을 입력해 주세요.'}
                />

                <span className={cx('label')}>* 휴대폰번호</span>
                <Input
                  className={cx('form-input')}
                  isInputError={errors.receiver_phone_number ? 'error' : 'none'}
                  placeholder="01012345678"
                  defaultValue={'010'}
                  {...register('receiver_phone_number', {
                    required: true,
                    onChange: (e) => {
                      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                      setValue('receiver_phone_number', onlyNums.slice(0, 11));
                    },
                  })}
                />

                <span className={cx('label')}>* 배송주소</span>
                <Input
                  className={cx('form-input')}
                  placeholder="배송주소를 입력해 주세요."
                  {...register('address', { required: true })}
                  isInputError={errors.address ? 'error' : 'none'}
                />

                <span className={cx('label')}>* 배송메세지</span>
                <Input
                  className={cx('form-input')}
                  placeholder="배송메세지를 입력해 주세요."
                  {...register('address_message', {
                    required: true,
                  })}
                  isInputError={errors.address_message ? 'error' : 'none'}
                />
              </div>
            </div>
          </section>

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
                <ReceiptLayout
                  title={'상품금액'}
                  content={orderDetail
                    ?.map((detail) => detail.price)
                    .reduce((a, c) => a + c, 0)
                    .toLocaleString()}
                />
                <ReceiptLayout title={'할인금액'} content={'0'} />
                <ReceiptLayout
                  title={'배송비'}
                  content={orderDetail
                    ?.map((detail) => detail.shipping_fee)
                    .reduce((a, c) => a + c, 0)
                    .toLocaleString()}
                />
              </div>
              <ReceiptLayout
                title={'결제금액'}
                classNames={'total'}
                content={total.toLocaleString()}
              />
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
          <Button block color="yellow" type="submit">
            ORDER
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
};

const ReceiptLayout = ({
  title,
  content,
  classNames,
}: {
  title: string;
  content: string | undefined;
  classNames?: string;
}) => {
  return (
    <div className={cx('receipt-layout-wrap')}>
      <dt className={cx('title')}>{title}</dt>
      <dd className={cx('content', classNames)}>￦ {content}</dd>
    </div>
  );
};
