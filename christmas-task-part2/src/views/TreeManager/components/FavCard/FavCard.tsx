/* eslint-disable no-param-reassign */
import classNames from 'classnames';

import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './FavCard.scss';

interface IFavCard {
  amount: number;
  imageHref: string;
}

export const FavCard: FC<IFavCard> = ({
  amount,
  imageHref,
}) => {
  
  const [toyInstances, setToyInstances] = useState(amount);
  const toy = useRef<HTMLImageElement>(null);
  const inArea = useRef<boolean>(false);
  const shift = useRef<{x: number; y: number}>({x: 0, y: 0});
  
  useEffect(() => {
    if(!toy.current) {
      return;
    }

    const droppableArea = document.querySelector('#dropArea');
    
    function moveAt(elem: HTMLElement, pageX: number, pageY: number, shiftX = 0, shiftY = 0) {
      if(!elem || !droppableArea) {
        return;
      }

      const rect = droppableArea.getBoundingClientRect();
      elem.style.left = `${pageX - rect.x - shiftX}px`;
      elem.style.top = `${pageY - rect.y - shiftY}px`;
    }
    
    toy.current.onmouseover = () => {
      if(!toy.current) {
        return;
      }
      
      const clone = toy.current.cloneNode() as HTMLElement;
      const parent = toy.current.parentElement;

      if(!parent) {
        return;
      }

      parent.append(clone);
      clone.onmouseleave = () => clone.parentElement === parent && clone.remove();
      clone.ondragstart = () => false;
      clone.style.position = 'absolute';
      clone.style.zIndex = '1000';
      clone.style.width = `${toy.current.getBoundingClientRect().width}px`;
      clone.style.height = `${toy.current.getBoundingClientRect().height}px`;
      
      function onMouseMove(event2: MouseEvent) {
        moveAt(clone, event2.pageX, event2.pageY, shift.current.x, shift.current.y);
        
        clone.hidden = true;
        const elemBelow = document.elementFromPoint(event2.clientX, event2.clientY);
        clone.hidden = false;
        
        if (!elemBelow) return;
        
        const droppableBelow = elemBelow.closest('area') as HTMLElement;
        if(droppableBelow) {
          inArea.current = true;
          clone.style.cursor = 'move';
        } else {
          clone.style.cursor = 'no-drop';
          inArea.current = false;
        }
      }

      clone.onmousedown = (event: MouseEvent) => {
        if(!droppableArea) {
          return;
        }

        shift.current.x = event.clientX - clone.getBoundingClientRect().left;
        shift.current.y = event.clientY - clone.getBoundingClientRect().top;

        droppableArea.append(clone);
      
        moveAt(clone, event.pageX, event.pageY, shift.current.x, shift.current.y);
      
        document.addEventListener('mousemove', onMouseMove);
      };
  
      clone.onmouseup = () => {
        if(!clone) {
          return;
        }
  
        clone.style.cursor = 'move';
  
        if(!inArea.current) {
          clone.remove();
          if (clone.getAttribute('setted')) {
            setToyInstances(prev => prev + 1);
          }
        } else if (!clone.getAttribute('setted')) {
          clone.setAttribute('setted', 'true');
          setToyInstances(prev => prev - 1);
        }
  
        document.removeEventListener('mousemove', onMouseMove);
      };
    };
    
  }, [toy, toyInstances]);

  return (
    <div className={classNames(styles['fav-card'])}>
      <span className={styles['fav-card__amount']}>{toyInstances}</span>
      {toyInstances > 0 && 
        <img ref={toy} className={styles['fav-card__toy']} src={imageHref} alt="" />
      }
    </div>
  );
};
