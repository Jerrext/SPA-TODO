import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './CreateProjectWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import { InputType } from 'src/utils/@globalTypes';
import { setFieldRequiredErrorText } from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import {
  createSingleProject,
  updateSingleProject,
} from 'src/redux/actions/projectsActions';
import { Project } from 'src/redux/types/projectsTypes';

type CreateProjectWindowProps = {
  currentProject: Project | null;
};

const CreateProjectWindow: FC<CreateProjectWindowProps> = ({
  currentProject,
}) => {
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

  const onSaveBtnClick = () => {
    if (currentProject) {
      dispatch(
        updateSingleProject({
          id: currentProject.id,
          data: { title, description, supervisor },
        }),
      );
    }
  };

  useEffect(() => {
    if (currentProject) {
      const { title, supervisor, description } = currentProject;

      setTitle(title);
      setSupervisor(supervisor);
      setDescription(description);
    }
  }, [currentProject]);

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

  const isFieldsChanged = useMemo(() => {
    if (currentProject) {
      return (
        title !== currentProject.title ||
        description !== currentProject.description ||
        supervisor !== currentProject.supervisor
      );
    }
  }, [currentProject, title, description, supervisor]);

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
      title={currentProject ? currentProject.title : 'Создание проекта'}
      btnTitle={currentProject ? 'Сохранить' : 'Создать проект'}
      onSubmit={currentProject ? onSaveBtnClick : onCreateProjectBtnSubmit}
      isValid={!isValid || (!!currentProject && !isFieldsChanged)}>
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
