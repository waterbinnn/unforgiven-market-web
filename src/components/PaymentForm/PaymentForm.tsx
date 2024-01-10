import classNames from 'classnames/bind';
import styles from './PaymentForm.module.scss';

const cx = classNames.bind(styles);

interface Props {
  totalPrice: number;
  discount: number;
  deliveryFee: number;
}

export const PaymentForm = ({ totalPrice, discount, deliveryFee }: Props) => {
  return (
    <article className={cx('payment-container')}>
      <h2 className={cx('visually-hidden')}>Payment</h2>
      <dl className={cx('payment-wrap')}>
        <div className={cx('left-wrap')}>
          <ItemWrap label={'Total'} data={totalPrice.toLocaleString()} />
          <img src="/assets/icon-minus.svg" alt="minus" className={cx('count-icon')} />
          <ItemWrap label={'Discount'} data={discount.toLocaleString()} />
          <img src="/assets/icon-plus.svg" alt="plus" className={cx('count-icon')} />
          <ItemWrap label={'Delivery Fee'} data={deliveryFee.toLocaleString()} />
        </div>
        <div className={cx('right-wrap')}>
          <ItemWrap
            label={'Your Payment'}
            isTotal
            data={(totalPrice - discount + deliveryFee).toLocaleString()}
          />
        </div>
      </dl>
    </article>
  );
};

interface ItemWrapProps {
  label: string;
  data: string;
  isTotal?: boolean;
}

const ItemWrap = ({ label, data, isTotal = false }: ItemWrapProps) => {
  return (
    <div className={cx('item-wrap')}>
      <dt className={cx('title')}>{label}</dt>
      <dd className={cx('num', isTotal && 'payment')}>￦{data}</dd>
    </div>
  );
};
