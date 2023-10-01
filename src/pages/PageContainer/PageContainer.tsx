import React from 'react';
import styles from './PageContainer.module.scss';
import { Outlet } from 'react-router-dom';
import { ModalWindowType } from 'src/utils/@globalTypes';
import CreateProjectWindow from 'src/components/ModalWindow/CreateProjectWindow/CreateProjectWindow';
import { useTypedSelector } from 'src/utils/hooks';
import { PageSelectors, ProjectsSelectors } from 'src/redux/selectors/selectors';

const PageContainer = () => {
  const modalWindowType = useTypedSelector(PageSelectors.getModalWindowType);
  const currentProject = useTypedSelector(ProjectsSelectors.getCurrentProject);

  const getCurrentWindow = () => {
    switch (modalWindowType) {
      case ModalWindowType.CreateProject:
        return <CreateProjectWindow currentProject={null} />;
      case ModalWindowType.EditProject:
        return <CreateProjectWindow currentProject={currentProject} />;
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
