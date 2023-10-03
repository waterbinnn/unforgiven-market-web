import React, { ReactNode } from 'react';
import { BaseModal } from '../BaseModal';
import classNames from 'classnames/bind';
import styles from './ContentsModal.module.scss';

const cx = classNames.bind(styles);

interface Props {
  title?: string;
  okText: string;
  isInfo: boolean;
  contents?: ReactNode;
  onClose: () => void;
  onOk: () => void;
}

export const ContentsModal = ({ title, okText, isInfo, contents, onClose, onOk }: Props) => {
  return (
    <BaseModal selector={'#portal-wrap'} onOverlayClick={onClose}>
      <div className={cx('modal-wrap')}>
        <p>{title}</p>
        <div className={cx('contents')}>{contents}</div>
        {!isInfo ? (
          <div className={cx('btn-wrap')}>
            <button type="button" onClick={onClose} className={cx('close-btn')}>
              CANCEL
            </button>
            <button type="button" onClick={onOk} className={cx('ok-btn')}>
              {okText}
            </button>
          </div>
        ) : (
          <div className={cx('btn-wrap')}>
            <button type="button" onClick={onOk}>
              {okText}
            </button>
          </div>
        )}
      </div>
    </BaseModal>
  );
};
