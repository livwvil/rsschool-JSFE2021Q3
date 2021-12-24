import classNames from 'classnames';

import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './useToast.scss';

export const useToast = (): [FC, (message: string) => void] => {
  const toast = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<{text: string}>();
  const [classes, setClasses] = useState(classNames(styles['toast'], styles['active']));
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClasses(styles['toast']);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [message]);

  const invoke = (msg: string) => {
    setClasses(classNames(styles['toast'], styles['active']));
    setMessage({text: msg});
  };
  
  return [
    () => message
      ? (
        <div ref={toast} className={classes}>
          <span>{message.text}</span>
        </div>
      )
      // eslint-disable-next-line react/jsx-no-useless-fragment
      : <React.Fragment />,
    invoke,
  ];
};
