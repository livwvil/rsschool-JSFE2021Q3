import React from 'react';

import globalStyles from '../../assets/stylesheets/index.scss';

import { Header } from '@/components/Header';

// import styles from './Welcome.scss';

export const Welcome = (): JSX.Element => (
  <React.Fragment>
    <Header  favToysNumber={0}/>
    <main className={globalStyles['main']}>
      Welcome
    </main>
  </React.Fragment>
);
