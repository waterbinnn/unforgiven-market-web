"use client";

import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import { Button } from "../../Button";
import Link from "next/link";
import { useResize } from "@/utils/useResize";
import Image from "next/image";
import { useState } from "react";
import { MobileGnb } from "../MobileGnb";

const cx = classNames.bind(styles);

export const Header = () => {
  const browserSize = useResize({ throttleMs: 200 });
  const [showGnb, setShowGnb] = useState<Boolean>(false);

  const handleGnb = () => {
    setShowGnb((prev) => !prev);
  };

  return (
    <>
      <header className={cx("header")}>
        {browserSize.width >= 768 ? (
          <>
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
          </>
        ) : (
          <>
            <Link className={cx("header-title")} href={"/"}>
              UNFORGIVEN
            </Link>
            <button className={cx("mobile-menu-btn")} onClick={handleGnb}>
              <Image
                src={"/assets/icon-plus.svg"}
                alt="menu"
                width={50}
                height={50}
              />
            </button>
          </>
        )}
      </header>
      {showGnb && <MobileGnb setShowGnb={setShowGnb} />}
    </>
  );
};
