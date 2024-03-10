import classNames from 'classnames/bind';
import styles from './Table.module.scss';

const cx = classNames.bind(styles);

interface Props {
  children: React.ReactNode;
  thList: string[];
}

export const Table = ({ thList, children }: Props) => {
  return (
    <section className={cx('table-container')}>
      <h2 className={cx('visually-hidden')}>order list</h2>
      <table>
        <thead className={cx('table-header')}>
          <tr>
            {thList.map((th, index) => (
              <th scope="col" key={index}>
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </section>
  );
};
