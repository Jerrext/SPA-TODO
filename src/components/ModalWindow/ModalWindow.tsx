import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './ModalWindow.module.scss';
import Button from '../Button';
import { ButtonType } from 'src/utils/@globalTypes';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import Loader from '../Loader/Loader';
import { useTypedSelector } from 'src/utils/hooks';

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  btnTitle?: string;
  onSubmit?: () => void;
  isValid?: boolean;
  cancelTitle?: string;
  cancelHandler?: () => void;
};

const ModalWindow: FC<ModalWindowProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  isValid,
  cancelHandler,
  cancelTitle,
}) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  const onCancelBtnClick = () => {
    dispatch(setModalWindowType(null));
  };

  useEffect(() => {
    setVisibility(true);
    document.body.style.overflow = 'hidden';
    return () => {
      setVisibility(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.overlay, {
          [styles.showOverlay]: visibility,
        })}
        onClick={onCancelBtnClick}></div>
      <div
        className={classNames(styles.window, {
          [styles.showWindow]: visibility,
        })}>
        <h2 className={styles.title}>{title}</h2>
        {children}
        <div className={styles.btnWrapper}>
          {btnTitle && onSubmit && (
            <Button
              title={btnTitle}
              type={ButtonType.PRIMARY}
              onClick={onSubmit}
              disabled={isValid}
            />
          )}
          <Button
            title={cancelTitle ? cancelTitle : 'Отмена'}
            type={ButtonType.SECONDARY}
            onClick={cancelHandler ? cancelHandler : onCancelBtnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
