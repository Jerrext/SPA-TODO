import React, { FC } from 'react';
import styles from './Project.module.scss';
import { ArrowIcon, DeleteIcon, EditIcon } from 'src/assets/icons';
import Button from '../Button/Button';
import { ButtonType, ModalWindowType } from 'src/utils/@globalTypes';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setModalWindowType } from 'src/redux/actions/pageActions';
import { deleteSingleProject } from 'src/redux/actions/projectsActions';

type ProjectProps = {
  id: number;
  title: string;
  description: string;
  supervisor: string;
};

const Project: FC<ProjectProps> = ({ title, description, supervisor, id }) => {
  const dispatch = useDispatch();

  const onEditBtnClick = () => {
    dispatch(setModalWindowType(ModalWindowType.CreateProject));
  };
  const onDeleteBtnClick = () => {
    dispatch(deleteSingleProject({ data: id }));
  };
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <p className={styles.supervisor}>{supervisor}</p>
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
        <Link to={`/${id}/tasks`} className={styles.arrow}>
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
};

export default Project;
