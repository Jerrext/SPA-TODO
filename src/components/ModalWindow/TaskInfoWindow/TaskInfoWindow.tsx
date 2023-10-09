import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './TaskInfoWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import {
  ButtonType,
  InputType,
  ModalWindowType,
  OptionType,
  OptionsListType,
} from 'src/utils/@globalTypes';
import {
  getCurrentDate,
  getNewStatusOptions,
  setFieldRequiredErrorText,
} from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import {
  СomputedProperty,
  SubtasksList,
  TaskStatusTypes,
  TaskType,
  PriorityTypes,
  SubtaskType,
} from 'src/redux/types/boardTypes';
import SelectComponent from 'src/components/SelectComponent/SelectComponent';
import Button from 'src/components/Button/Button';
import EmptyState from 'src/components/EmptyState/EmptyState';
import classNames from 'classnames';
import {
  deleteTask,
  setCurrentSubtask,
  updateTask,
} from 'src/redux/actions/boardActions';
import Task from 'src/components/Task/Task';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import InfoItem from 'src/components/InfoItem/InfoItem';

type TaskInfoWindowProps = {
  currentTask: TaskType | null;
  // taskStatusOptions: OptionsListType;
  priorityOptions: OptionsListType;
  priorities: СomputedProperty;
  statusOptions: OptionsListType;
  statuses: СomputedProperty;
};

enum PageType {
  TaskInfo,
  CreateSubtask,
}

const TaskInfoWindow: FC<TaskInfoWindowProps> = ({
  currentTask,
  // taskStatusOptions,
  priorityOptions,
  priorities,
  statusOptions,
  statuses,
}) => {
  const dispatch = useDispatch();

  const [modalWindowPage, setModalWindowPage] = useState(PageType.TaskInfo);
  const [newStatusOptions, setNewStatusOptions] = useState<OptionsListType>();
  const [isTaskEditing, setIsTaskEditing] = useState(false);

  //

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState('');

  const [titleError, setTitleError] = useState('');

  const [titleTouched, setTitleTouched] = useState(false);

  //

  const [subtaskTitle, setsubtaskTitle] = useState('');
  const [subtaskDescription, setSubtaskDescription] = useState('');
  const [subtaskPriority, setSubtaskPriority] = useState('');

  const [subtaskTitleError, setSubtaskTitleError] = useState('');
  const [subtaskPriorityError, setSubtaskPriorityError] = useState('');

  const [subtaskTitleTouched, setSubtaskTitleTouched] = useState(false);
  const [subtaskPriorityTouched, setSubtaskPriorityTouched] = useState(false);

  //
  const isTaskInfoPage = modalWindowPage === PageType.TaskInfo;
  const isCreateSubtaskPage = modalWindowPage === PageType.CreateSubtask;

  // TASK CONSTANTS

  const isTitleChanged = title !== currentTask?.title;
  const isDescriptionChanged = description !== currentTask?.description;
  const isTaskStatusChanged = taskStatus !== currentTask?.status;
  const isPriorityChanged = priority !== currentTask?.priority;

  // TASK HANDLERS

  const setTaskFieldsValue = () => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setPriority(currentTask.priority);
      setTaskStatus(currentTask.status);

      switch (currentTask.status) {
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
          setNewStatusOptions(currentTask.status);
      }
    }
  };

  const cancelTaskEditingHandler = () => {
    setIsTaskEditing(false);
    setTitleError('');
  };

  const onSaveTaskBtnClick = () => {
    if (currentTask) {
      dispatch(
        updateTask({
          data: {
            taskId: currentTask.id,
            projectId: currentTask.projectId,
            data: {
              title: isTitleChanged ? title : undefined,
              description: isDescriptionChanged ? description : undefined,
              end_date:
                taskStatus === TaskStatusTypes.Done ? getCurrentDate() : undefined,
              priority: isPriorityChanged ? (priority as PriorityTypes) : undefined,
              status: isTaskStatusChanged ? (taskStatus as TaskStatusTypes) : undefined,
              start_date:
                taskStatus === TaskStatusTypes.Development ? getCurrentDate() : undefined,
              order: undefined,
            },
          },
          callback: () => setIsTaskEditing(false),
        }),
      );
    }
  };

  const onEditTaskBtnClick = () => {
    setIsTaskEditing(true);
    setTaskFieldsValue();
  };

  const onDeleteTaskBtnClick = () => {
    if (currentTask) {
      dispatch(
        deleteTask({
          data: { projectId: currentTask.projectId, taskId: currentTask.id },
          callback: () => dispatch(setModalWindowType(null)),
        }),
      );
    }
  };

  // SUBTASK HANDLERS

  const onOpenSubtaskBtnClick = (subtask: SubtaskType) => () => {
    dispatch(setCurrentSubtask(subtask));
    dispatch(setModalWindowType(ModalWindowType.SubtaskInfo));
  };

  const onDeleteSubtaskBtnClick = (deletedSubtaskId: number) => () => {
    if (currentTask) {
      const { id, projectId, sub_tasks_list } = currentTask;
      dispatch(
        updateTask({
          data: {
            taskId: id,
            projectId: projectId,
            data: {
              sub_tasks_list: sub_tasks_list.filter(
                (subtask) => subtask.id !== deletedSubtaskId,
              ),
            },
          },
        }),
      );
    }
  };

  const clearSubtaskFormHandler = () => {
    setModalWindowPage(PageType.TaskInfo);
    setsubtaskTitle('');
    setSubtaskDescription('');
    setSubtaskPriority('');

    setSubtaskTitleError('');
    setSubtaskPriorityError('');

    setSubtaskTitleTouched(false);
    setSubtaskPriorityTouched(false);
  };

  const onCreateSubTaskBtnClick = () => {
    setModalWindowPage(PageType.CreateSubtask);
  };

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
            setModalWindowPage(PageType.TaskInfo);
            clearSubtaskFormHandler();
          },
        }),
      );
    }
  };

  // useEffect(() => {
  //   console.log();
  // }, [subtasksList]);

  // const onSaveBtnClick = () => {};

  // useEffect(() => {
  //   if (currentTask) {
  //     const { title, priority: taskPriority, description } = currentTask;

  //     setTitle(title);
  //     setPriority(taskPriority.toString());
  //     setDescription(description);
  //   }
  // }, [currentTask]);

  // useEffect(() => {}, [currentTask]);

  useEffect(() => {
    setTaskFieldsValue();
  }, []);

  //TASK VALIDATION

  useEffect(() => {
    setFieldRequiredErrorText(titleTouched, title, setTitleError);
  }, [title, titleTouched]);

  const isTaskEditingValid = useMemo(() => {
    return titleError.length === 0 && title.length > 0;
  }, [titleError, title]);

  const isTaskFieldsChanged = useMemo(() => {
    if (currentTask) {
      return (
        isTitleChanged || isDescriptionChanged || isTaskStatusChanged || isPriorityChanged
      );
    }
  }, [currentTask, title, description, taskStatus, priority]);

  //SUBTASK VALIDATION

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

  // const isFieldsChanged = useMemo(() => {
  //   if (currentTask) {
  //     return (
  //       title !== currentTask.title ||
  //       description !== currentTask.description ||
  //       priority !== currentTask.priority.toString()
  //     );
  //   }
  // }, [currentTask, title, description, priority]);

  const isSubtaskValid = useMemo(() => {
    return (
      subtaskTitleError.length === 0 &&
      subtaskPriorityError.length === 0 &&
      subtaskTitle.length > 0 &&
      subtaskPriority.length > 0
    );
  }, [subtaskTitleError, subtaskPriorityError, subtaskTitle, subtaskPriority]);

  return (
    <ModalWindow
      title={isCreateSubtaskPage ? 'Создание подзадачи' : `Задача ${currentTask?.num}`}
      btnTitle={isTaskInfoPage && !isTaskEditing ? 'Редактировать' : 'Сохранить'}
      onSubmit={
        isTaskInfoPage && !isTaskEditing
          ? onEditTaskBtnClick
          : isTaskInfoPage && isTaskEditing
          ? onSaveTaskBtnClick
          : onSaveSubtaskBtnClick
      }
      isValid={
        isCreateSubtaskPage
          ? !isSubtaskValid
          : isTaskInfoPage && isTaskEditing
          ? !isTaskEditingValid || !isTaskFieldsChanged
          : undefined
      }
      cancelHandler={
        isCreateSubtaskPage
          ? clearSubtaskFormHandler
          : isTaskInfoPage && isTaskEditing
          ? cancelTaskEditingHandler
          : undefined
      }
      cancelTitle={isTaskInfoPage && !isTaskEditing ? 'Закрыть' : 'Отмена'}
      onDelete={isTaskInfoPage ? onDeleteTaskBtnClick : undefined}
      classname={isTaskInfoPage ? styles.taskInfoWindow : undefined}>
      {isTaskInfoPage && currentTask && (
        <div className={styles.windowWrapper}>
          <div className={styles.column}>
            <div>
              <InfoItem title="Наименование:" />
              {isTaskEditing ? (
                <Input
                  value={title}
                  placeholder="Введите название задачи"
                  type={InputType.TEXT}
                  onChange={setTitle}
                  onBlur={setTitleTouched}
                  errText={titleError}
                />
              ) : (
                <InfoItem description={currentTask.title} />
              )}
            </div>
            <div>
              <InfoItem title="Описание:" />
              {isTaskEditing ? (
                <Input
                  value={description}
                  placeholder="Опишите задачу"
                  type={InputType.TEXTAREA}
                  onChange={setDescription}
                />
              ) : (
                <InfoItem description={currentTask.description} emptyState="Пусто..." />
              )}
            </div>
            <div className={styles.row}>
              <div>
                <InfoItem title="Приоритет:" />
                {isTaskEditing ? (
                  <SelectComponent
                    placeholder="Выберите приоритет задачи"
                    optionsList={priorityOptions}
                    currentValue={priority}
                    setSelecValue={setPriority}
                    isSearchable={false}
                  />
                ) : (
                  <InfoItem
                    description={priorities[currentTask.priority]}
                    priority={currentTask.priority}
                  />
                )}
              </div>
              <div>
                <InfoItem title="Статус:" />
                {isTaskEditing ? (
                  <SelectComponent
                    placeholder="Выберите статус задачи"
                    optionsList={newStatusOptions}
                    currentValue={taskStatus}
                    setSelecValue={setTaskStatus}
                    isSearchable={false}
                  />
                ) : (
                  <InfoItem description={statuses[currentTask.status]} />
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <InfoItem
                  title="Дата создания:"
                  description={currentTask.date_of_creation}
                />
              </div>
              <div>
                <InfoItem title="Время в работе:" description={currentTask.start_date} />
              </div>
              <div>
                <InfoItem title="Дата окончания:" description={currentTask.end_date} />
              </div>
            </div>
          </div>

          <div className={styles.subtaskWrapper}>
            <div className={styles.subtaskHeader}>
              <InfoItem title="Подзадачи:" />
              <Button
                title="Создать подзадачу"
                type={ButtonType.PRIMARY}
                className={styles.subtaskBtn}
                onClick={onCreateSubTaskBtnClick}
              />
            </div>
            <div className={styles.subtasksBoard}>
              {currentTask.sub_tasks_list.length > 0 ? (
                currentTask.sub_tasks_list.map((subtask: SubtaskType) => {
                  return (
                    <Task
                      key={subtask.id}
                      task={subtask}
                      priorities={priorities}
                      onDeleteBtnClick={onDeleteSubtaskBtnClick(subtask.id)}
                      onOpenBtnClick={onOpenSubtaskBtnClick(subtask)}
                    />
                  );
                })
              ) : (
                <EmptyState
                  title="Список подзадач пуст"
                  description="Создайте подзадачу"
                />
              )}
            </div>
          </div>
        </div>
      )}
      {isCreateSubtaskPage && (
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
      )}
    </ModalWindow>
  );
};

export default TaskInfoWindow;
