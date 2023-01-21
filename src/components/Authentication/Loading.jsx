import React from 'react';
import PropTypes from 'prop-types';
import styles from "./auth.module.css"

const Loading = props => {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayDoor}/>
      <div className={ styles.overlayContent }>
        <div className={ styles.loader }>
          <div className={ styles.inner } />
        </div>
      </div>
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
