'use client';

import { Button, Sidebar, Table } from '@/components';

import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SellerListData, SellerListResult } from '@/types/sellerTypes';
import { deleteProduct } from '@/actions';
import { message } from 'antd';

const cx = classNames.bind(styles);

export const Dashboard = ({ data, list }: { data: SellerListData; list: SellerListResult[] }) => {
  const router = useRouter();

  return (
    <div className={cx('dashboard-container', 'container')}>
      <div className={cx('header')}>
        <div className={cx('title-wrap')}>
          <h2 className={cx('h2')}>DASHBOARD</h2>
        </div>
        <Button size="m" color="green" onClick={() => router.push('/seller/upload')}>
          상품업로드
        </Button>
      </div>

      <div className={cx('body-wrap')}>
        <Sidebar count={data.count} />

        <section className={cx('table-section')}>
          <h2 className={cx('visually-hidden')}>상품 정보</h2>

          <Table thList={['INFO', 'PRICE', 'EDIT', 'DEL']} key={data.count}>
            {list.map((item: SellerListResult) => {
              return (
                <ProductInfoLayout
                  name={item.product_name}
                  image={item.image}
                  price={item.price}
                  key={item.product_id}
                  count={item.stock}
                  id={item.product_id}
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
  id,
}: {
  image: string;
  name: string;
  count: number;
  price: number;
  id: number;
}) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const { success } = await deleteProduct(id);
    if (success) {
      message.success('삭제에 성공했습니다.');
    } else {
      message.success('문제가 생겼습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <tr>
      <td className={cx('table-data', 'info')}>
        <Image className={cx('image')} width={100} height={100} alt={name} src={image} />
        <div>
          <h4 className={cx('h4')}>{name}</h4>
          <span className={cx('info-count')}>재고: {count}개</span>
        </div>
      </td>
      <td className={cx('table-data')}>
        <span className={cx('info-price')}>￦ {price.toLocaleString()}</span>
      </td>
      <td className={cx('table-data')}>
        <Button
          color="outline"
          size="s"
          width="60px"
          onClick={() => router.push(`/seller/upload/${id}`)}
        >
          수정
        </Button>
      </td>
      <td className={cx('table-data')}>
        <Button color="black" size="s" width="60px" onClick={() => handleDelete(id)}>
          삭제
        </Button>
      </td>
    </tr>
  );
};
