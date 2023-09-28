import React, { FC } from 'react';
import { NoContentIcon } from '../../assets/icons';
import styles from './EmptyState.module.scss';

type EmptyStateProps = {
  title: string;
  description: string;
};

const EmptyState: FC<EmptyStateProps> = ({ title, description }) => {
  return (
    <div className={styles.container}>
      <NoContentIcon />
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default EmptyState;
