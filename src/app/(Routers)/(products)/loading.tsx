import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';
const cx = classNames.bind(styles);

export default function Loading() {
  const skeletonList = [...new Array(15)].map((_, i) => i + 1);

  return (
    <div className={cx('container', 'list-container')}>
      <ul className={cx('items-wrap')}>
        {skeletonList.map((_item, index) => (
          <li className={cx('item-wrap', 'shimmer')} key={index}>
            <div className={cx('image')}></div>
            <div className={cx('info-wrap')}>
              <div className={cx('info')}></div>
              <div className={cx('info')}></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
