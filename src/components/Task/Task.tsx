import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
import styles from './Task.module.scss';
import {
  Priority,
  PriorityTypes,
  TaskStatusTypes,
  TaskType,
} from 'src/redux/types/boardTypes';
import Button from '../Button/Button';
import { ButtonType } from 'src/utils/@globalTypes';
import { DeleteIcon, EditIcon } from 'src/assets/icons';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'src/redux/actions/boardActions';

type TaskProps = {
  projectId: number;
  task: TaskType;
  priorities: Priority;
};

const priorityStyles = {
  [PriorityTypes.Highest]: styles.highest,
  [PriorityTypes.High]: styles.high,
  [PriorityTypes.Medium]: styles.medium,
  [PriorityTypes.Low]: styles.low,
  [PriorityTypes.Lowest]: styles.lowest,
};

const Task: FC<TaskProps> = ({
  projectId,
  task: {
    title,
    // description,
    date_of_creation,
    end_date,
    priority,
    start_date,
    status,
    id,
    // projectId,
    num,
    // order,
  },
  priorities,
}) => {
  const dispatch = useDispatch();

  const priorityClassName = priorityStyles[priority];

  const onEditBtnClick = () => {};

  const onDeleteBtnClick = () => {
    dispatch(deleteTask({ id: projectId, data: id }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div>
          <p className={styles.num}>{num}</p>
        </div>
        <p className={styles.taskTitle}>{title}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.priority}>
          <p className={styles.title}>Приоритет:</p>
          <p className={classNames(priorityClassName, styles.title)}>
            {priorities[priority]}
          </p>
        </div>
        {status === TaskStatusTypes.Queue && (
          <div>
            <p className={styles.title}>Дата создания:</p>
            <p className={styles.date}>{date_of_creation}</p>
          </div>
        )}
        {status === TaskStatusTypes.Development && (
          <div>
            <p className={styles.title}>Время в работе:</p>
            <p className={styles.date}>{start_date}</p>
          </div>
        )}
        {status === TaskStatusTypes.Done && (
          <div>
            <p className={styles.title}>Дата окончания:</p>
            <p className={styles.date}>{end_date}</p>
          </div>
        )}
        <div className={styles.bntsWrapper}>
          <Button title={<EditIcon />} type={ButtonType.SMALL} onClick={onEditBtnClick} />
          <Button
            title={<DeleteIcon />}
            type={ButtonType.SMALL}
            onClick={onDeleteBtnClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
