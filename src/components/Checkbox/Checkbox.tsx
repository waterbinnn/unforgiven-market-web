import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

interface Props {
  isChecked: boolean;
  onClick: () => void;
  colorType?: 'white' | 'black';
}

export const Checkbox = ({ isChecked, onClick, colorType = 'black' }: Props) => {
  return (
    <button
      type="button"
      className={cx('checkbox', { active: isChecked }, colorType)}
      onClick={onClick}
    />
  );
};
