import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import React, { FC, useState } from 'react';

import styles from './Header.scss';

import { AppRoutes } from '@/enumerations';

interface INavItem {
  name: string;
  url: AppRoutes;
}

interface IHeader {
  favToysNumber?: number;
  onSearch?: (query: string) => void;
}

export const Header: FC<IHeader> = ({
  favToysNumber,
  onSearch,
}) => {
  const { pathname } = useLocation();
  const [ searchQuery, setSearchQuery ] = useState('');

  const navItems: INavItem[] = [
    {
      name: 'Игрушки',
      url: AppRoutes.ToysManager,
    },
    {
      name: 'Ёлка',
      url: AppRoutes.TreeManager,
    },
  ];

  const searchPlaceholder = 'Поиск';

  const onSearchInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if(onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <nav className={styles['nav-bar']}>
          <Link to={AppRoutes.Welcome} className={classNames(styles['nav-bar__logo'], styles['nav-bar__link'])} />
          {
            // eslint-disable-next-line react/no-array-index-key
            navItems.map((navItem, idx) => <Link key={idx} to={navItem.url} className={classNames(styles['nav-bar__link'], navItem.url===pathname ? styles['nav-bar__link_active']: '')}>{navItem.name}</Link>)
          }
        </nav>
        <div className={styles['header-controls']}>
          <div className={styles['search-container']}>
            {
            // eslint-disable-next-line jsx-a11y/no-autofocus
              <input type="search" className={styles['input']} placeholder={searchPlaceholder} value={searchQuery} autoComplete='false' onChange={onSearchInputChanged} autoFocus/>
            }
            <span className={styles['submit']}/>
          </div>
          <div className={styles['counter']}>
            <span className={styles['inner']}>{favToysNumber}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
