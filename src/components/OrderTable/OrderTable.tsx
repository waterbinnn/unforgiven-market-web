import classNames from 'classnames/bind';
import styles from './OrderTable.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
}

export const OrderTable = ({ children }: Props) => {
  return (
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
        <tbody>{children}</tbody>
      </table>
    </section>
  );
};
