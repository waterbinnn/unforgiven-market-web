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
import { FieldError } from "react-hook-form";

const cx = classNames.bind(styles);

interface InputProps {
  type?: string;
  error?: boolean;
  needMessage?: boolean;
  messageText?: string | FieldError | any;
  needBtn?: boolean;
  btnText?: string;
  btnWidth?: string;
  isInputError?: "none" | "error" | "valid";
  handleButton?: () => void;
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
      handleButton,
      isInputError,
      ...rest
    },
    ref
  ) => {
    const classes = cx(
      "input-style",
      className,
      { disabled },
      { error: isInputError === "error" ? true : false },
      { valid: isInputError === "valid" ? true : false }
    );

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
          disabled={disabled}
          {...rest}
        />
        {needBtn && (
          <button
            className={cx("input-btn")}
            style={{ width: btnWidth }}
            type="button"
            onClick={handleButton}
          >
            {btnText}
          </button>
        )}
        {needMessage && (
          <span className={cx("message", error ? "negative" : "positive")}>
            {messageText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
