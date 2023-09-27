"use client";
import React, { ReactNode, useCallback, useEffect } from "react";

import { Portal } from "../../Portal";
import { Overlay } from "@/components/Overlay";

interface BaseModalProps {
  children: ReactNode;
  selector: string;
  onOverlayClick?: () => void;
  isGnb?: boolean;
}

export const BaseModal = ({
  children,
  selector,
  onOverlayClick,
  isGnb,
}: BaseModalProps) => {
  const getScrollBarWidth = () => {
    const el = document.createElement("div");
    el.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;";
    document.body.appendChild(el);
    const width = el.offsetWidth - el.clientWidth;
    el.remove();
    return width;
  };

  useEffect(() => {
    const isScrollbarVisible =
      document.body.scrollHeight > document.body.clientHeight;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = isScrollbarVisible
      ? `${getScrollBarWidth()}px`
      : "0px";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, []);

  const handleOverlayClick = useCallback(() => {
    onOverlayClick && onOverlayClick();
  }, [onOverlayClick]);

  return (
    <Portal selector={selector}>
      {!isGnb ? (
        <div
          style={{
            position: "fixed",
            backgroundColor: "#ffffff",
            zIndex: 1000,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            padding: "0 10px",
          }}
        >
          {children}
        </div>
      ) : (
        <div>{children}</div>
      )}
      <Overlay onClose={handleOverlayClick} />
    </Portal>
  );
};
