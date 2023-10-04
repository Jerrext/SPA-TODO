import React, { FC, useEffect, useMemo, useState } from 'react';
import styles from './TaskInfoWindow.module.scss';
import ModalWindow from '../ModalWindow';
import Input from 'src/components/Input';
import {
  ButtonType,
  InputType,
  OptionType,
  OptionsListType,
} from 'src/utils/@globalTypes';
import { getNewStatusOptions, setFieldRequiredErrorText } from 'src/utils/helpers';
import { useDispatch } from 'react-redux';
import {
  СomputedProperty,
  SubtasksList,
  TaskStatusTypes,
  TaskType,
  PriorityTypes,
} from 'src/redux/types/boardTypes';
import SelectComponent from 'src/components/SelectComponent/SelectComponent';
import Button from 'src/components/Button/Button';
import EmptyState from 'src/components/EmptyState/EmptyState';
import classNames from 'classnames';

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

const priorityStyles = {
  [PriorityTypes.Highest]: styles.highest,
  [PriorityTypes.High]: styles.high,
  [PriorityTypes.Medium]: styles.medium,
  [PriorityTypes.Low]: styles.low,
  [PriorityTypes.Lowest]: styles.lowest,
};

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
  const [subtasksList, setSubtaskList] = useState<SubtasksList>([]);
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
  // const [status, setStatus] = useState('');
  const [subtaskPriority, setSubtaskPriority] = useState('');

  const [subtaskTitleError, setSubtaskTitleError] = useState('');
  // const [statusError, setStatusError] = useState('');
  const [subtaskPriorityError, setSubtaskPriorityError] = useState('');

  const [subtaskTitleTouched, setSubtaskTitleTouched] = useState(false);
  // const [statusTouched, setStatusTouched] = useState(false);
  const [subtaskPriorityTouched, setSubtaskPriorityTouched] = useState(false);

  //

  // const {
  //   title:,
  //   description,
  //   date_of_creation,
  //   end_date,
  //   priority,
  //   status,
  //   start_date,
  //   id,
  //   projectId,
  //   num,
  //   order,
  //   sub_tasks_list,
  //   comments,
  // } = currentTask;
  const priorityClassName = currentTask ? priorityStyles[currentTask.priority] : '';

  const isTaskInfoPage = modalWindowPage === PageType.TaskInfo;
  const isCreateSubtaskPage = modalWindowPage === PageType.CreateSubtask;

  const onEditTaskBtnClick = () => {
    setIsTaskEditing(true);
  };

  const onCreateSubTaskBtnClick = () => {
    setModalWindowPage(PageType.CreateSubtask);
  };

  const onSaveTaskBtnClick = () => {};

  const onSaveSubtaskBtnClick = () => {
    // if (currentTask) {
    setModalWindowPage(PageType.TaskInfo);
    setSubtaskList((list: any) => {
      return [
        ...list,
        {
          title: subtaskTitle,
          description: subtaskDescription,
          date_of_creation: '',
          end_date: '',
          priority: subtaskPriority,
          status: TaskStatusTypes.Queue,
          start_date: '',
          parentTaskId: 3,
          id: 0,
          num: 0,
          order: 0,
        },
      ];
      // list.push();
    });
    // }
  };

  // useEffect(() => {
  //   console.log(subtasksList);
  // }, [subtasksList]);

  const cancelTaskEditingHandler = () => {
    setIsTaskEditing(false);
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

  // const onSaveBtnClick = () => {};

  // useEffect(() => {
  //   if (currentTask) {
  //     const { title, priority: taskPriority, description } = currentTask;

  //     setTitle(title);
  //     setPriority(taskPriority.toString());
  //     setDescription(description);
  //   }
  // }, [currentTask]);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setPriority(currentTask.priority.toString());
      setTaskStatus(currentTask.status.toString());

      setSubtaskList(currentTask.sub_tasks_list);

      switch (currentTask.status) {
        case TaskStatusTypes.Queue:
          setNewStatusOptions(
            statusOptions.map((item) =>
              getNewStatusOptions(item, +item.value === TaskStatusTypes.Done),
            ),
          );
          break;
        case TaskStatusTypes.Development:
          setNewStatusOptions(
            statusOptions.map((item) =>
              getNewStatusOptions(item, +item.value === TaskStatusTypes.Queue),
            ),
          );
          break;
        case TaskStatusTypes.Done:
          setNewStatusOptions(
            statusOptions.map((item) =>
              getNewStatusOptions(item, +item.value !== TaskStatusTypes.Done),
            ),
          );
          break;
        default:
          setNewStatusOptions(currentTask.status);
      }
    }
  }, [currentTask]);

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
      title={isCreateSubtaskPage ? 'Создание подзадачи' : `Задача ${currentTask?.num}`}
      btnTitle={isTaskInfoPage ? 'Редактировать' : 'Сохранить'}
      onSubmit={
        isTaskInfoPage && !isTaskEditing
          ? onEditTaskBtnClick
          : isTaskInfoPage && isTaskEditing
          ? onSaveTaskBtnClick
          : onSaveSubtaskBtnClick
      }
      isValid={isValid}
      cancelHandler={
        isCreateSubtaskPage
          ? clearSubtaskFormHandler
          : isTaskInfoPage && isTaskEditing
          ? cancelTaskEditingHandler
          : undefined
      }
      cancelTitle={isTaskInfoPage && !isTaskEditing ? 'Закрыть' : 'Отмена'}
      classname={isTaskInfoPage ? styles.taskInfoWindow : undefined}>
      {isTaskInfoPage && currentTask && (
        <div className={styles.windowWrapper}>
          <div className={styles.column}>
            <div>
              <p className={styles.infoItemTitle}>Наименование:</p>
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
                <p className={styles.infoItemDescr}>{currentTask.title}</p>
              )}
            </div>
            <div>
              <p className={styles.infoItemTitle}>Описание:</p>
              {isTaskEditing ? (
                <Input
                  value={description}
                  placeholder="Опишите задачу"
                  type={InputType.TEXTAREA}
                  onChange={setDescription}
                />
              ) : (
                <p className={styles.infoItemDescr}>{currentTask.description}</p>
              )}
            </div>
            <div className={styles.row}>
              <div>
                <p className={styles.infoItemTitle}>Приоритет:</p>
                {isTaskEditing ? (
                  <SelectComponent
                    placeholder="Выберите приоритет задачи"
                    optionsList={priorityOptions}
                    currentValue={priority}
                    setSelecValue={setPriority}
                    isSearchable={false}
                  />
                ) : (
                  <p className={classNames(styles.infoItemDescr, priorityClassName)}>
                    {priorities[currentTask.priority]}
                  </p>
                )}
              </div>
              <div>
                <p className={styles.infoItemTitle}>Статус:</p>
                {isTaskEditing ? (
                  <SelectComponent
                    placeholder="Выберите статус задачи"
                    optionsList={newStatusOptions}
                    currentValue={taskStatus}
                    setSelecValue={setTaskStatus}
                    isSearchable={false}
                  />
                ) : (
                  <p className={styles.infoItemDescr}>{statuses[currentTask.status]}</p>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div>
                <p className={styles.infoItemTitle}>Дата создания:</p>
                <p className={styles.infoItemDescr}>{currentTask.date_of_creation}</p>
              </div>
              <div>
                <p className={styles.infoItemTitle}>Время в работе:</p>
                <p className={styles.infoItemDescr}>{currentTask.start_date}</p>
              </div>
              <div>
                <p className={styles.infoItemTitle}>Дата окончания:</p>
                <p className={styles.infoItemDescr}>{currentTask.end_date}</p>
              </div>
            </div>
          </div>

          <div className={styles.subtaskWrapper}>
            <div className={styles.subtaskHeader}>
              <p className={styles.infoItemTitle}>Подзадачи:</p>
              {isTaskEditing && (
                <Button
                  title="Создать подзадачу"
                  type={ButtonType.PRIMARY}
                  className={styles.subtaskBtn}
                  onClick={onCreateSubTaskBtnClick}
                />
              )}
            </div>
            <div className={styles.subtasksBoard}>
              {subtasksList.length > 0 ? (
                subtasksList.map((item: any) => {
                  return <div key={item.num}>{item.num}</div>;
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
