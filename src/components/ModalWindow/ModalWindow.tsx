import React, { FC, ReactNode } from 'react'
import styles from './ModalWindow.module.scss'
import Button from '../Button'
import { ButtonType } from 'src/utils/@globalTypes'

type ModalWindowProps = {
  title: string
  children: ReactNode
  btnTitle: string
  onSubmit: () => void
}

const ModalWindow: FC<ModalWindowProps> = ({
  title,
  children,
  btnTitle,
  onSubmit,
}) => {
  const onCancelBtnClick = () => {}
  return (
    <div className={styles.container}>
      <div className={styles.overlay} onClick={onCancelBtnClick}></div>
      <div className={styles.window}>
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
  )
}

export default ModalWindow
