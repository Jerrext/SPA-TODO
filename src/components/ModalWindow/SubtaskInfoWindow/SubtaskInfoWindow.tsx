import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './SubtaskInfoWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import { InputType, ModalWindowType, OptionsListType } from 'src/utils/@globalTypes';
import {
  getCurrentDate,
  getNewStatusOptions,
  setFieldRequiredErrorText,
} from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import {
  СomputedProperty,
  TaskStatusTypes,
  SubtaskType,
  TaskType,
  PriorityTypes,
} from 'src/redux/types/boardTypes';
import SelectComponent from 'src/components/SelectComponent';
import InfoItem from 'src/components/InfoItem';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import { setCurrentSubtask, updateTask } from 'src/redux/actions/boardActions';

type SubtaskInfoWindowProps = {
  currentSubtask: SubtaskType | null;
  currentTask: TaskType | null;
  priorityOptions: OptionsListType;
  priorities: СomputedProperty;
  statusOptions: OptionsListType;
  statuses: СomputedProperty;
};

const SubtaskInfoWindow: FC<SubtaskInfoWindowProps> = ({
  currentSubtask,
  priorityOptions,
  priorities,
  statusOptions,
  statuses,
  currentTask,
}) => {
  const dispatch = useDispatch();

  const [newStatusOptions, setNewStatusOptions] = useState<OptionsListType>();
  const [isSubtaskEditing, setIsSubtaskEditing] = useState(false);

  //

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  const [titleError, setTitleError] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);

  const isTitleChanged = title !== currentSubtask?.title;
  const isDescriptionChanged = description !== currentSubtask?.description;
  const isTaskStatusChanged = taskStatus !== currentSubtask?.status;
  const isPriorityChanged = priority !== currentSubtask?.priority;

  const setSubtaskFieldsValue = () => {
    if (currentSubtask) {
      setTitle(currentSubtask.title);
      setDescription(currentSubtask.description);
      setPriority(currentSubtask.priority);
      setTaskStatus(currentSubtask.status);

      switch (currentSubtask.status) {
        case TaskStatusTypes.Queue:
          setNewStatusOptions(
            statusOptions.map((item) =>
              getNewStatusOptions(item, item.value === TaskStatusTypes.Done),
            ),
          );
          break;
        case TaskStatusTypes.Development:
          setNewStatusOptions(
            statusOptions.map((item) =>
              getNewStatusOptions(item, item.value === TaskStatusTypes.Queue),
            ),
          );
          break;
        case TaskStatusTypes.Done:
          setNewStatusOptions(
            statusOptions.map((item) =>
              getNewStatusOptions(item, item.value !== TaskStatusTypes.Done),
            ),
          );
          break;
        default:
          setNewStatusOptions(currentSubtask.status);
      }
    }
  };

  const onSaveSubtaskBtnClick = () => {
    if (currentTask && currentSubtask) {
      const { id, projectId, sub_tasks_list } = currentTask;
      const newCurrentSubtask: SubtaskType = {
        id: currentSubtask.id,
        parentTaskId: currentSubtask.parentTaskId,
        title,
        description,
        end_date:
          taskStatus === TaskStatusTypes.Done
            ? getCurrentDate()
            : currentSubtask.end_date,
        date_of_creation: currentSubtask.date_of_creation,
        num: currentSubtask.num,
        priority: priority as PriorityTypes,
        status: taskStatus as TaskStatusTypes,
        start_date:
          taskStatus === TaskStatusTypes.Development
            ? getCurrentDate()
            : currentSubtask.start_date,
        order: 0,
      };

      dispatch(
        updateTask({
          data: {
            taskId: id,
            projectId: projectId,
            data: {
              sub_tasks_list: sub_tasks_list.map((subtask) =>
                subtask.id === currentSubtask.id ? newCurrentSubtask : subtask,
              ),
            },
            currentSubtask: newCurrentSubtask,
          },
          callback: () => setIsSubtaskEditing(false),
        }),
      );
    }
  };

  const cancelSubtaskEditingHandler = () => {
    setIsSubtaskEditing(false);
    setTitleError('');
  };

  const onEditSubtaskBtnClick = () => {
    setIsSubtaskEditing(true);
    setSubtaskFieldsValue();
  };

  const onDeleteSubtaskBtnClick = () => {
    if (currentTask) {
      const { id, projectId, sub_tasks_list } = currentTask;
      dispatch(
        updateTask({
          data: {
            taskId: id,
            projectId: projectId,
            data: {
              sub_tasks_list: sub_tasks_list.filter(
                (subtask) => subtask.id !== currentSubtask?.id,
              ),
            },
          },
          callback: () => dispatch(setModalWindowType(ModalWindowType.TaskInfo)),
        }),
      );
    }
  };

  const onBackBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.TaskInfo));
  };

  useEffect(() => {
    setSubtaskFieldsValue();
    return () => {
      dispatch(setCurrentSubtask(null));
    };
  }, []);

  useEffect(() => {
    setFieldRequiredErrorText(titleTouched, title, setTitleError);
  }, [title, titleTouched]);

  const isFieldsChanged = useMemo(() => {
    if (currentSubtask) {
      return (
        isTitleChanged || isDescriptionChanged || isTaskStatusChanged || isPriorityChanged
      );
    }
  }, [currentSubtask, title, description, taskStatus, priority]);

  const isValid = useMemo(() => {
    return titleError.length === 0 && title.length > 0;
  }, [titleError, title]);

  return (
    <ModalWindow
      title={`Подзадача ${currentSubtask?.num}`}
      btnTitle={!isSubtaskEditing ? 'Редактировать' : 'Сохранить'}
      onSubmit={!isSubtaskEditing ? onEditSubtaskBtnClick : onSaveSubtaskBtnClick}
      isValid={isSubtaskEditing ? !isValid || !isFieldsChanged : false}
      cancelHandler={!isSubtaskEditing ? onBackBtnClick : cancelSubtaskEditingHandler}
      cancelTitle={!isSubtaskEditing ? 'Назад' : 'Отмена'}
      onDelete={onDeleteSubtaskBtnClick}>
      {currentSubtask && (
        <div className={styles.windowWrapper}>
          <div className={styles.column}>
            <div>
              <InfoItem title="Наименование:" />
              {isSubtaskEditing ? (
                <Input
                  value={title}
                  placeholder="Введите название подзадачи"
                  type={InputType.TEXT}
                  onChange={setTitle}
                  onBlur={setTitleTouched}
                  errText={titleError}
                />
              ) : (
                <InfoItem description={currentSubtask.title} />
              )}
            </div>
            <div>
              <InfoItem title="Описание:" />
              {isSubtaskEditing ? (
                <Input
                  value={description}
                  placeholder="Опишите подзадачу"
                  type={InputType.TEXTAREA}
                  onChange={setDescription}
                />
              ) : (
                <InfoItem
                  description={currentSubtask.description}
                  emptyState="Пусто..."
                />
              )}
            </div>
            <div className={styles.row}>
              <div>
                <InfoItem title="Приоритет:" />
                {isSubtaskEditing ? (
                  <SelectComponent
                    placeholder="Выберите приоритет подзадачи"
                    optionsList={priorityOptions}
                    currentValue={priority}
                    setSelecValue={setPriority}
                    isSearchable={false}
                  />
                ) : (
                  <InfoItem description={priorities[currentSubtask.priority]} />
                )}
              </div>
              <div>
                <InfoItem title="Статус:" />
                {isSubtaskEditing ? (
                  <SelectComponent
                    placeholder="Выберите статус подзадачи"
                    optionsList={newStatusOptions}
                    currentValue={taskStatus}
                    setSelecValue={setTaskStatus}
                    isSearchable={false}
                  />
                ) : (
                  <InfoItem description={statuses[currentSubtask.status]} />
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <InfoItem
                  title="Дата создания:"
                  description={currentSubtask.date_of_creation}
                />
              </div>
              <div>
                <InfoItem
                  title="Время в работе:"
                  description={currentSubtask.start_date}
                />
              </div>
              <div>
                <InfoItem title="Дата окончания:" description={currentSubtask.end_date} />
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalWindow>
  );
};

export default SubtaskInfoWindow;
