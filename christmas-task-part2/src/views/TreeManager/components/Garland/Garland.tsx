/* eslint-disable react/no-array-index-key */
import classNames from 'classnames';

import React, { FC, useRef } from 'react';

import styles from './Garland.scss';

export enum GarlandColor {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Yellow = 'yellow',
  Rainbow = 'multicolor'
}

interface IGarland {
  color: GarlandColor;
}

export const Garland: FC<IGarland> = ({
  color,
}) => {
  const startDeg = 70;
  const finishDeg = 110;
  
  const container = useRef<HTMLDivElement>(null);
  const treeWidth = container.current?.clientWidth || 500;
  const treeHeight = container.current?.clientHeight || 714;
  
  const getLeds = (ledsNum: number, ropeNum: number, ropes: number) => 
    Array(ledsNum).fill(0).map((_, idx) => {
      const startAngleOffset = idx * ((finishDeg - startDeg) / (ledsNum - 1));
      const angle = startDeg + startAngleOffset;

      const firstRopeRadius = (treeHeight*0.8) / ropes + Math.sin(idx*0.6) * 1;
      const radius = ropeNum * firstRopeRadius + firstRopeRadius;

      const inlineStyle = {transform: `rotate(${angle}deg) translate(${radius}px)`};
  
      return <li key={idx} className={classNames(styles['led'], styles[color])} style={inlineStyle}/>;
    });

  const getLightRopes = (ropesNum: number) => Array(ropesNum).fill(0).map((_, idx) => {
    const inlineStyle = {width: `${treeWidth}px`, height: `${treeHeight}px`};

    return (
      <ul key={idx} className={styles['lightrope']} style={inlineStyle}>
        {getLeds(ropesNum*(idx+1), idx, ropesNum)}
      </ul>
    );
  });

  return (
    <div ref={container} className={styles['container']}>
      { getLightRopes(6) }
    </div>
  );
};
