/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';

import styles from './Snow.scss';

export const Snow: FC = () => (
  <div className={styles['snowflakes']}>
    {Array(50).fill(0).map((_,idx) => <i key={idx}/>)}
  </div>
);
