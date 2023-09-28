import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './ModalWindow.module.scss';
import Button from '../Button';
import { ButtonType } from 'src/utils/@globalTypes';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setModalWindowType } from 'src/redux/actions/modalWindowActions';

type ModalWindowProps = {
  title: string;
  children: ReactNode;
  btnTitle: string;
  onSubmit: () => void;
};

const ModalWindow: FC<ModalWindowProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
}) => {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);

  const onCancelBtnClick = () => {
    dispatch(setModalWindowType(null));
  };

  // const submitHandler = () => {
  //   onCancelBtnClick();
  // };

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
          />
          <Button
            title="Отмена"
            type={ButtonType.SECONDARY}
            onClick={onCancelBtnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
