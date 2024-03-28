import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
const cx = classNames.bind(styles);

export const ProductListLoading = () => {
  const skeletonList = [...new Array(30)].map((_, i) => i + 1);

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
};
