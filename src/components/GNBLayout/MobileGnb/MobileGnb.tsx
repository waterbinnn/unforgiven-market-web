"use client";
import classNames from "classnames/bind";
import styles from "./MobileGnb.module.scss";
import { useRouter } from "next/navigation";

import { Portal, Overlay, BaseModal } from "@/components";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

const cx = classNames.bind(styles);

interface Props {
  setShowGnb: Dispatch<SetStateAction<Boolean>>;
}

export const MobileGnb = ({ setShowGnb }: Props) => {
  const router = useRouter();

  const handleRouter = (page: string) => {
    router.push(page);
  };

  return (
    <BaseModal
      selector={"#portal-wrap"}
      onOverlayClick={() => setShowGnb(false)}
    >
      <section className={cx("mobile-gnb-container")}>
        <h2 className={cx("visually-hidden")}>Menu</h2>
        <button className={cx("close-btn")} onClick={() => setShowGnb(false)}>
          <Image
            src={"/assets/icon-plus.svg"}
            alt="menu"
            width={50}
            height={50}
          />
        </button>
        <nav className={cx("gnb-wrap")}>
          <button
            className={cx("gnb-btn")}
            type="button"
            onClick={() => handleRouter("/cart")}
          >
            CART
          </button>
          <button
            className={cx("gnb-btn")}
            type="button"
            onClick={() => handleRouter("/login")}
          >
            {/* 추후 상태관리 필요  */}
            LOGIN
          </button>
        </nav>
      </section>
    </BaseModal>
  );
};
