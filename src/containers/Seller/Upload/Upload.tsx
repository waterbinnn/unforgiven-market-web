'use client';

import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import { Button, CurrencyInput } from '@/components';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import PlusIcon from '/public/assets/icon-plus.svg';
import { useForm } from 'react-hook-form';
import { PostProduct, ProductListType } from '@/types';
import { message } from 'antd';
import { useSession } from 'next-auth/react';
import { productManage } from '@/service';

const cx = classNames.bind(styles);

interface Props {
  detail?: ProductListType;
  productId?: string;
  isEdit: boolean;
}

export const Upload = ({ detail, productId, isEdit }: Props) => {
  const router = useRouter();

  const {
    watch,
    register,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      product_name: isEdit ? detail?.product_name : '',
      price: isEdit ? detail?.price : 0,
      shipping_method: isEdit ? detail?.shipping_method : 'PARCEL',
      shipping_fee: isEdit ? detail?.shipping_fee : 0,
      stock: isEdit ? detail?.stock : 0,
      product_info: isEdit ? detail?.product_info : '',
    },
  });

  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageFile, setImageFile] = useState<File>();
  const [delivery, setDelivery] = useState(isEdit ? detail?.shipping_method : 'PARCEL');

  const imageRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const token = session?.token;

  const productName = watch('product_name', '');

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) {
      return;
    }

    if (imageSrc) URL.revokeObjectURL(imageSrc);
    const url = URL.createObjectURL(e.target.files[0]);
    setImageSrc(url);
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data: any) => {
    const formData: PostProduct = {
      product_name: data.product_name,
      price: data.price,
      shipping_method: delivery!,
      shipping_fee: data.shipping_fee,
      stock: data.stock,
      product_info: data.product_info,
    };

    const isSuccess = (status: number) => {
      if (status === 201 || status === 200) {
        message.success(`상품이 ${isEdit ? '수정' : '등록'}되었습니다.`);
        router.push('/seller/dashboard');
        router.refresh();
      } else {
        message.error('잘못된 접근입니다.');
      }
    };

    if (!isEdit && formData && token) {
      //최초 업로드
      const res = await productManage.postProduct({ ...formData, image: imageFile }, token);
      isSuccess(res.status);
    }

    if (isEdit && productId && formData && token) {
      //수정
      const res = await productManage.updateProduct(formData, productId, token);
      isSuccess(res.status);
    }
  };

  return (
    <div className={cx('container', 'upload-container')}>
      <div className={cx('header')}>
        <Image
          onClick={() => router.push('/seller/dashboard')}
          src={'/assets/icon-back.svg'}
          className={cx('btn-back')}
          width={50}
          height={50}
          alt="back button"
          priority
          role="button"
          tabIndex={0}
        />
      </div>

      <div className={cx('upload-wrap')}>
        <form className={cx('form')} autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <h2 className={cx('h2')}>상품 등록</h2>

          <div className={cx('top-wrap')}>
            <div className={cx('image-wrap')}>
              <ContentLayout label={'상품 이미지'}>
                <div className={cx('image-icon-wrap')}>
                  <div
                    className={cx('image')}
                    onClick={() => imageRef.current?.click()}
                    style={{
                      backgroundImage: `url(${isEdit ? detail?.image : imageSrc})`,
                    }}
                  />
                  {!isEdit && imageSrc.length < 1 && <PlusIcon className={cx('btn-plus')} />}
                </div>
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e)}
                  className={cx('visually-hidden')}
                  ref={imageRef}
                  accept=".jpg, .gif, .png"
                  disabled={isEdit}
                />
              </ContentLayout>
            </div>

            <div className={cx('detail-wrap')}>
              <ContentLayout label={'상품명'}>
                <div className={cx('text-input-wrap')}>
                  <input
                    className={cx('text-input')}
                    maxLength={30}
                    placeholder="최대 30글자 가능"
                    {...register('product_name', { required: true, min: 30 })}
                  />
                  <span className={cx('text-count')}>{productName?.length}/30</span>
                </div>
              </ContentLayout>

              <ContentLayout label={'판매가'}>
                <CurrencyInput
                  name="price"
                  countText="원"
                  setValue={setValue}
                  data={detail?.price}
                />
              </ContentLayout>

              <ContentLayout label={'배송방법'}>
                <div className={cx('btn-wrap')}>
                  <Button
                    color="outline"
                    width="120px"
                    active={delivery === 'PARCEL'}
                    onClick={() => setDelivery('PARCEL')}
                  >
                    택배, 소포, 등기
                  </Button>
                  <Button
                    color="outline"
                    width="140px"
                    active={delivery === 'DELIVERY'}
                    onClick={() => setDelivery('DELIVERY')}
                  >
                    직접배송(화물배달)
                  </Button>
                </div>
              </ContentLayout>

              <ContentLayout label={'기본 배송비'}>
                <CurrencyInput
                  countText="원"
                  name="shipping_fee"
                  setValue={setValue}
                  data={detail?.shipping_fee}
                />
              </ContentLayout>

              <ContentLayout label={'재고'}>
                <CurrencyInput
                  countText="개"
                  name="stock"
                  setValue={setValue}
                  data={detail?.stock}
                />
              </ContentLayout>
            </div>
          </div>

          <div className={cx('info-wrap')}>
            <ContentLayout label={'상품 설명'}>
              <textarea
                placeholder="상품 정보를 입력 해주세요."
                className={cx('textarea')}
                {...register('product_info', { required: true })}
              />
            </ContentLayout>
          </div>

          <div className={cx('btn-wrap', 'save')}>
            <Button size="m" color="pink" onClick={() => router.push('/seller/dashboard')}>
              취소
            </Button>
            <Button
              size="m"
              color="green"
              disabled={isEdit ? !isValid : !isValid || imageSrc.length === 0}
              type="submit"
            >
              {isEdit ? '수정' : '저장'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ContentLayout = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <dl className={cx('content-layout-wrap')}>
      <dt className={cx('content-label')}>{label}</dt>
      <dd className={cx('content')}>{children}</dd>
    </dl>
  );
};
