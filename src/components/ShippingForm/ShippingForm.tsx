'use client';

import { useForm } from 'react-hook-form';
import { Input } from '../Input';

import classNames from 'classnames/bind';
import styles from './ShippingForm.module.scss';

const cx = classNames.bind(styles);

interface ShippingFormProps {
  type: 'buyer' | 'shipping';
}

export const ShippingForm = ({ type }: ShippingFormProps) => {
  const buyer = type === 'buyer';

  const { register, getValues, setValue } = useForm({
    mode: 'onChange',
  });

  return (
    <form className={cx('shipping-form')}>
      <h3 className={cx('title')}>{buyer ? '주문자' : '배송지'} 정보</h3>
      <Input className={cx('text-input')} placeholder={buyer ? '이름' : '수령인'} />
      <div className={cx('phone-wrap')}>
        <Input className={cx('phone-input')} disabled defaultValue="010" type="number" />
        <Input
          className={cx('phone-input')}
          {...register('middleNum', {
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              setValue('middleNum', e.target.value.slice(0, 4));
            },
          })}
          type="number"
        />
        <Input
          className={cx('phone-input')}
          {...register('lastNum', {
            required: true,
            valueAsNumber: true,
            onChange: (e) => {
              setValue('lastNum', e.target.value.slice(0, 4));
            },
          })}
          type="number"
        />
      </div>
      {buyer ? (
        <Input className={cx('text-input')} placeholder="이메일" type="email" />
      ) : (
        <div>
          <div>
            <Input className={cx('text-input')} placeholder="배송주소" />
          </div>
          <Input className={cx('text-input')} placeholder="배송메세지" />
        </div>
      )}
    </form>
  );
};
