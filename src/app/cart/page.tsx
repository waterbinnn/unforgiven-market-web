import React from "react";
import CartItems from "./components/CartList";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import getQueryClient from "@/utils/getQueryClient";
import { cartManage } from "@/api";
import { Hydrate, dehydrate } from "@tanstack/react-query";

const cx = classNames.bind(styles);

const Cart = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.token;
  if (!token) {
    return;
  }

  //pre-fetching
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["cartList"], () =>
    cartManage.getList(token)
  );
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <main className={cx("container")}>
        <h1 className={cx("page-title")}>CART</h1>
        <section className={cx("cart-container")}>
          <h2 className={cx("visually-hidden")}>cart items</h2>
          <CartItems token={token} />
        </section>
      </main>
    </Hydrate>
  );
};

export default Cart;
