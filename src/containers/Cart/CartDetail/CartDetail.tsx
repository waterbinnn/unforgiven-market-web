'use client';

import { Button, Checkbox, ContentsModal, Count } from '@/components';
import classNames from 'classnames/bind';
import styles from './CartDetail.module.scss';
import ListStyles from '../CartList/CartList.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import { CartResult } from '@/types/cartManage';
import { cartManage } from '@/service';
import { useProductDetail } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Error from '@/app/error';

const cx = classNames.bind({ ...styles, ...ListStyles });

interface Props {
  detail: CartResult;
  token: string;
}

export const CartDetail = ({ detail, token }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isUpdateCount, setIsUpdateCount] = useState<boolean>(false);
  const [count, _setCount] = useState<number>(detail.quantity);
  const [newCount, setNewCount] = useState<number>(count);
  const [countMsg, setCountMsg] = useState<string>('');

  const { isLoading, isError, data } = useProductDetail(detail.product_id.toString());

  const queryClient = useQueryClient();

  const router = useRouter();

  //수량 수정 모달 close 시 동작하는 함수
  const handleCloseModal = () => {
    setIsUpdateCount(false);
    setCountMsg('');
  };

  //count 수정시 mutate 되는 함수
  const updateCount = async () => {
    if (!data) {
      return;
    }

    const updateCountReq = {
      product_id: data.product_id,
      quantity: newCount,
      is_active: true,
    };

    const res = await cartManage.updateCount(token, detail.cart_item_id, updateCountReq);

    if (res.FAIL_message === '현재 재고보다 더 많은 수량을 담을 수 없습니다.') {
      setCountMsg(res.FAIL_message);
    } else {
      setCountMsg('');
      setIsUpdateCount(false);
    }

    return res;
  };

  const { mutate: mutateUpdateCount } = useMutation(updateCount, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cartList']);
    },
  });

  // 삭제 버튼 클릭시 동작하는 함수
  const deleteItem = async () => {
    if (!data) {
      return;
    }
    await cartManage.removeItem(token, detail.cart_item_id.toString());
  };

  const { mutate: mutateDeleteItem } = useMutation(deleteItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cartList']);
    },
  });

  if (isLoading) return <></>;
  if (isError) return <Error errorMsg={'문제가 발생했습니다. 다시 시도해주세요.'} url={'/cart'} />;

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
          onOk={mutateUpdateCount}
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

      <div className={cx('price-wrap')}>
        <span>total</span>
        <strong className={cx('item-total-price')}>
          ￦ {(newCount * data.price).toLocaleString()}
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
        id={detail.product_id.toString()}
        onClick={() => mutateDeleteItem()}
      >
        X
      </button>
    </li>
  );
};
