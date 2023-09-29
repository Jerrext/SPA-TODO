import React, { useEffect } from 'react';
import styles from './Tasks.module.scss';
import PageHeader from '../PageContainer/PageHeader';
import { useTypedSelector } from 'src/utils/hooks';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  deleteSingleProject,
  getSingleProject,
  setCurrentProject,
} from 'src/redux/actions/projectsActions';
import Button from 'src/components/Button/Button';
import { DeleteIcon, EditIcon } from 'src/assets/icons';
import { ButtonType, ModalWindowType } from 'src/utils/@globalTypes';
import { RoutesList } from '../Router';
import {
  setCurrentPage,
  setModalWindowType,
} from 'src/redux/actions/pageActions';
import { PageTypes } from 'src/redux/types/pageTypes';

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentProject = useTypedSelector(
    (state) => state.projects.currentProject,
  );

  const onNewTaskBtnClick = () => {};

  const onEditBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.EditProject));
  };

  const onDeleteBtnClick = () => {
    currentProject &&
      dispatch(
        deleteSingleProject({
          data: currentProject.id,
          callback: () => {
            navigate(RoutesList.Home);
          },
        }),
      );
  };

  useEffect(() => {
    id && dispatch(getSingleProject({ id: +id, data: { isPage: true } }));
  }, [id]);

  useEffect(() => {
    dispatch(setCurrentPage(PageTypes.Tasks));
    return () => {
      dispatch(setCurrentProject(null));
    };
  }, []);

  return (
    <PageHeader
      title="Задачи"
      btnTitle="Новая задача"
      onClick={onNewTaskBtnClick}
      isHomeBtn>
      {currentProject && (
        <div className={styles.projectsInfo}>
          <div className={styles.title}>
            <p>Проект:</p>
            <p>{currentProject.title}</p>
          </div>
          <div className={styles.description}>
            <p>Описание:</p>
            <p>{currentProject.description}</p>
          </div>
          <div className={styles.supervisor}>
            <p>Руководитель:</p>
            <p>{currentProject.supervisor}</p>
          </div>
          <div className={styles.btnsWrapper}>
            <Button
              title={<EditIcon />}
              type={ButtonType.SMALL}
              onClick={onEditBtnClick}
            />
            <Button
              title={<DeleteIcon />}
              type={ButtonType.SMALL}
              onClick={onDeleteBtnClick}
            />
          </div>
        </div>
      )}
    </PageHeader>
  );
};

export default Tasks;
