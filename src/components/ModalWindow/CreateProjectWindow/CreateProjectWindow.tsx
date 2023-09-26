import React, { FC } from 'react'
import styles from './CreateProjectWindow.module.scss'
import ModalWindow from '../ModalWindow'

type CreateProjectWindowProps = {}

const CreateProjectWindow: FC<CreateProjectWindowProps> = ({}) => {
  const onCreateProjectBtnSubmit = () => {}

  return (
    <ModalWindow
      title="Создание проекта"
      btnTitle="Создать проект"
      onSubmit={onCreateProjectBtnSubmit}>
      <div></div>
    </ModalWindow>
  )
}

export default CreateProjectWindow
