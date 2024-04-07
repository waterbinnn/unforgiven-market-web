'use client';

import { Button, ContentsModal, Count } from '@/components';
import classNames from 'classnames/bind';
import styles from './CartDetail.module.scss';
import ListStyles from '../CartList/CartList.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { removeItem, updateCount } from '@/actions';
import { ProductListType, CartItemType } from '@/types';
import { useOrderStore } from '@/store';

const cx = classNames.bind({ ...styles, ...ListStyles });

interface Props {
  product: CartItemType;
  detail: ProductListType;
}

export const CartDetail = ({ product, detail }: Props) => {
  const router = useRouter();
  const { setOrderDetail, setOrderKind } = useOrderStore();

  const [isUpdateCount, setIsUpdateCount] = useState<boolean>(false);
  const [count, _setCount] = useState<number>(product.quantity);
  const [newCount, setNewCount] = useState<number>(count);
  const [countMsg, setCountMsg] = useState<string>('');
  const [isPending, setIsPending] = useState<boolean>(false);

  //수량 수정 모달 close 시 동작하는 함수
  const handleCloseModal = () => {
    setIsUpdateCount(false);
    setCountMsg('');
  };

  //count 수정시 mutate 되는 함수
  const handleUpdateCount = async () => {
    const updateCountReq = {
      product_id: product.product_id,
      quantity: newCount,
      is_active: true,
    };
    setIsPending(true);
    await updateCount(product.cart_item_id, updateCountReq);
    setTimeout(() => {
      setIsPending(false);
      setIsUpdateCount(false);
    }, 500);
  };

  // 삭제 버튼 클릭시 동작하는 함수
  const deleteItem = async () => {
    setIsPending(true);
    await removeItem(product.cart_item_id.toString());
    setIsPending(false);
  };

  const handleOrder = () => {
    setOrderDetail([]);
    setOrderDetail([{ ...detail, quantity: newCount }]);
    setOrderKind('cart_one_order');
    router.push('/order');
  };

  return (
    <li className={cx('item-wrap')} key={`${detail?.product_id}`}>
      <div className={cx('info-wrap')}>
        <Image
          src={detail.image as string}
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
            <dd className={cx('store')}>{detail.store_name}</dd>

            <dt className={cx('visually-hidden')}>product name</dt>
            <dd className={cx('info-title')}>{detail.product_name}</dd>

            <dt className={cx('visually-hidden')}>Price</dt>
            <dd className={cx('info-price')}>￦ {detail.price.toLocaleString()}</dd>
          </dl>
          <span className={cx('shipping-fee')}>
            {detail.shipping_fee > 0
              ? `택배배송/${detail.shipping_fee.toLocaleString()}원`
              : '택배배송/무료배송'}
          </span>
        </div>
      </div>

      <Count
        stock={detail.stock}
        count={product.quantity}
        setCount={() => setIsUpdateCount(true)}
      />

      {isUpdateCount && (
        <ContentsModal
          onClose={handleCloseModal}
          onOk={handleUpdateCount}
          okText={isPending ? 'SAVING..' : 'SAVE'}
          isInfo={false}
          contents={
            <div className={cx('modal-wrap')}>
              <Count stock={detail.stock} count={newCount} setCount={setNewCount} />
              <span>{countMsg}</span>
            </div>
          }
        />
      )}

      <div className={cx('price-wrap')}>
        <span>Total</span>
        <strong className={cx('item-total-price')}>
          ￦ {(product.quantity * detail.price).toLocaleString()}
        </strong>
      </div>

      <div className={cx('btn-order')}>
        <Button color={'yellow'} width={'80px'} onClick={handleOrder}>
          ORDER
        </Button>
      </div>

      <button
        type="button"
        className={cx('btn-del-item', { pending: isPending })}
        id={product.product_id.toString()}
        onClick={deleteItem}
      >
        X
      </button>
    </li>
  );
};
