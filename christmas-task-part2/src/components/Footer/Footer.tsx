import React, { FC } from 'react';

import styles from './Footer.scss';

export const Footer: FC = () => (
  <footer className={styles['footer']}>
    <div className={styles['footer-container']}>
      <div className={styles['footer-data']}>
        <p className={styles['copyright']}>©</p>
        <p className={styles['year']}>2021</p>
        <a className={styles['github']} href="https://github.com/livwvil">livwvil</a>
      </div>
      <a className={styles['rs-logo']} href="https://rs.school/js/"> </a>
    </div>
  </footer>
);
