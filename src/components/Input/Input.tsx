"use client";
import classNames from "classnames/bind";
import styles from "./Input.module.scss";
import {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
} from "react";

const cx = classNames.bind(styles);

interface InputProps {
  type?: string;
  error?: boolean;
  needMessage?: boolean;
  messageText?: string;
  needBtn?: boolean;
  btnText?: string;
  btnWidth?: string;
}

type Props = InputHTMLAttributes<HTMLInputElement> & InputProps;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = "text",
      placeholder,
      error,
      needMessage,
      messageText,
      needBtn,
      btnText,
      btnWidth,
      value,
      onBlur,
      onChange,
      className,
      disabled,
      ...rest
    },
    ref
  ) => {
    const classes = cx("input-style", className, { disabled });

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        onBlur && onBlur(e);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
      },
      [onChange]
    );

    return (
      <div className={cx("input-wrap")}>
        <input
          type={type}
          className={classes}
          placeholder={placeholder}
          autoComplete="off"
          ref={ref}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={20}
          {...rest}
        />
        {needMessage && (
          <span className={cx("desc", error ? "negative" : "positive")}>
            {messageText}
          </span>
        )}
        {needBtn && (
          <button
            className={cx("input-btn")}
            style={{ width: btnWidth }}
            type="button"
          >
            {btnText}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
