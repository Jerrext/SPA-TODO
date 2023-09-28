import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';
import { ButtonType } from 'src/utils/@globalTypes';

type ButtonProps = {
  title: string | ReactNode;
  disabled?: boolean;
  type: ButtonType;
  className?: string;
  onClick: any;
};

const btnStyles = {
  [ButtonType.PRIMARY]: styles.primaryBtn,
  [ButtonType.SECONDARY]: styles.secondaryBtn,
  [ButtonType.SMALL]: styles.small,
};

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  type,
  disabled,
  className,
}) => {
  const btnClassName = btnStyles[type];

  return (
    <div className={styles.wrapper}>
      <button
        onClick={disabled ? undefined : onClick}
        className={classNames(btnClassName, className, {
          [styles.disabledBtn]: disabled,
        })}>
        {title}
      </button>
    </div>
  );
};

export default Button;
