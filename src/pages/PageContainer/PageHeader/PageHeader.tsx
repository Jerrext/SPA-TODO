import React, { FC, ReactNode } from 'react';
import styles from './PageHeader.module.scss';
import Button from 'src/components/Button';
import { ButtonType } from 'src/utils/@globalTypes';
import { HomeIcon } from 'src/assets/icons';
import { RoutesList } from 'src/pages/Router';
import { Link } from 'react-router-dom';

type PageHeaderProps = {
  title: string;
  btnTitle: string;
  onClick: () => void;
  children: ReactNode;
  isHomeBtn?: boolean;
};

const PageHeader: FC<PageHeaderProps> = ({
  title,
  btnTitle,
  onClick,
  children,
  isHomeBtn,
}) => {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>{title}</h1>
        <div className={styles.btnsWrapper}>
          <Button
            title={btnTitle}
            type={ButtonType.PRIMARY}
            onClick={onClick}
          />
          {isHomeBtn && (
            <Link to={RoutesList.Home} className={styles.backBtn}>
              <HomeIcon />
            </Link>
          )}
        </div>
      </div>
      <div className={styles.pageContent}>{children}</div>
    </>
  );
};

export default PageHeader;
