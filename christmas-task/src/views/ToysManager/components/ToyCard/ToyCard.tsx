import React, { FC } from 'react';

import styles from './ToyCard.scss';

interface IToyCard {
  img: string;
  name: string;
  amount: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export const ToyCard: FC<IToyCard> = ({
  img,
  name,
  amount,
  year,
  shape,
  color,
  size,
  favorite,
}) => {
  const a = 0;
  return (
    <div className={styles['card']}>
      <h2 className={styles['card__title']}>{name}</h2>
      <img className={styles['card__img']} src={img} alt="Christmas tree toy" />
      <div className={styles['card__desc']}>
        <p className={styles['card__prop']}>
          Количество:
          <span className={styles['card__val']}>{amount}</span>
        </p>
        <p className={styles['card__prop']}>
          Год покупки:
          <span className={styles['card__val']}>{year}</span>
        </p>
        <p className={styles['card__prop']}>
          Форма:
          <span className={styles['card__val']}>{shape}</span>
        </p>
        <p className={styles['card__prop']}>
          Цвет:
          <span className={styles['card__val']}>{color}</span>
        </p>
        <p className={styles['card__prop']}>
          Размер:
          <span className={styles['card__val']}>{size}</span>
        </p>
        <p className={styles['card__prop']}>
          Любимая:
          <span className={styles['card__val']}>{favorite ? 'да' : 'нет'}</span>
        </p>
      </div>
      <div className={styles['card__ribbon']} />
    </div>
  );
};
