import React, { FC, useEffect } from 'react';
import styles from './InfoItem.module.scss';
import { PriorityTypes } from 'src/redux/types/boardTypes';
import classNames from 'classnames';

type InfoItemProps = {
  title?: string;
  description?: string;
  priority?: PriorityTypes;
  classname?: string;
  emptyState?: string;
};

const priorityStyles = {
  [PriorityTypes.Highest]: styles.highest,
  [PriorityTypes.High]: styles.high,
  [PriorityTypes.Medium]: styles.medium,
  [PriorityTypes.Low]: styles.low,
  [PriorityTypes.Lowest]: styles.lowest,
};

const InfoItem: FC<InfoItemProps> = ({
  title,
  description,
  priority,
  classname,
  emptyState = '',
}) => {
  const priorityClassName = priority ? priorityStyles[priority] : '';

  const text = description ? description : emptyState;

  return (
    <>
      {title && <p className={styles.infoItemTitle}>{title}</p>}
      {(description || emptyState) && (
        <p
          className={classNames(classname, {
            [styles.infoItemDescr]: !classname,
            [priorityClassName]: !!priority,
            [styles.empty]: !!emptyState && !description,
          })}>
          {text}
        </p>
      )}
    </>
  );
};

export default InfoItem;
