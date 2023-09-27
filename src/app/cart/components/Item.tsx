"use client";

import { Checkbox, ContentsModal, Count } from "@/components";
import classNames from "classnames/bind";
import styles from "./Item.module.scss";
import { useState } from "react";
import Image from "next/image";
import { CartList } from "@/types/cartManage";
import { cartManage } from "@/api";

const cx = classNames.bind(styles);

interface Props {
  data: CartList["results"];
  token: string;
}

const Item = ({ data, token }: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isUpdateCount, setIsUpdateCount] = useState<boolean>(false);

  console.log(data);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteItem = async () => {
    try {
      const res = await cartManage.removeCart(token, data[0].cart_item_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className={cx("item-wrap")} key={`${data[0].product_id}`}>
      <Checkbox isChecked={isChecked} onClick={handleCheckbox} />
      <div className={cx("info-wrap")}>
        <Image
          src={
            "https://openmarket.weniv.co.kr/media/products/2023/09/20/maxresdefault.jpg"
          }
          alt="product name"
          width={100}
          height={100}
          placeholder={"blur"}
          blurDataURL={"/assets/default_img.png"}
          className={cx("image")}
        />
        <div className={cx("detail-container")}>
          <dl className={cx("detail-info-wrap")}>
            <dt className={cx("visually-hidden")}>store name</dt>
            <dd className={cx("store")}>store name</dd>

            <dt className={cx("visually-hidden")}>product name</dt>
            <dd className={cx("info-title")}>product name</dd>

            <dt className={cx("visually-hidden")}>Price</dt>
            <dd className={cx("info-price")}>￦ 29,000</dd>
          </dl>
          <span className={cx("shipping-fee")}>
            {/* {data.shipping_fee > 0
              ? `택배배송/${data.shipping_fee.toLocaleString()}원`
              : "택배배송/무료배송"} */}
            택배배송/무료배송
          </span>
        </div>
      </div>

      <Count stock={2} count={1} setCount={() => setIsUpdateCount(true)} />
      {isUpdateCount && (
        <ContentsModal
          onClose={() => setIsUpdateCount(false)}
          onOk={() => console.log("수량 수정 저장 로직")}
          okText={"SAVE"}
          isInfo={false}
          contents={
            <Count stock={5} count={1} setCount={() => console.log("count")} />
          }
        />
      )}

      <div className={cx("item-4th-wrap")}>
        <span>total</span>
        <strong className={cx("item-total-price")}>￦ 29,000</strong>
      </div>

      <button
        type="button"
        className={cx("del-item-btn")}
        onClick={handleDeleteItem}
      >
        X
      </button>
    </li>
  );
};

export default Item;
