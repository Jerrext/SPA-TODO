import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Task.module.scss';
import {
  СomputedProperty,
  PriorityTypes,
  TaskStatusTypes,
  TaskType,
  SubtaskType,
} from 'src/redux/types/boardTypes';
import Button from '../Button/Button';
import { ButtonType } from 'src/utils/@globalTypes';
import { DeleteIcon, InfoIcon } from 'src/assets/icons';
import InfoItem from '../InfoItem/InfoItem';

type TaskProps = {
  task: TaskType | SubtaskType;
  priorities: СomputedProperty;
  onOpenBtnClick?: () => void;
  onDeleteBtnClick?: () => void;
};

const Task: FC<TaskProps> = ({ task, priorities, onOpenBtnClick, onDeleteBtnClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div>
          <p className={styles.num}>{task.num}</p>
        </div>
        <p className={styles.taskTitle}>{task.title}</p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.priority}>
          <p className={styles.title}>Приоритет:</p>
          <InfoItem
            description={priorities[task.priority]}
            priority={task.priority}
            classname={styles.title}
          />
        </div>
        {task.status === TaskStatusTypes.Queue && (
          <div>
            <p className={styles.title}>Дата создания:</p>
            <p className={styles.date}>{task.date_of_creation}</p>
          </div>
        )}
        {task.status === TaskStatusTypes.Development && (
          <div>
            <p className={styles.title}>Время в работе:</p>
            <p className={styles.date}>{task.start_date}</p>
          </div>
        )}
        {task.status === TaskStatusTypes.Done && (
          <div>
            <p className={styles.title}>Дата окончания:</p>
            <p className={styles.date}>{task.end_date}</p>
          </div>
        )}
        <div className={styles.bntsWrapper}>
          <Button title={<InfoIcon />} type={ButtonType.SMALL} onClick={onOpenBtnClick} />
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
