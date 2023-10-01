import React, { useEffect, useState } from 'react';
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
import Button from 'src/components/Button';
import { DeleteIcon, EditIcon, SearchIcon } from 'src/assets/icons';
import { ButtonType, InputType, ModalWindowType } from 'src/utils/@globalTypes';
import { RoutesList } from '../Router';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import Input from 'src/components/Input';
import EmptyState from 'src/components/EmptyState';
import Loader from 'src/components/Loader';
import { TaskStatusTypes } from 'src/redux/types/boardTypes';
import { getTasksList } from 'src/redux/actions/tasksActions';

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const currentProject = useTypedSelector((state) => state.projects.currentProject);
  const isLoader = useTypedSelector((state) => state.page.isPageLoader);
  const taskStagesList = useTypedSelector((state) => state.board.taskStagesList);

  const tasksList: any = [];

  const [query, setQuery] = useState('');

  const onNewTaskBtnClick = () => {};

  const onSearchBtnClick = () => {};

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
    if (id) {
      dispatch(getSingleProject(+id));
      dispatch(getTasksList(+id));
    }
  }, [id]);

  useEffect(() => {
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
      {!isLoader ? (
        currentProject && (
          <>
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
            <div className={styles.searchWrapper}>
              <Input
                value={query}
                title="Поиск задачи"
                placeholder="Найти..."
                type={InputType.TEXT}
                className={styles.searchInput}
                onChange={setQuery}
              />
              <Button
                title={<SearchIcon />}
                className={styles.searchBtn}
                type={ButtonType.PRIMARY}
                onClick={onSearchBtnClick}
              />
            </div>
            <div className={styles.board}>
              {taskStagesList.map(({ id, title, items, statusType }) => {
                return (
                  <div key={id} className={styles.boardItem}>
                    <p>{title}</p>
                    <div className={styles.card}>
                      {statusType === TaskStatusTypes.Queue && items.length === 0 ? (
                        <EmptyState
                          title="Очередь задач пуста"
                          description="Создайте новую задачу"
                        />
                      ) : (
                        items.map(({ id, title }) => {
                          return <div key={id}>{title}</div>;
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </PageHeader>
  );
};

export default Tasks;
