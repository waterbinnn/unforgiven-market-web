"use client";

import Item from "./Item";
import classNames from "classnames/bind";
import styles from "../Cart.module.scss";
import { cartManage } from "@/api/cartManage";
import Loading from "@/app/loading";
import { CartResult } from "@/types/cartManage";
import { useCartList } from "@/hooks";
import { Suspense } from "react";
import Error from "@/app/error";

const cx = classNames.bind(styles);
interface Props {
  token: string;
}
const CartList = ({ token }: Props) => {
  const { isLoading, isError, data } = useCartList(token);

  const handleRemoveCart = async () => {
    if (!token) {
      return;
    }
    try {
      await cartManage.removeCart(token ?? "");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Error
        errorMsg={"불러오기를 실패했습니다. 다시 시도해 주세요."}
        url={"/cart"}
      />
    );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <button
          type="button"
          onClick={handleRemoveCart}
          disabled={data?.count === 0}
          className={cx("del-btn")}
        >
          전체 삭제
        </button>
        <ol className={cx("item-list-wrap")}>
          {data && data?.count === 0 ? (
            <div className={cx("no-items-wrap")}>
              <p className={cx("text")}>장바구니에 담은 물건이 없습니다.</p>
            </div>
          ) : (
            data &&
            data?.results.map((item: CartResult, index: number) => (
              <Item detail={item} key={`c-d-${index}`} token={token ?? ""} />
            ))
          )}
        </ol>
      </Suspense>
    </>
  );
};

export default CartList;
