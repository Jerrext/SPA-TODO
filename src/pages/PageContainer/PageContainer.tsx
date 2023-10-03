import React from 'react';
import styles from './PageContainer.module.scss';
import { Outlet } from 'react-router-dom';
import { ModalWindowType } from 'src/utils/@globalTypes';
import CreateProjectWindow from 'src/components/ModalWindow/CreateProjectWindow/CreateProjectWindow';
import { useTypedSelector } from 'src/utils/hooks';
import {
  PageSelectors,
  ProjectsSelectors,
  TasksSelectors,
} from 'src/redux/selectors/selectors';
import CreateTaskWindow from 'src/components/ModalWindow/CreateTaskWindow/CreateTaskWindow';

const PageContainer = () => {
  const modalWindowType = useTypedSelector(PageSelectors.getModalWindowType);
  const currentProject = useTypedSelector(ProjectsSelectors.getCurrentProject);
  // const taskStatusOptions = useTypedSelector(TasksSelectors.getTaskStatusOptions);
  const priorityOptions = useTypedSelector(TasksSelectors.getPriorityOptions);
  const taskNum = useTypedSelector(TasksSelectors.getTaskNum);

  const getCurrentWindow = () => {
    switch (modalWindowType) {
      case ModalWindowType.CreateProject:
        return <CreateProjectWindow currentProject={null} />;
      case ModalWindowType.EditProject:
        return <CreateProjectWindow currentProject={currentProject} />;
      case ModalWindowType.CreateTask:
        return (
          <CreateTaskWindow
            currentProjectId={currentProject?.id}
            taskNum={taskNum}
            priorityOptions={priorityOptions}
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
