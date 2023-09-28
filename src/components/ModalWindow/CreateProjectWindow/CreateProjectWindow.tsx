import React, { FC, useEffect, useState } from 'react';
import styles from './CreateProjectWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input/Input';
import { InputType } from 'src/utils/@globalTypes';
import { setFieldRequiredErrorText } from 'src/utils/helpers';

type CreateProjectWindowProps = {};

const CreateProjectWindow: FC<CreateProjectWindowProps> = ({}) => {
  const [title, setTitle] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [description, setDescription] = useState('');

  const [titleError, setTitleError] = useState('');
  const [supervisorError, setSupervisorError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);
  const [supervisorTouched, setSupervisorTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  const onCreateProjectBtnSubmit = () => {};

  useEffect(() => {
    setFieldRequiredErrorText(titleTouched, title, setTitleError);
  }, [title, titleTouched]);

  useEffect(() => {
    setFieldRequiredErrorText(
      supervisorTouched,
      supervisor,
      setSupervisorError,
    );
  }, [supervisor, supervisorTouched]);

  useEffect(() => {
    setFieldRequiredErrorText(
      descriptionTouched,
      description,
      setDescriptionError,
    );
  }, [description, descriptionTouched]);

  return (
    <ModalWindow
      title="Создание проекта"
      btnTitle="Создать проект"
      onSubmit={onCreateProjectBtnSubmit}>
      <div className={styles.row}>
        <Input
          value={title}
          title="Название проекта"
          placeholder="Введите название проекта"
          type={InputType.TEXT}
          onChange={setTitle}
          onBlur={setTitleTouched}
          errText={titleError}
          required
        />
        <Input
          value={supervisor}
          title="Руководитель проекта"
          placeholder="Введите имя"
          type={InputType.TEXT}
          onChange={setSupervisor}
          onBlur={setSupervisorTouched}
          errText={supervisorError}
          required
        />
      </div>
      <Input
        value={description}
        title="Описание проекта (кратко)"
        placeholder="Опишите проект"
        type={InputType.TEXTAREA}
        onChange={setDescription}
        onBlur={setDescriptionTouched}
        errText={descriptionError}
      />
    </ModalWindow>
  );
};

export default CreateProjectWindow;
