import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';

const cx = classNames.bind(styles);

export const OrderDetail = () => {
  return (
    <tr className={cx('order-detail-wrap')}>
      <td className={cx('item-wrap')}>
        <Image
          width={100}
          height={100}
          src={'/assets/default_img.png'}
          alt="product name"
          placeholder={'blur'}
          blurDataURL={'/assets/default_img.png'}
          loading="lazy"
        />
        <div className={cx('info-wrap')}>
          <div className={cx('column-wrap')}>
            <p className={cx('info', 'store')}>{'우당탕탕 스토어'}</p>
            <p className={cx('info')}>{'언포기븐 앨범'}</p>
          </div>
          <span className={cx('info', 'count')}>{'수량 1 개'}</span>
        </div>
      </td>
      <td>
        <p className={cx('info-base')}>-￦ {'1,000'}</p>
      </td>
      <td>
        <p className={cx('info-base')}>￦ {'무료배송'}</p>
      </td>
      <td>
        <p className={cx('info-base', 'price')}>{'￦ 15,000'}</p>
      </td>
    </tr>
  );
};
