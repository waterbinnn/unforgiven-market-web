import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';

const cx = classNames.bind(styles);

export default function Loading() {
  return (
    <div className={cx('container')}>
      <div className={cx('detail-container')}>
        <div className={cx('shimmer', 'image-wrap')}></div>
        <div className={cx('detail-data-container')}>
          <div className={cx('detail-info-wrap')}>
            <div className={cx('shimmer', 'store')}></div>
            <div className={cx('shimmer', 'info-detail')}></div>
            <div className={cx('shimmer', 'info-detail')}></div>
            <div className={cx('shimmer', 'info-detail')}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
