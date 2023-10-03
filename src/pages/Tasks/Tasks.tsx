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
import { getTasksList } from 'src/redux/actions/boardActions';
import {
  PageSelectors,
  ProjectsSelectors,
  TasksSelectors,
} from 'src/redux/selectors/selectors';
import Task from 'src/components/Task/Task';

const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const currentProject = useTypedSelector(ProjectsSelectors.getCurrentProject);
  const isLoading = useTypedSelector(PageSelectors.getIsTasksPageLoading);
  const taskStagesList = useTypedSelector(TasksSelectors.getTasksStagesList);
  const priorities = useTypedSelector(TasksSelectors.getPriorities);

  // useEffect(() => {
  //   console.log(priorities);
  // }, [priorities]);

  const [query, setQuery] = useState('');

  const onNewTaskBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.CreateTask));
  };

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
    if (projectId) {
      dispatch(getSingleProject(+projectId));
      dispatch(getTasksList(+projectId));
    }
  }, [projectId]);

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
      {!isLoading && projectId ? (
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
              {taskStagesList.map(({ id: stageId, title, items, statusType }) => {
                return (
                  <div key={stageId} className={styles.boardItem}>
                    <p className={styles.statusTitle}>{title}</p>
                    <div className={styles.card}>
                      {statusType === TaskStatusTypes.Queue && items.length === 0 ? (
                        <EmptyState
                          title="Очередь задач пуста"
                          description="Создайте новую задачу"
                        />
                      ) : (
                        items.map((task) => {
                          return (
                            <Task
                              key={task.id}
                              projectId={+projectId}
                              task={task}
                              priorities={priorities}
                            />
                          );
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
