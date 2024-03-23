'use client';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export interface ButtonProps {
  size?: 's' | 'm' | 'l';
  color?: 'pink' | 'yellow' | 'blue' | 'green' | 'black' | 'outline';
  width?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export const Button = ({
  size = 's',
  color = 'black',
  children,
  width,
  disabled = false,
  active = false,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={cx('button', size, color, { active })}
      style={{ width: width }}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
