import React, { useEffect } from 'react';
import styles from './NotFound.module.scss';
import { useNavigate } from 'react-router-dom';
import NotFoundComponent from 'src/components/NotFoundComponent/NotFoundComponent';
import Button from 'src/components/Button/Button';
import { ButtonType } from 'src/utils/@globalTypes';
import { RoutesList } from '../Router';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from 'src/redux/actions/pageActions';
import { PageTypes } from 'src/redux/types/pageTypes';

const NotFound = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onBackHomeBtnClick = () => {
    navigate(RoutesList.Home);
  };

  useEffect(() => {
    dispatch(setCurrentPage(PageTypes.NotFound));
  }, []);

  return (
    <div className={styles.wrapper}>
      <div>
        <NotFoundComponent />
        <h1 className={styles.title}>Страница не найдена</h1>
      </div>
      <Button
        title="Вернуться на главную"
        type={ButtonType.PRIMARY}
        onClick={onBackHomeBtnClick}
      />
    </div>
  );
};

export default NotFound;
