import React from 'react';
import styles from './PageContainer.module.scss';
import { Outlet } from 'react-router-dom';
import { ModalWindowType } from 'src/utils/@globalTypes';
import CreateProjectWindow from 'src/components/ModalWindow/CreateProjectWindow/CreateProjectWindow';
import { useTypedSelector } from 'src/utils/hooks';

const PageContainer = () => {
  const modalWindowType = useTypedSelector(
    (state) => state.page.modalWindowType,
  );
  const currentProject = useTypedSelector(
    (state) => state.projects.currentProject,
  );
  const currentPage = useTypedSelector((state) => state.page.currentPage);

  const getCurrentWindow = () => {
    switch (modalWindowType) {
      case ModalWindowType.CreateProject:
        return <CreateProjectWindow currentProject={null} />;
      case ModalWindowType.EditProject:
        return (
          <CreateProjectWindow
            currentProject={currentProject}
            currentPage={currentPage}
          />
        );
      default:
        return;
    }
  };
  return (
    <div className={styles.container}>
      <Outlet />
      {getCurrentWindow()}
    </div>
  );
};

export default PageContainer;
