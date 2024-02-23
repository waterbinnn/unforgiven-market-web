import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';

const cx = classNames.bind(styles);

export const OrderDetail = () => {
  return (
    <li className={cx('order-detail-wrap')}>
      <Image
        width={100}
        height={100}
        src={'/assets/default_img.png'}
        alt="product name"
        placeholder={'blur'}
        blurDataURL={'/assets/default_img.png'}
        loading="lazy"
      />
      <div className={cx('detail-info-container')}>
        <dl className={cx('detail-info-wrap')}>
          <div className={cx('info-wrap')}>
            <div>
              <dt className={cx('visually-hidden')}>store name</dt>
              <dd className={cx('store')}>우당탕탕 스토어</dd>

              <dt className={cx('visually-hidden')}>product name</dt>
              <dd className={cx('info-title')}>언포기븐 앨범</dd>
            </div>

            <dt className={cx('title')}>수량</dt>
            <dd className={cx('info-count')}>수량 1개</dd>
          </div>

          <dt className={cx('shipping-fee')}>delivery fee</dt>
          <dd className={cx('info-fee')}>무료배송</dd>

          <dt className={cx('visually-hidden')}>Price</dt>
          <dd className={cx('info-price')}>￦ 15,000</dd>
        </dl>
      </div>
    </li>
  );
};
