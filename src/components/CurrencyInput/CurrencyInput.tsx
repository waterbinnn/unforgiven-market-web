'use client';

import classNames from 'classnames/bind';
import styles from './CurrencyInput.module.scss';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';

const cx = classNames.bind(styles);

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  countText: string;
  name: string;
  setValue: any;
  data?: number;
}

export const CurrencyInput = ({ name, countText, setValue, data }: CurrencyInputProps) => {
  const { control } = useForm();

  return (
    <div className={cx('number-input-wrap')}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        defaultValue={data !== undefined ? data.toLocaleString() : ''}
        render={({ field }) => {
          let { value, onChange } = field;

          const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            let newValue = e.target.value.replace(/[^\d,]/g, '');
            newValue = newValue.replace(/,/g, '');

            if (newValue && !isNaN(Number(newValue))) {
              newValue = Number(newValue).toLocaleString('ko-KR');
            }

            onChange(newValue);
            setValue(name, Number(newValue.replace(/,/g, '')));
          };

          return (
            <input
              type="string"
              value={value}
              pattern="[0-9,]*"
              onChange={handleInputChange}
              className={cx('number-input')}
            />
          );
        }}
      />
      <span className={cx('count-text')}>{countText}</span>
    </div>
  );
};
