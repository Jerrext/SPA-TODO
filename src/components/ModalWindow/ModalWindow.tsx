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
  btnTitle: string;
  onSubmit: () => void;
  isValid: boolean;
};

const ModalWindow: FC<ModalWindowProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
  isValid,
}) => {
  const dispatch = useDispatch();

  const isLoader = useTypedSelector((state) => state.page.isWindowLoader);

  const [visibility, setVisibility] = useState(false);

  const onCancelBtnClick = () => {
    dispatch(setModalWindowType(null));
  };

  useEffect(() => {
    setVisibility(true);
    return () => {
      setVisibility(false);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.overlay, {
          [styles.showOverlay]: visibility,
        })}
        onClick={onCancelBtnClick}></div>
      {isLoader ? (
        <Loader />
      ) : (
        <div
          className={classNames(styles.window, {
            [styles.showWindow]: visibility,
          })}>
          <h2 className={styles.title}>{title}</h2>
          {children}
          <div className={styles.btnWrapper}>
            <Button
              title={btnTitle}
              type={ButtonType.PRIMARY}
              onClick={onSubmit}
              disabled={isValid}
            />
            <Button
              title="Отмена"
              type={ButtonType.SECONDARY}
              onClick={onCancelBtnClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalWindow;
