"use client";

import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { Button } from "../../Button";
import Link from "next/link";

const cx = classNames.bind(styles);

export const Header = () => {
  return (
    <header className={cx("header")}>
      <div className={cx("search-wrap")}>
        <Link className={cx("header-title")} href={"/"}>
          UNFORGIVEN
        </Link>
        <form className={cx("input-wrap")}>
          <input
            type="text"
            className={cx("search")}
            placeholder={"Search... (not working)"}
          />
          <button className={cx("btn-search")} type="button">
            ?
          </button>
        </form>
      </div>
      <div className={cx("btn-wrap")}>
        <Button>CART</Button>
        <div className={cx("btn-right")}>
          <Button color="green">LOGIN</Button>
        </div>
      </div>
    </header>
  );
};
