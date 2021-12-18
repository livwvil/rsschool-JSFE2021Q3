import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import React, { FC, useEffect, useRef } from 'react';

import styles from './CustomRangeSlider.scss';

export interface IRangeChange {
  from?: number;
  to?: number;
}

interface ICustomRangeSlider {
  onChange: (value: IRangeChange) => void;
  from: number;
  to: number;
}

export const CustomRangeSlider: FC<ICustomRangeSlider> = ({
  onChange,
  from,
  to,
}) => {
  const sliderDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!sliderDiv.current) {
      return  () => {};
    }

    const slider = noUiSlider.create(sliderDiv.current, {
      start: [from, to],
      connect: true,
      step: 1,
      range: {
        'min': from,
        'max': to,
      },
      cssClasses: {
        ...noUiSlider.cssClasses,
        handle: styles['noUi-custom-handle'].replace('noUi-', ''),
        connect: styles['noUi-custom-connect'].replace('noUi-', ''),
        connects: styles['noUi-custom-connects'].replace('noUi-', ''),
        target: styles['noUi-custom-target'].replace('noUi-', ''),
      },
    });
    
    slider.on('update', (values, handle) => {
      const val = parseFloat(values[handle].toString());
      
      if(!sliderDiv.current) {
        return;
      }
  
      if(handle === 0) {
        const fromOutputElem = sliderDiv.current.previousElementSibling as HTMLOutputElement;
        if(fromOutputElem) {
          fromOutputElem.value = Math.ceil(val).toString();
        }
  
        onChange({from: val});
      }
      else {
        const toOutputElem = sliderDiv.current.nextElementSibling as HTMLOutputElement;
        if(toOutputElem) {
          toOutputElem.value = Math.ceil(val).toString();
        }
  
        onChange({to: val});
      }
    });

    return () => slider.destroy();
  }, [sliderDiv, onChange, from, to]);

  return (
    <div className={styles['range-slider']}>
      <output className={styles['range-slider__output']}>q</output>
      <div className={styles['range-slider__container']} ref={sliderDiv} />
      <output className={styles['range-slider__output']}>q</output>
    </div>
  );
};
