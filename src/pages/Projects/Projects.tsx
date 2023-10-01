import React, { useEffect } from 'react';
import styles from './Projects.module.scss';
import PageHeader from '../PageContainer/PageHeader';
import Project from 'src/components/Project/Project';
import { useDispatch } from 'react-redux';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import { ModalWindowType } from 'src/utils/@globalTypes';
import { getProjectsList } from 'src/redux/actions/projectsActions';
import { useTypedSelector } from 'src/utils/hooks';
import Loader from 'src/components/Loader/Loader';
import EmptyState from 'src/components/EmptyState/EmptyState';
import { PageSelectors, ProjectsSelectors } from 'src/redux/selectors/selectors';

const Projects = () => {
  const dispatch = useDispatch();

  const projectsList = useTypedSelector(ProjectsSelectors.getProjectsList);
  const isLoader = useTypedSelector(PageSelectors.getIsProjectsPageLoading);

  const onNewProjectBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.CreateProject));
  };

  useEffect(() => {
    dispatch(getProjectsList());
  }, []);

  return (
    <PageHeader title="Проекты" btnTitle="Новый проект" onClick={onNewProjectBtnClick}>
      <div className={styles.header}>
        <p className={styles.title}>Имя</p>
        <p className={styles.description}>Краткое описание</p>
        <p className={styles.supervisor}>Руководитель</p>
      </div>
      <div className={styles.body}>
        {isLoader ? (
          <Loader />
        ) : projectsList.length > 0 ? (
          projectsList.map(({ title, description, id, supervisor }) => {
            return (
              <Project
                key={id}
                id={id}
                title={title}
                description={description}
                supervisor={supervisor}
              />
            );
          })
        ) : (
          <EmptyState
            title="Список проектов пуст"
            description="Создайте свой первый проект"
          />
        )}
      </div>
    </PageHeader>
  );
};

export default Projects;
