import React, { FC } from 'react';

import styles from './CustomSelect.scss';

export interface IOption{
  name: string;
  value?: unknown;
}

interface ICustomCheckbox {
  onChange: (option: IOption) => void;
  options: IOption[];
  selected: IOption;
}

export const CustomSelect: FC<ICustomCheckbox> = ({
  onChange,
  options,
  selected,
}) => {
  
  const onSelectedItemChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLSelectElement;
    const optionText = target.selectedOptions[0].innerText;
    onChange(options.find(option => option.name === optionText) as IOption);
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <select className={styles['select']} onChange={onSelectedItemChanged} defaultValue={selected.name}>
      {
        // eslint-disable-next-line react/no-array-index-key
        options.map((option, idx) => <option key={idx} value={option.name}>{option.name}</option>)
      }
    </select>
  );
};
