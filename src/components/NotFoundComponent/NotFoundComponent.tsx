import React from 'react';
import Lottie from 'lottie-react';
import styles from './NotFoundComponent.module.scss';
import notFound from 'src/assets/animations/notFound.json';

const NotFoundComponent = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <Lottie
        style={{ width: 500, height: 300 }}
        animationData={notFound}
        loop={true}
      />
    </div>
  );
};

export default NotFoundComponent;
