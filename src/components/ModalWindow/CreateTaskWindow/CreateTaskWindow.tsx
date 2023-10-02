import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './CreateTaskWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import { InputType, OptionsListType } from 'src/utils/@globalTypes';
import { setFieldRequiredErrorText } from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import {
  createSingleProject,
  updateSingleProject,
} from 'src/redux/actions/projectsActions';
import { Project } from 'src/redux/types/projectsTypes';
import { TaskType } from 'src/redux/types/boardTypes';
import SelectComponent from 'src/components/SelectComponent/SelectComponent';

type CreateTaskWindowProps = {
  currentTask: TaskType | null;
  // taskStatusOptions: OptionsListType;
  priorityOptions: OptionsListType;
};

const CreateTaskWindow: FC<CreateTaskWindowProps> = ({
  currentTask,
  // taskStatusOptions,
  priorityOptions,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const [titleError, setTitleError] = useState('');
  // const [statusError, setStatusError] = useState('');
  const [priorityError, setPriorityError] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);
  // const [statusTouched, setStatusTouched] = useState(false);
  const [priorityTouched, setPriorityTouched] = useState(false);

  const onCreateTaskBtnSubmit = () => {};

  const onSaveBtnClick = () => {};

  useEffect(() => {
    if (currentTask) {
      const { title, priority: taskPriority, description } = currentTask;

      setTitle(title);
      setPriority(taskPriority.toString());
      setDescription(description);
    }
  }, [currentTask]);

  useEffect(() => {
    setFieldRequiredErrorText(titleTouched, title, setTitleError);
  }, [title, titleTouched]);

  useEffect(() => {
    setFieldRequiredErrorText(priorityTouched, priority, setPriorityError);
  }, [priority, priorityTouched]);

  const isFieldsChanged = useMemo(() => {
    if (currentTask) {
      return (
        title !== currentTask.title ||
        description !== currentTask.description ||
        priority !== currentTask.priority.toString()
      );
    }
  }, [currentTask, title, description, priority]);

  const isValid = useMemo(() => {
    return (
      titleError.length === 0 &&
      priorityError.length === 0 &&
      title.length > 0 &&
      priority.length > 0
    );
  }, [titleError, priorityError, title, priority]);

  return (
    <ModalWindow
      title={currentTask ? 'Редактирование задачи' : 'Создание задачи'}
      btnTitle={currentTask ? 'Сохранить' : 'Создать задачу'}
      onSubmit={currentTask ? onSaveBtnClick : onCreateTaskBtnSubmit}
      isValid={!isValid || (!!currentTask && !isFieldsChanged)}>
      <div className={styles.column}>
        <div className={styles.row}>
          <Input
            value={title}
            title="Название задачи"
            placeholder="Введите название задачи"
            type={InputType.TEXT}
            onChange={setTitle}
            onBlur={setTitleTouched}
            errText={titleError}
            required
          />
          <SelectComponent
            title="Приоритет"
            placeholder="Выберите приоритет задачи"
            optionsList={priorityOptions}
            currentValue={priority}
            setSelecValue={setPriority}
            errText={priorityError}
            onBlur={setPriorityTouched}
            isSearchable={false}
            required
          />
        </div>
        <Input
          value={description}
          title="Описание задачи"
          placeholder="Опишите задачу"
          type={InputType.TEXTAREA}
          onChange={setDescription}
        />
      </div>
    </ModalWindow>
  );
};

export default CreateTaskWindow;
