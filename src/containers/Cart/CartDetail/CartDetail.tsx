'use client';

import { Button, ContentsModal, Count } from '@/components';
import classNames from 'classnames/bind';
import styles from './CartDetail.module.scss';
import ListStyles from '../CartList/CartList.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CartItemType } from '@/types/cartTypes';
import { useProductDetail } from '@/hooks';
import { removeItem, updateCount } from '@/actions/CartListActions';
import { message } from 'antd';
import { getProductDetail } from '@/actions/ProductActions';

const cx = classNames.bind({ ...styles, ...ListStyles });

interface Props {
  product: CartItemType;
}

export const CartDetail = ({ product }: Props) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isUpdateCount, setIsUpdateCount] = useState<boolean>(false);
  const [count, _setCount] = useState<number>(product.quantity);
  const [newCount, setNewCount] = useState<number>(count);
  const [countMsg, setCountMsg] = useState<string>('');

  const { data: detail, isLoading } = useProductDetail(product.product_id.toString());

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

    const { msg } = await updateCount(product.cart_item_id, updateCountReq);

    if (msg === '현재 재고보다 더 많은 수량을 담을 수 없습니다.') {
      setCountMsg(msg);
    } else {
      setCountMsg('');
      setIsUpdateCount(false);
    }
  };

  const { mutate: mutateUpdateCount } = useMutation(handleUpdateCount, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cartList']);
    },
  });

  // 삭제 버튼 클릭시 동작하는 함수
  const deleteItem = async () => {
    await removeItem(product.cart_item_id.toString());
  };

  const { mutate: mutateDeleteItem } = useMutation(deleteItem, {
    onSuccess: () => {
      // queryClient.invalidateQueries(['cartList']);
      message.success({
        content: `삭제됐습니다.`,
      });
      router.push('/cart');
    },
  });

  if (isLoading || !detail) return <div>loading</div>;

  return (
    <li className={cx('item-wrap')} key={`${detail?.product_id}`}>
      <div className={cx('info-wrap')}>
        <Image
          src={detail.image}
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
          onOk={mutateUpdateCount}
          okText={'SAVE'}
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
        <span>total</span>
        <strong className={cx('item-total-price')}>
          ￦ {(product.quantity * detail.price).toLocaleString()}
        </strong>
      </div>

      <div className={cx('btn-order')}>
        <Button color={'yellow'} width={'80px'} onClick={() => router.push('/order')}>
          ORDER
        </Button>
      </div>

      <button
        type="button"
        className={cx('btn-del-item')}
        id={product.product_id.toString()}
        onClick={() => mutateDeleteItem()}
      >
        X
      </button>
    </li>
  );
};
