"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: any;
  selector: string;
}

export const Portal: React.FC<Props> = ({ children, selector }) => {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector) as HTMLElement;
    setMounted(true);
  }, [selector]);

  return mounted
    ? ReactDOM.createPortal(children, ref.current as Element)
    : null;
};
