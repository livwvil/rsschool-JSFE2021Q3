import React, { FC } from 'react';

import styles from './CustomSelect.scss';

export interface IOption{
  name: string;
}

interface ICustomCheckbox {
  onChange: (option: IOption) => void;
  options: IOption[];
}

export const CustomSelect: FC<ICustomCheckbox> = ({
  onChange,
  options,
}) => {
  
  const onSelectedItemChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    const option = target.selectedOptions[0];
    onChange({name: option.innerText});
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <select className={styles['select']} onChange={onSelectedItemChanged}>
      {
        // eslint-disable-next-line react/no-array-index-key
        options.map((option, idx) => <option key={idx}>{option.name}</option>)
      }
    </select>
  );
};
