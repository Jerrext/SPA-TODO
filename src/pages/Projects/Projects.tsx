import React, { useEffect, useState } from 'react';
import styles from './Projects.module.scss';
import PageHeader from '../PageContainer/PageHeader';
import Project from 'src/components/Project/Project';
import { useDispatch } from 'react-redux';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import { ModalWindowType } from 'src/utils/@globalTypes';
import { getProjects } from 'src/redux/actions/projectsActions';
import { useTypedSelector } from 'src/utils/hooks';
import { Link } from 'react-router-dom';
import Loader from 'src/components/Loader/Loader';

const Projects = () => {
  const dispatch = useDispatch();

  const projectsList = useTypedSelector((state) => state.projects.projectsList);
  const isLoader = useTypedSelector((state) => state.page.isLoader);

  const onNewProjectBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.CreateProject));
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <PageHeader
      title="Проекты"
      btnTitle="Новый проект"
      onClick={onNewProjectBtnClick}>
      <div className={styles.header}>
        <p className={styles.title}>Имя</p>
        <p className={styles.description}>Краткое описание</p>
        <p className={styles.supervisor}>Руководитель</p>
      </div>
      <div className={styles.body}>
        {isLoader ? (
          <Loader />
        ) : (
          projectsList.map(({ title, description, id, supervisor }) => {
            return (
              <Link key={id} to={`${id}/tasks`}>
                <Project
                  title={title}
                  description={description}
                  supervisor={supervisor}
                />
              </Link>
            );
          })
        )}
      </div>
    </PageHeader>
  );
};

export default Projects;
