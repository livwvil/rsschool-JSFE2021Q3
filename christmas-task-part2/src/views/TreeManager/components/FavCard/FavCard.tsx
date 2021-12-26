import classNames from 'classnames';

import React, { FC } from 'react';

import styles from './FavCard.scss';

interface IFavCard {
  amount: number;
  imageHref: string;
}

export const FavCard: FC<IFavCard> = ({
  amount,
  imageHref,
}) => (
  <div className={classNames(styles['fav-card'])}>
    <span className={styles['fav-card__amount']}>{amount}</span>
    <img className={styles['fav-card__toy']} src={imageHref} alt="" />
  </div>
);
