import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import React from 'react';

import styles from './Welcome.scss';

import globalStyles from '../../assets/stylesheets/index.scss';

import { AppRoutes } from '@/enumerations';

export const Welcome = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <main className={classNames(globalStyles['main'], styles['main'])}>
      <div className={classNames(styles['ball'], styles['ball1'])} />
      <div className={classNames(styles['ball'], styles['ball2'])} />
      <h1 className={styles['title']}>Новогодняя игра<br/>«Наряди ёлку»</h1>
      <button className={styles['start-btn']} type='button' onClick={() => navigate(AppRoutes.ToysManager)}>Начать</button>
    </main>
  );
};
