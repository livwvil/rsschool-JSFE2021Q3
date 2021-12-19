/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import nextId from 'react-id-generator';

import React, { FC } from 'react';

import styles from './CustomCheckbox.scss';

export enum ShapeStyle {
  BigBall = 'checkbox__shape_big-ball',
  MidBall = 'checkbox__shape_mid-ball',
  SmallBall = 'checkbox__shape_small-ball',
  Bell = 'checkbox__shape_bell',
  Cone = 'checkbox__shape_cone',
  Snowflake = 'checkbox__shape_snowflake',
  Toy = 'checkbox__shape_toy',
}

export enum Color {
  White = 'checkbox__label_white',
  Yellow = 'checkbox__label_yellow',
  Red = 'checkbox__label_red',
  Blue = 'checkbox__label_blue',
  Green = 'checkbox__label_green',
}

interface ICustomCheckbox {
  onCheckedChange?: (value: unknown) => void;
  shapeStyle?: ShapeStyle;
  color?: Color;
  checked?: boolean;
  value?: unknown;
}

export const CustomCheckbox: FC<ICustomCheckbox> = ({
  onCheckedChange,
  shapeStyle,
  color,
  checked,
  value,
}) => {
  const id = nextId('custom-checkbox');

  const classes = shapeStyle
    ? classNames(styles['checkbox__shape'], styles[shapeStyle.toString()])
    : color 
      ? classNames(styles['checkbox__label'], styles[color.toString()])
      : styles['checkbox__label'];

  return (
    <div className={styles['checkbox']}>
      <input className={styles['checkbox__input']} type="checkbox" id={id} onChange={() => onCheckedChange && onCheckedChange(value)} checked={checked}/>      
      <label className={classes} htmlFor={id} />
    </div>
  );
};
