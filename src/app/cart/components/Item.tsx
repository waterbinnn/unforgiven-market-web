'use client';

import { Checkbox, ContentsModal, Count } from '@/components';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { CartResult } from '@/types/cartManage';
import { cartManage } from '@/api';
import { useProductDetail } from '@/hooks';
import Loading from '@/app/loading';

const cx = classNames.bind(styles);

interface Props {
  detail: CartResult;
  token: string;
}

const Item = ({ detail, token }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isUpdateCount, setIsUpdateCount] = useState<boolean>(false);
  const [count, setCount] = useState<number>(detail.quantity);
  const [newCount, setNewCount] = useState<number>(count);
  const [countMsg, setCountMsg] = useState<string>('');

  const { isLoading, isError, data } = useProductDetail(detail.product_id.toString());

  const handleCloseModal = () => {
    //수량 수정 모달 close 시 동작하는 함수
    setIsUpdateCount(false);
    setCountMsg('');
  };

  const handleUpdateCount = async () => {
    if (!data) {
      return;
    }
    //수량 수정시 동작하는 함수
    const updateCountReq = {
      product_id: data.product_id,
      quantity: newCount,
      is_active: true,
    };

    try {
      const res = await cartManage.updateCount(token, detail.cart_item_id, updateCountReq);
      if (res.is_active) {
        setIsUpdateCount(false);
      }

      if (res.FAIL_message === '현재 재고보다 더 많은 수량을 담을 수 없습니다.') {
        setCountMsg(res.FAIL_message);
      } else {
        setCountMsg('');
        setIsUpdateCount(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = async () => {
    // 삭제 버튼 클릭시 동작하는 함수
    try {
      await cartManage.removeCart(token, data?.product_id);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>error</div>;

  return (
    <li className={cx('item-wrap')} key={`${data.product_id}`}>
      <Checkbox isChecked={isChecked} onClick={() => setIsChecked(!isChecked)} />
      <div className={cx('info-wrap')}>
        <Image
          src={data.image}
          alt="product name"
          width={100}
          height={100}
          placeholder={'blur'}
          blurDataURL={'/assets/default_img.png'}
          className={cx('image')}
          loading="lazy"
        />
        <div className={cx('detail-container')}>
          <dl className={cx('detail-info-wrap')}>
            <dt className={cx('visually-hidden')}>store name</dt>
            <dd className={cx('store')}>{data.store_name}</dd>

            <dt className={cx('visually-hidden')}>product name</dt>
            <dd className={cx('info-title')}>{data.product_name}</dd>

            <dt className={cx('visually-hidden')}>Price</dt>
            <dd className={cx('info-price')}>￦ {data.price.toLocaleString()}</dd>
          </dl>
          <span className={cx('shipping-fee')}>
            {data.shipping_fee > 0
              ? `택배배송/${data.shipping_fee.toLocaleString()}원`
              : '택배배송/무료배송'}
          </span>
        </div>
      </div>

      <Count stock={data.stock} count={detail.quantity} setCount={() => setIsUpdateCount(true)} />
      {isUpdateCount && (
        <ContentsModal
          onClose={handleCloseModal}
          onOk={handleUpdateCount}
          okText={'SAVE'}
          isInfo={false}
          contents={
            <div className={cx('modal-wrap')}>
              <Count stock={data.stock} count={newCount} setCount={setNewCount} />
              <span>{countMsg}</span>
            </div>
          }
        />
      )}

      <div className={cx('item-4th-wrap')}>
        <span>total</span>
        <strong className={cx('item-total-price')}>￦ 29,000</strong>
      </div>

      <button type="button" className={cx('del-item-btn')} onClick={handleDeleteItem}>
        X
      </button>
    </li>
  );
};

export default Item;
