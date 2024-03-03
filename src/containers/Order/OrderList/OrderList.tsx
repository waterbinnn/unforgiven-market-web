'use client';

import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import { OrderTable } from '@/components/OrderTable/OrderTable';
import { OrderListData } from '@/types';
import dayjs from 'dayjs';
import { OrderDetailType } from '@/store';
import { OrderDetail } from '../OrderDetail';
import Loading from '@/app/loading';

const cx = classNames.bind(styles);

interface NewItem {
  productDetail: OrderDetailType | unknown;
}

interface Props {
  orderDetails: {
    id: number;
    listData: OrderListData['results'][0];
    productDetail: NewItem[];
  }[];
}
export const OrderList = ({ orderDetails }: Props) => {
  if (!orderDetails) {
    return <Loading />;
  }

  return (
    <div className={cx('container')}>
      <h1 className={cx('page-title')}>ORDER LIST</h1>
      <div className={cx('order-container')}>
        {orderDetails &&
          orderDetails.map((order) => (
            <div key={order.id} className={cx('item-wrap')}>
              <div>
                <OrderTable>
                  {order.productDetail.map((item, index) => (
                    <OrderDetail detail={item.productDetail as OrderDetailType} key={index} />
                  ))}
                </OrderTable>
              </div>

              <div className={cx('order-info-wrap')}>
                <div className={cx('info-header')}>
                  <h3>주문 정보</h3>
                  <p className={cx('time')}>
                    {dayjs(order.listData.created_at).format('YYYY-MM-DD HH:MM')}
                  </p>
                </div>
                <InfoLayout label="주문 번호" content={order.listData.order_number} />
                <InfoLayout label="배송지" content={order.listData.address} />
                <InfoLayout label="배송메세지" content={order.listData.address_message} />
                <InfoLayout label="결제 정보" content={order.listData.payment_method} />
                <InfoLayout
                  label="진행 상태"
                  content={order.listData.delivery_status === 'COMPLETE_PAYMENT' && '결제 완료'}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const InfoLayout = ({ label, content }: { label: string; content: any }) => {
  return (
    <div className={cx('info-wrap')}>
      <span className={cx('label')}>{label}</span>
      <span className={cx('info')}>{content}</span>
    </div>
  );
};
