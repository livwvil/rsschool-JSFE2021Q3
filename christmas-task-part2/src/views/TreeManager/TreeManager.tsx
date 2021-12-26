import classNames from 'classnames';

import React, { useEffect, useState } from 'react';

import styles from './TreeManager.scss';
import { FavCard } from './components/FavCard/FavCard';

import globalStyles from '../../assets/stylesheets/index.scss';

import { CustomCheckbox } from '@/components/CustomCheckbox';
import { ShapeStyle } from '@/components/CustomCheckbox/CustomCheckbox';
import { Header } from '@/components/Header';
import { IToy, useToysLoader } from '@/hooks/useToysLoader';

export const TreeManager = (): JSX.Element => {
  const [toys, setToys] = useState<IToy[]>([]);
  const [toysLoader] = useToysLoader();

  useEffect(() => {
    const pickedToys = localStorage.getItem('pickedToys');
    const parsedPickedToys = pickedToys !== null ? JSON.parse(pickedToys) as IToy[] : null;
    if(parsedPickedToys && parsedPickedToys.length !== 0) {
      // console.log('restored');
      setToys(parsedPickedToys);
    } else {
      toysLoader((newToys: IToy[]) => {
        // console.log('loaded');
        setToys(newToys.filter((_, idx) => idx < 20));
      });
    }
  }, []);
  
  return (
    <React.Fragment>
      <Header/>
      <main className={globalStyles['main']}>
        <div className={globalStyles['blur-container']}>
          <div className={styles['wrapper']}>

            <aside className={styles['panel']}>
              <section className={styles['panel__section']}>
                <h2 className={styles['panel__section-title']}>Опции</h2>
                <div className={styles['panel__section-content']}>
                  <CustomCheckbox shapeStyle={ShapeStyle.Audio}/>
                  <CustomCheckbox shapeStyle={ShapeStyle.Snowflake}/>
                </div>
              </section>

              <section className={styles['panel__section']}>
                <h2 className={styles['panel__section-title']}>Выберите ёлку</h2>
                <div className={styles['panel__section-content']}>
                  <div className={classNames(styles['tree-style'], styles['tree-style-1'], styles['selected'])}/>
                  <div className={classNames(styles['tree-style'], styles['tree-style-2'])}/>
                  <div className={classNames(styles['tree-style'], styles['tree-style-3'])}/>
                  <div className={classNames(styles['tree-style'], styles['tree-style-4'])}/>
                  <div className={classNames(styles['tree-style'], styles['tree-style-5'])}/>
                  <div className={classNames(styles['tree-style'], styles['tree-style-6'])}/>
                </div>
              </section>

              <section className={styles['panel__section']}>
                <h2 className={styles['panel__section-title']}>Выберите фон</h2>
                <div className={styles['panel__section-content']}>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-1'], styles['selected'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-2'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-3'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-4'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-5'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-6'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-7'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-8'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-9'])}/>
                  <div className={classNames(styles['tree-bg'], styles['tree-bg-10'])}/>
                </div>
              </section>

              <section className={styles['panel__section']}>
                <h2 className={styles['panel__section-title']}>Выберите гирлянду</h2>

              </section>
            </aside>

            <div className={classNames(styles['christmas-tree'], styles['tree-bg-1'])}>
              <div />
            </div>

            <aside className={styles['panel']}>
              <section className={styles['panel__section']}>
                <h2 className={styles['panel__section-title']}>Игрушки</h2>
                <div className={styles['panel__section-content']}>
                  { toys.map(toy => (<FavCard key={toy.num} amount={toy.amount} imageHref={toy.img}/>)) }
                </div>
              </section>

              {/* <section className={styles['panel__section']}>
              <h2 className={styles['panel__section-title']}>Вы нарядили</h2>
              <div className={styles['panel__section-content']} />
            </section> */}
            </aside>

          </div>
        </div>
      </main>
    </React.Fragment>
  );
};
