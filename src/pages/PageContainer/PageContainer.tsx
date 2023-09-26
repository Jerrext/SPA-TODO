import React from 'react';
import styles from './PageContainer.module.scss';
import { Outlet } from 'react-router-dom';

const PageContainer = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default PageContainer;
