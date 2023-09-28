import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './CreateProjectWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input/Input';
import { InputType } from 'src/utils/@globalTypes';
import { setFieldRequiredErrorText } from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import { createSingleProject } from 'src/redux/actions/projectsActions';

type CreateProjectWindowProps = {};

const CreateProjectWindow: FC<CreateProjectWindowProps> = ({}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [description, setDescription] = useState('');

  const [titleError, setTitleError] = useState('');
  const [supervisorError, setSupervisorError] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);
  const [supervisorTouched, setSupervisorTouched] = useState(false);

  const onCreateProjectBtnSubmit = () => {
    dispatch(createSingleProject({ title, description, supervisor }));
  };

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

  const isValid = useMemo(() => {
    return (
      titleError.length === 0 &&
      supervisorError.length === 0 &&
      title.length > 0 &&
      supervisor.length > 0
    );
  }, [titleError, supervisorError, title, supervisor]);

  return (
    <ModalWindow
      title="Создание проекта"
      btnTitle="Создать проект"
      onSubmit={onCreateProjectBtnSubmit}
      isValid={isValid}>
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
      />
    </ModalWindow>
  );
};

export default CreateProjectWindow;
