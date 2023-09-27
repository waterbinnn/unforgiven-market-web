"use client";

import Item from "./Item";
import classNames from "classnames/bind";
import styles from "../Cart.module.scss";
import { useQuery } from "@tanstack/react-query";
import { cartManage } from "@/api/cartManage";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";

const cx = classNames.bind(styles);

const CartItems = () => {
  /**
   * 카트 내 아이템 id 를 받아서 리액트 쿼리에 저장된 제품 데이터를 받아와야 함.
   * how ?
   *
   */

  const { data: session } = useSession();
  const token = session?.token;

  if (!token) {
    return;
  }

  const { isLoading, data } = useQuery({
    queryKey: ["cartData"],
    queryFn: () => cartManage.getList(token),
  });

  const handleRemoveCart = async () => {
    try {
      const res = await cartManage.removeCart(token);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <button
        type="button"
        onClick={handleRemoveCart}
        disabled={data?.count === 0}
        className={cx("del-btn")}
      >
        전체 삭제
      </button>
      <ol className={cx("item-list-wrap")}>
        {data?.count === 0 && (
          <div className={cx("no-items-wrap")}>
            <p className={cx("text")}>장바구니에 담은 물건이 없습니다.</p>
          </div>
        )}
        {data?.results.map(() => (
          <Item data={data.results} token={token} />
        ))}
      </ol>
    </>
  );
};

export default CartItems;
