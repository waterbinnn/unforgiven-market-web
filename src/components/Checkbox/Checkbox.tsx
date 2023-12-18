import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

interface Props {
  isChecked: boolean;
  onClick: () => void;
}

export const Checkbox = ({ isChecked, onClick }: Props) => {
  return (
    <button type="button" className={cx('checkbox', { active: isChecked })} onClick={onClick} />
  );
};
