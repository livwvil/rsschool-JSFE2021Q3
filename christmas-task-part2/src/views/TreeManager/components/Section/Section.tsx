import React, { FC } from 'react';

import styles from './Section.scss';

interface ISection {
  header: string;
  children: React.ReactNode;
}

export const Section: FC<ISection> = ({
  header,
  children,
}) => (
  <section className={styles['section']}>
    <h2 className={styles['section__title']}>{header}</h2>
    <div className={styles['section__content']}>
      {children}
    </div>
  </section>
);
