import React from 'react';
import Lottie from 'lottie-react';
import styles from './Loader.module.scss';
import loader from 'src/assets/animations/loader.json';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Lottie style={{ width: 100, height: 100 }} animationData={loader} loop={true} />
    </div>
  );
};

export default Loader;
