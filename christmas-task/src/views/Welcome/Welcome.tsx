import React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

// import styles from './Welcome.scss';

export const Welcome = (): JSX.Element => (
  <React.Fragment>
    <Header/>
    Welcome
    <Footer/>
  </React.Fragment>
);
