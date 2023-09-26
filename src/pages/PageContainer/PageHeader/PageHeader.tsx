import React, { FC, ReactNode } from 'react';
import styles from './PageHeader.module.scss';
import Button from 'src/components/Button';
import { ButtonType } from 'src/utils/@globalTypes';

type PageHeaderProps = {
  title: string;
  btnTitle: string;
  onClick: () => void;
  children: ReactNode;
};

const PageHeader: FC<PageHeaderProps> = ({
  title,
  btnTitle,
  onClick,
  children,
}) => {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>{title}</h1>
        <Button title={btnTitle} type={ButtonType.PRIMARY} onClick={onClick} />
      </div>
      <div className={styles.pageContent}>{children}</div>
    </>
  );
};

export default PageHeader;
