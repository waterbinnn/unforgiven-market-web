'use client';

import classNames from 'classnames/bind';
import styles from './RadioButton.module.scss';
import { InputHTMLAttributes, forwardRef, useCallback, useState } from 'react';

const cx = classNames.bind(styles);

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label?: string;
  disabled?: boolean;
}

export const RadioButton = ({ id, label, disabled, onChange, ...rest }: Props) => {
  return (
    <div className={cx('radio-wrap')}>
      <input id={id} className={cx('radio')} type="radio" {...rest} onChange={onChange} />
      <label htmlFor={id} />
      <label htmlFor={id} className={cx('label')}>
        {label}
      </label>
    </div>
  );
};
