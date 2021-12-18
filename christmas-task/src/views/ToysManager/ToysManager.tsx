import classNames from 'classnames';

import React, { FC , useCallback, useEffect, useState } from 'react';

import styles from './ToysManager.scss';
import { ToyCard } from './components/ToyCard';
import { IToy } from './components/ToyCard/ToyCard';

import globalStyles from '../../assets/stylesheets/index.scss';

import { CustomCheckbox } from '@/components/CustomCheckbox';
import { ShapeStyle, Color } from '@/components/CustomCheckbox/CustomCheckbox';
import { CustomRangeSlider } from '@/components/CustomRangeSlider';
import { IRangeChange } from '@/components/CustomRangeSlider/CustomRangeSlider';
import { CustomSelect } from '@/components/CustomSelect';
import { IOption } from '@/components/CustomSelect/CustomSelect';
import { Header } from '@/components/Header';

interface IFetchedToy {
  num?: string;
  name?: string;
  count?: string;
  year?: string;
  shape?: string;
  color?: string;
  size?: string;
  favorite?: string;
}

interface IFilters{
  yearRange: Required<IRangeChange>;
  amountRange: Required<IRangeChange>;
}

interface SortType<T> {
  field: keyof T;
  isASC: boolean;
}

const sortOptions: { name: string; value: SortType<IToy> }[] = [
  {
    name: 'По названию от «А» до «Я»',
    value: { field: 'name', isASC: true },
  },
  {
    name: 'По названию от «Я» до «А»',
    value: { field: 'name', isASC: false },
  },
  {
    name: 'По году покупки по возрастанию',
    value: { field: 'year', isASC: true },
  },
  {
    name: 'По году покупки по убыванию',
    value: { field: 'year', isASC: false },
  },
];

export const ToysManager: FC = () => {
  const [toys, setToys] = useState<IToy[]>([]);
  const [filteredToys, setFilteredToys] = useState<IToy[]>([]);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortType, setSortType] = useState<SortType<IToy>>(sortOptions[0].value);
  const [rangeFilters, setRangeFilters] = useState<IFilters>({
    amountRange: {
      from: 0,
      to: 100,
    },
    yearRange: {
      from: 0,
      to: 100,      
    },
  });

  useEffect(() => {
    function isBetween<T, K extends keyof T>(obj: T, key: K, range: { from: T[K]; to: T[K] }): boolean {
      return range.from <= obj[key] && obj[key] <= range.to;
    }

    function comparatorBy<T>(key: keyof T, asc = true) {
      return (left: T, right: T) => {
        const l = asc ? left : right;
        const r = asc ? right : left;
        return l[key] < r[key] ? -1 : 1;
      };
    }

    const newFilteredToys = toys
      .filter(toy => toy.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(toy => isBetween(toy, 'amount', rangeFilters.amountRange))
      .filter(toy => isBetween(toy, 'year', rangeFilters.yearRange))
      .sort(comparatorBy<IToy>(sortType.field, sortType.isASC));

    setFilteredToys(newFilteredToys);
  },
  [toys, searchQuery, rangeFilters, sortType]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('../../static/toys.json')
      .then((resp: Response) => resp.json())
      .then((toysJson: IFetchedToy[]) => {
        const transformJson = (jsonToy: IFetchedToy):IToy | null => {
          if(jsonToy.num === undefined || 
            jsonToy.name === undefined || 
            jsonToy.count === undefined || 
            jsonToy.year === undefined || 
            jsonToy.shape === undefined || 
            jsonToy.color === undefined || 
            jsonToy.size === undefined || 
            jsonToy.favorite === undefined) {
            return null;
          }
          return {
            img: `../../static/toys/${jsonToy.num}.png`,
            name: jsonToy.name,
            amount: Math.round(parseFloat(jsonToy.count)),
            year: Math.round(parseFloat(jsonToy.year)),
            shape: jsonToy.shape,
            color: jsonToy.color,
            size: jsonToy.size,
            favorite: jsonToy.favorite === 'true',
          };
        };
        const result = toysJson.map(transformJson).filter(toy => toy !== null) as IToy[];
        setToys(result);
        setFilteredToys(result);
      });
  },
  []);

  const onAmountFilterChanged = useCallback(
    (value: IRangeChange) => {
      if(value.from !== undefined) {
        setRangeFilters(prev => ({
          ...prev,
          amountRange: { 
            ...prev.amountRange,
            from: value.from!,
          },
        })
        );
      }
      if(value.to !== undefined) {
        setRangeFilters(prev => ({
          ...prev,
          amountRange: { 
            ...prev.amountRange,
            to: value.to!,
          },
        })
        );
      }
    },
    []
  );

  const onYearFilterChanged = useCallback(
    (value: IRangeChange) => {
      if(value.from !== undefined) {
        setRangeFilters(prev => ({
          ...prev,
          yearRange: { 
            ...prev.yearRange,
            from: value.from!,
          },
        })
        );
      }
      if(value.to !== undefined) {
        setRangeFilters(prev => ({
          ...prev,
          yearRange: { 
            ...prev.yearRange,
            to: value.to!,
          },
        })
        );
      }
    },
    []
  );

  const onSearchQueryChanged = useCallback(
    (query: string) => setSearchQuery(query),
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

  const onSortTypeChanged = useCallback(
    (option: IOption) => setSortType(option.value as SortType<IToy>),
    []
  );

  // eslint-disable-next-line react/no-array-index-key
  const toyCardsToDisplay = filteredToys.map((toy, idx) =><ToyCard key={idx} toy={toy} onClick={onToyFavoriteStatusChanged}/>);

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
                <CustomRangeSlider from={1} to={12} onChange={onAmountFilterChanged}/>
              </div>
              <div className={styles['range-filter__year']}>
                Год приобретения:
                <CustomRangeSlider from={1940} to={2020} onChange={onYearFilterChanged}/>
              </div>
            </section>

            <div className={styles['vstack']}>
              <section className={classNames(styles['control-bar'], styles['sort'])}>
                <h2 className={styles['control-bar__title']}>Сортировка</h2>
                <CustomSelect options={sortOptions} selected={sortOptions.find(option => option.value === sortType) as IOption} onChange={onSortTypeChanged}/>
              </section>

              <section className={classNames(styles['control-bar'], styles['buttons'])}>
                <button className={styles['button']} type='button'>Сброс фильтров</button>
                <button className={styles['button']} type='button'>Сохранение настроек</button>
              </section>
            </div>

          </section>

          <section className={styles['cards-grid']}>
            {
              toyCardsToDisplay.length !== 0
                ? toyCardsToDisplay
                :'Совпадений не найдено...'
            }
          </section>

        </div>
      </main>
    </React.Fragment>
  );
};
