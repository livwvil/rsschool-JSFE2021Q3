import classNames from 'classnames';

import React, { FC } from 'react';

import styles from './Stack.scss';

interface IStack {
  children: React.ReactNode;
  isVertical?: boolean;
}

export const Stack: FC<IStack> = ({
  children,
  isVertical,
}) => (
  <div className={isVertical ? classNames(styles['stack'], styles['v']) : classNames(styles['stack'], styles['h'])}>
    {children}
  </div>
);
