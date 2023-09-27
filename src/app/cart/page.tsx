"use client";

import React from "react";
import CartItems from "./components/CartItems";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";

const cx = classNames.bind(styles);

const Cart = () => {
  return (
    <main className={cx("container")}>
      <h1 className={cx("page-title")}>CART</h1>
      <section className={cx("cart-container")}>
        <h2 className={cx("visually-hidden")}>cart items</h2>
        <CartItems />
      </section>
    </main>
  );
};

export default Cart;
