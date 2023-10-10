import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './CreateSubtaskWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import { InputType, ModalWindowType, OptionsListType } from 'src/utils/@globalTypes';
import { getCurrentDate, setFieldRequiredErrorText } from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import SelectComponent from 'src/components/SelectComponent';
import { updateTask } from 'src/redux/actions/boardActions';
import { PriorityTypes, TaskStatusTypes, TaskType } from 'src/redux/types/boardTypes';
import { setModalWindowType } from 'src/redux/actions/pageActions';

type CreateSubtaskWindowProps = {
  currentTask: TaskType | null;
  priorityOptions: OptionsListType;
};

const CreateSubtaskWindow: FC<CreateSubtaskWindowProps> = ({
  currentTask,
  priorityOptions,
}) => {
  const dispatch = useDispatch();

  const [subtaskTitle, setsubtaskTitle] = useState('');
  const [subtaskDescription, setSubtaskDescription] = useState('');
  const [subtaskPriority, setSubtaskPriority] = useState('');

  const [subtaskTitleError, setSubtaskTitleError] = useState('');
  const [subtaskPriorityError, setSubtaskPriorityError] = useState('');

  const [subtaskTitleTouched, setSubtaskTitleTouched] = useState(false);
  const [subtaskPriorityTouched, setSubtaskPriorityTouched] = useState(false);

  const onSaveSubtaskBtnClick = () => {
    if (currentTask) {
      const { id, projectId, sub_tasks_list } = currentTask;
      const subtaskId = sub_tasks_list.map((item) => item.id);
      const subtaskNumbers = sub_tasks_list.map((item) => item.num);

      dispatch(
        updateTask({
          data: {
            taskId: id,
            projectId: projectId,
            data: {
              sub_tasks_list: [
                ...sub_tasks_list,
                {
                  title: subtaskTitle,
                  description: subtaskDescription,
                  date_of_creation: getCurrentDate(),
                  end_date: '—',
                  priority: subtaskPriority as PriorityTypes,
                  status: TaskStatusTypes.Queue,
                  start_date: '—',
                  parentTaskId: currentTask?.id,
                  id: sub_tasks_list.length > 0 ? Math.max(...subtaskId) + 1 : 0,
                  num: sub_tasks_list.length > 0 ? Math.max(...subtaskNumbers) + 1 : 1,
                  order: 0,
                },
              ],
            },
          },
          callback: () => {
            dispatch(setModalWindowType(ModalWindowType.TaskInfo));
          },
        }),
      );
    }
  };

  const onCancelSubTaskBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.TaskInfo));
  };

  useEffect(() => {
    setFieldRequiredErrorText(subtaskTitleTouched, subtaskTitle, setSubtaskTitleError);
  }, [subtaskTitle, subtaskTitleTouched]);

  useEffect(() => {
    setFieldRequiredErrorText(
      subtaskPriorityTouched,
      subtaskPriority,
      setSubtaskPriorityError,
    );
  }, [subtaskPriority, subtaskPriorityTouched]);

  const isValid = useMemo(() => {
    return (
      subtaskTitleError.length === 0 &&
      subtaskPriorityError.length === 0 &&
      subtaskTitle.length > 0 &&
      subtaskPriority.length > 0
    );
  }, [subtaskTitleError, subtaskPriorityError, subtaskTitle, subtaskPriority]);

  return (
    <ModalWindow
      title={'Создание подзадачи'}
      btnTitle={'Создать подзадачу'}
      onSubmit={onSaveSubtaskBtnClick}
      cancelHandler={onCancelSubTaskBtnClick}
      isValid={!isValid}>
      <div className={styles.column}>
        <div className={styles.row}>
          <Input
            value={subtaskTitle}
            title="Название подзадачи"
            placeholder="Введите название подзадачи"
            type={InputType.TEXT}
            onChange={setsubtaskTitle}
            onBlur={setSubtaskTitleTouched}
            errText={subtaskTitleError}
            required
          />
          <SelectComponent
            title="Приоритет"
            placeholder="Выберите приоритет подзадачи"
            optionsList={priorityOptions}
            currentValue={subtaskPriority}
            setSelecValue={setSubtaskPriority}
            errText={subtaskPriorityError}
            onBlur={setSubtaskPriorityTouched}
            isSearchable={false}
            required
          />
        </div>
        <Input
          value={subtaskDescription}
          title="Описание подзадачи"
          placeholder="Опишите подзадачу"
          type={InputType.TEXTAREA}
          onChange={setSubtaskDescription}
        />
      </div>
    </ModalWindow>
  );
};

export default CreateSubtaskWindow;
