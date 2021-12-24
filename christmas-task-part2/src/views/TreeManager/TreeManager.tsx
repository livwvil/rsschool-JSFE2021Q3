import React from 'react';

// import styles from './TreeManager.scss';

import globalStyles from '../../assets/stylesheets/index.scss';

import { Header } from '@/components/Header';

export const TreeManager = (): JSX.Element => (
  <React.Fragment>
    <Header favToysNumber={0}/>
    <main className={globalStyles['main']}>
      <div className={globalStyles['blur-container']}>
        TreeManager
      </div>
    </main>
  </React.Fragment>
);
