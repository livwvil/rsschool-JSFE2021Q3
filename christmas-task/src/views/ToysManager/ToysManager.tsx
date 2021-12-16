/* eslint-disable react/no-array-index-key */
import React, { FC , useState } from 'react';

import styles from './ToysManager.scss';
import { ToyCard } from './components/ToyCard';

import globalStyles from '../../assets/stylesheets/index.scss';

import { Header } from '@/components/Header';

export const ToysManager: FC = () => {
  const [, setQ] = useState('');
  const some = (s: string) => {
    setQ(s);
  };

  return (
    <React.Fragment>
      <Header onSearch={some} favToysNumber={0}/>
      <main className={globalStyles['main']}>
        <div className={globalStyles['blur-container']}>
          <div className={styles['controls']}>
            w
          </div>
          <div className={styles['cards-container']}>
            {
              Array(15).fill(0).map((_, idx) =>
                <ToyCard
                  key={idx}
                  img='../../static/toys/1.png'
                  name='Зелёный шар с цветами'
                  amount={5}
                  year={2007}
                  shape='куб'
                  color='зеленый'
                  size='большой'
                  favorite={false}
                />)
            }
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};
