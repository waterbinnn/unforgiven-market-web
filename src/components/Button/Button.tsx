'use client';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export interface ButtonProps {
  size?: 's' | 'm' | 'l';
  color?: 'pink' | 'yellow' | 'blue' | 'green';
  width?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export const Button = ({
  size = 's',
  color = 'pink',
  children,
  width,
  disabled = false,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cx('button', size, color)}
      style={{ width: width }}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
