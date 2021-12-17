import classNames from 'classnames';

import React, { FC , useCallback, useState } from 'react';

import styles from './ToysManager.scss';
import { ToyCard } from './components/ToyCard';
import { IToy } from './components/ToyCard/ToyCard';

import globalStyles from '../../assets/stylesheets/index.scss';

import { CustomCheckbox } from '@/components/CustomCheckbox';
import { ShapeStyle, Color } from '@/components/CustomCheckbox/CustomCheckbox';
import { CustomRangeSlider } from '@/components/CustomRangeSlider';
import { CustomSelect } from '@/components/CustomSelect';
import { IOption } from '@/components/CustomSelect/CustomSelect';
import { Header } from '@/components/Header';

export const ToysManager: FC = () => {
  const [, setSearchQuery] = useState('');
  const [toys, setToys] = useState([
    {
      img: '../../static/toys/1.png',
      name: 'Зелёный шар с цветами',
      amount: 5,
      year: 2007,
      shape: 'куб',
      color: 'зеленый',
      size: 'большой',
      favorite: false,
    },
    {
      img: '../../static/toys/1.png',
      name: 'Зелёный шар с цветами',
      amount: 5,
      year: 2007,
      shape: 'куб',
      color: 'зеленый',
      size: 'большой',
      favorite: false,
    },
  ]);

  const options: IOption[] = [
    {
      name: 'По названию от «А» до «Я»',
    },
    {
      name: 'По названию от «Я» до «А»',
    },
    {
      name: 'По количеству по возрастанию',
    },
    {
      name: 'По количеству по убыванию',
    },
  ];

  const onSearchQueryChanged = useCallback(
    (query: string) => {
      setSearchQuery(query);
    },
    []
  );

  const onToyFavoriteStatusChanged = useCallback(
    (changedToy: IToy) => {
      setToys(prevToys => [...prevToys.map(prevToy => {
        if(prevToy === changedToy) {
          return {...prevToy, favorite: !prevToy.favorite};
        }
        return {...prevToy};
      })]);
    },
    []
  );

  const onSomething = useCallback(
    // eslint-disable-next-line no-console
    some => console.log(some),
    []
  );

  return (
    <React.Fragment>
      <Header onSearch={onSearchQueryChanged} favToysNumber={toys.filter(toy => toy.favorite).length}/>

      <main className={globalStyles['main']}>
        <div className={globalStyles['blur-container']}>

          <section className={styles['controls']}>

            <section className={classNames(styles['control-bar'], styles['value-filter'])}>
              <h2 className={styles['control-bar__title']}>Фильтры по значению</h2>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__shapes'])}>
                Форма:
                <CustomCheckbox shapeStyle={ShapeStyle.MidBall}/>
                <CustomCheckbox shapeStyle={ShapeStyle.Bell}/>
                <CustomCheckbox shapeStyle={ShapeStyle.Cone}/>
                <CustomCheckbox shapeStyle={ShapeStyle.Snowflake}/>
                <CustomCheckbox shapeStyle={ShapeStyle.Toy}/>
              </div>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__colors'])}>
                Цвет:
                <CustomCheckbox color={Color.White}/>
                <CustomCheckbox color={Color.Yellow}/>
                <CustomCheckbox color={Color.Red}/>
                <CustomCheckbox color={Color.Blue}/>
                <CustomCheckbox color={Color.Green}/>
              </div>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__sizes'])}>
                Размер:
                <CustomCheckbox shapeStyle={ShapeStyle.BigBall}/>
                <CustomCheckbox shapeStyle={ShapeStyle.MidBall}/>
                <CustomCheckbox shapeStyle={ShapeStyle.SmallBall}/>
              </div>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__is-favorite'])}>
                Только любимые:
                <CustomCheckbox/>
              </div>
            </section>

            <section className={classNames(styles['control-bar'], styles['range-filter'])}>
              <h2 className={styles['control-bar__title']}>Фильтры по диапазону</h2>
              <div className={styles['range-filter__amount']}>
                Количество экземпляров:
                <CustomRangeSlider from={1} to={12} onChange={onSomething}/>
              </div>
              <div className={styles['range-filter__year']}>
                Год приобретения:
                <CustomRangeSlider from={1940} to={2020} onChange={onSomething}/>
              </div>
            </section>

            <div className={styles['vstack']}>
              <section className={classNames(styles['control-bar'], styles['sort'])}>
                <h2 className={styles['control-bar__title']}>Сортировка</h2>
                <CustomSelect options={options} onChange={onSomething}/>
              </section>

              <section className={classNames(styles['control-bar'], styles['buttons'])}>
                <button className={styles['button']} type='button'>Сброс фильтров</button>
                <button className={styles['button']} type='button'>Сохранение настроек</button>
              </section>
            </div>

          </section>

          <section className={styles['cards-grid']}>
            {
              // eslint-disable-next-line react/no-array-index-key
              toys.map((toy, idx) =><ToyCard key={idx} toy={toy} onClick={onToyFavoriteStatusChanged}/>)
            }
          </section>

        </div>
      </main>
    </React.Fragment>
  );
};
