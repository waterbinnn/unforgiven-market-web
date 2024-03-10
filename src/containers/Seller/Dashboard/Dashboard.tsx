import { Button, Sidebar, Table } from '@/components';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

const mockData = [
  {
    product_id: 0,
    product_name: 'product',
    seller: 10,
    seller_store: 'store name',
    image: '',
    price: 10000,
    shipping_method: 'PARCEL',
    shipping_fee: 2500,
    stock: 100,
    products_info: 'info',
  },
];

export const Dashboard = () => {
  return (
    <div className={cx('dashboard-container', 'container')}>
      <div className={cx('header')}>
        <div className={cx('title-wrap')}>
          <h2 className={cx('h2')}>DASHBOARD</h2>
          <h3 className={cx('h3')}>{mockData[0].seller_store}</h3>
        </div>
        <Button size="m" color="green">
          상품업로드
        </Button>
      </div>

      <div className={cx('body-wrap')}>
        <Sidebar count={mockData.length} />

        <section className={cx('table-section')}>
          <h2 className={cx('visually-hidden')}>상품 정보</h2>
          <Table thList={['INFO', 'PRICE', 'EDIT', 'DEL']}>
            {mockData.map((item) => {
              return (
                <ProductInfoLayout
                  name={item.product_name}
                  image={item.image}
                  price={item.price}
                  key={item.product_id}
                  count={item.stock}
                />
              );
            })}
          </Table>
        </section>
      </div>
    </div>
  );
};

const ProductInfoLayout = ({
  image,
  name,
  count,
  price,
}: {
  image: string;
  name: string;
  count: number;
  price: number;
}) => {
  return (
    <tr>
      <td className={cx('table-data', 'info')}>
        <Image width={50} height={50} alt={name} src={image} />
        <div>
          <h4 className={cx('h4')}>{name}</h4>
          <span className={cx('info-count')}>재고: {count}개</span>
        </div>
      </td>
      <td className={cx('table-data')}>
        <span className={cx('info-price')}>￦ {price.toLocaleString()}</span>
      </td>
      <td className={cx('table-data')}>
        <Button color="outline" size="s" width="60px">
          수정
        </Button>
      </td>
      <td className={cx('table-data')}>
        <Button color="black" size="s" width="60px">
          삭제
        </Button>
      </td>
    </tr>
  );
};
