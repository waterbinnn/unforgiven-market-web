import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';

import { OrderDetailType } from '@/store';

const cx = classNames.bind(styles);

export const OrderDetail = ({ detail }: { detail: OrderDetailType | null }) => {
  return detail ? (
    <>
      <tr className={cx('order-detail-wrap')}>
        <td className={cx('item-wrap')}>
          <Image
            width={100}
            height={100}
            src={detail.image as string}
            alt={detail.product_name}
            placeholder={'blur'}
            blurDataURL={'/assets/default_img.png'}
            loading="lazy"
          />
          <div className={cx('info-wrap')}>
            <div className={cx('column-wrap')}>
              <p className={cx('info', 'store')}>{detail.store_name}</p>
              <p className={cx('info')}>{detail.product_name}</p>
            </div>
            <span className={cx('info', 'count')}>수량 : {detail.quantity}</span>
          </div>
        </td>
        <td>
          <p className={cx('info-base')}>-￦ {0}</p>
        </td>
        <td>
          <p className={cx('info-base')}>
            ￦ {`${detail.shipping_fee > 0 ? detail.shipping_fee.toLocaleString() : '무료배송'}`}
          </p>
        </td>
        <td>
          <p className={cx('info-base', 'price')}>{`￦ ${detail.price.toLocaleString()}`}</p>
        </td>
      </tr>
    </>
  ) : (
    <div>Loading</div>
  );
};
