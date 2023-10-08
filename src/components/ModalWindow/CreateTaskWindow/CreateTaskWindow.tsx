import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './CreateTaskWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import { InputType, OptionsListType } from 'src/utils/@globalTypes';
import { getCurrentDate, setFieldRequiredErrorText } from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import SelectComponent from 'src/components/SelectComponent';
import { createTask } from 'src/redux/actions/boardActions';
import { PriorityTypes, TaskStatusTypes } from 'src/redux/types/boardTypes';

type CreateTaskWindowProps = {
  priorityOptions: OptionsListType;
  currentProjectId?: number;
  taskNum: number;
};

const CreateTaskWindow: FC<CreateTaskWindowProps> = ({
  priorityOptions,
  currentProjectId,
  taskNum,
}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const [titleError, setTitleError] = useState('');
  const [priorityError, setPriorityError] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);
  const [priorityTouched, setPriorityTouched] = useState(false);

  const onCreateTaskBtnSubmit = () => {
    currentProjectId &&
      dispatch(
        createTask({
          id: currentProjectId,
          data: {
            title,
            description,
            priority: priority as PriorityTypes,
            date_of_creation: getCurrentDate(),
            end_date: '—',
            start_date: '—',
            status: TaskStatusTypes.Queue,
            num: taskNum,
            order: taskNum,
          },
        }),
      );
  };

  useEffect(() => {
    setFieldRequiredErrorText(titleTouched, title, setTitleError);
  }, [title, titleTouched]);

  useEffect(() => {
    setFieldRequiredErrorText(priorityTouched, priority, setPriorityError);
  }, [priority, priorityTouched]);

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
      title={'Создание задачи'}
      btnTitle={'Создать задачу'}
      onSubmit={onCreateTaskBtnSubmit}
      isValid={!isValid}>
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
