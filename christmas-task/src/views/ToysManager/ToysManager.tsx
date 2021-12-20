/* eslint-disable no-bitwise */
import classNames from 'classnames';

import React, { FC , useCallback, useEffect, useMemo, useState } from 'react';

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
import { useToast } from '@/hooks/Toast';

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

const transformFetchedToys = (jsonToy: IFetchedToy): IToy | null => {
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
    num: Math.round(parseFloat(jsonToy.num)),
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

interface IRangeFilters {
  yearRange: Required<IRangeChange>;
  amountRange: Required<IRangeChange>;
}

interface IValueFilters {
  shapes: number;
  colors: number;
  sizes: number;
  favorite: boolean;
}

interface SortType<T> {
  field: keyof T;
  isASC: boolean;
}

interface IToySortOption {
  name: string;
  value: SortType<IToy>;
}

const sortOptions: IToySortOption[] = [
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

interface IToysParams {
  amountMin: number;
  amountMax: number;
  yearMin: number;
  yearMax: number;
  shapes: {
    val: IToy['shape'];
    code: number;
  }[];
  colors: {
    val: IToy['color'];
    code: number;
  }[];
  sizes: {
    val: IToy['size'];
    code: number;
  }[];
};

function getSaved() {
  const rangeFilters = localStorage.getItem('rangeFilters');
  const valueFilters = localStorage.getItem('valueFilters');
  const sortOption = localStorage.getItem('sortOption');
  const favToyNums = localStorage.getItem('favToyNums');
  return {
    savedRangeFilters: rangeFilters !== null ? JSON.parse(rangeFilters) as IRangeFilters : null,
    savedValueFilters: valueFilters !== null ? JSON.parse(valueFilters) as IValueFilters : null,
    savedSortOption: sortOption !== null ? Math.round(parseFloat(sortOption)) : null,
    savedFavToyNums: favToyNums !== null ? JSON.parse(favToyNums) as number[] : null,
  };
}

export const ToysManager: FC = () => {
  const [filteredToys, setFilteredToys] = useState<IToy[]>([]);
  const [toys, setToys] = useState<IToy[]>([]);
  const saved = getSaved();

  const [defaultRangeFiltersState, setDefaultRangeFiltersState] = useState<IRangeFilters>({
    amountRange: {
      from: 0,
      to: 10,
    },
    yearRange: {
      from: 1900,
      to: new Date().getFullYear(),
    },
  });

  const defaultValueFiltersState: IValueFilters = useMemo(() => ({
    shapes: 0,
    colors: 0,
    sizes: 0,
    favorite: false,
  }), []);

  const [toysParams, setToysParams] = useState<IToysParams>({
    amountMin: defaultRangeFiltersState.amountRange.from,
    amountMax: defaultRangeFiltersState.amountRange.to,
    yearMin: defaultRangeFiltersState.yearRange.from,
    yearMax: defaultRangeFiltersState.yearRange.to,
    shapes: [],
    colors: [],
    sizes: [],
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<IToySortOption>(saved.savedSortOption ? sortOptions[saved.savedSortOption] : sortOptions[0]);
  const [rangeFilters, setRangeFilters] = useState<IRangeFilters>(saved.savedRangeFilters ? saved.savedRangeFilters : defaultRangeFiltersState);
  const [valueFilters, setValueFilters] = useState<IValueFilters>(saved.savedValueFilters ? saved.savedValueFilters : defaultValueFiltersState);

  const [Toast, invokeToast] = useToast();
  
  useEffect(() => {
    function isBetween<T, K extends keyof T>(obj: T, key: K, range: { from: T[K]; to: T[K] }): boolean {
      return range.from <= obj[key] && obj[key] <= range.to;
    }

    function comparatorBy<T>(key: keyof T, isASC: boolean) {
      return (left: T, right: T) => {
        const l = isASC ? left : right;
        const r = isASC ? right : left;
        return l[key] < r[key] ? -1 : 1;
      };
    }

    const searchFiltered = (toy: IToy): boolean => 
      toy.name.toLowerCase().includes(searchQuery.toLowerCase());

    const rangeFiltered = (toy: IToy): boolean => 
      isBetween(toy, 'amount', rangeFilters.amountRange) &&
      isBetween(toy, 'year', rangeFilters.yearRange);

    const valueFiltered = (toy: IToy): boolean => {
      const someShapesSelected = valueFilters.shapes !== 0;
      const someColorsSelected = valueFilters.colors !== 0;
      const someSizesSelected = valueFilters.sizes !== 0;

      const fav = valueFilters.favorite ? toy.favorite : true;

      const shape = !someShapesSelected
        ? true
        : toysParams.shapes.reduce((acc, sh) => ((valueFilters.shapes & sh.code) !== 0)
          ? acc || toy.shape === sh.val
          : acc
        , false);

      const color = !someColorsSelected
        ? true
        : toysParams.colors.reduce((acc, col) => ((valueFilters.colors & col.code) !== 0)
          ? acc || toy.color === col.val
          : acc
        , false);

      const size = !someSizesSelected
        ? true
        : toysParams.sizes.reduce((acc, sz) => ((valueFilters.sizes & sz.code) !== 0)
          ? acc || toy.size === sz.val
          : acc
        , false);
            
      return fav && shape && color && size;
    };

    const newFilteredToys = toys
      .filter(toy =>
        searchFiltered(toy) &&
        rangeFiltered(toy) &&
        valueFiltered(toy)
      )
      .sort(comparatorBy<IToy>(sortOption.value.field, sortOption.value.isASC));

    setFilteredToys(newFilteredToys);
  },
  [toys, toysParams, searchQuery, valueFilters, rangeFilters, sortOption]);

  const determineFetchedNewToysParams = (newToys: IToy[]) => newToys.reduce((acc, toy) => {
    if(acc.shapes.find(shape => shape.val === toy.shape) === undefined) {
      acc.shapes.push({
        val: toy.shape,
        code: 2**acc.shapes.length,
      });
    }
    if(acc.colors.find(color => color.val === toy.color) === undefined) {
      acc.colors.push({
        val: toy.color,
        code: 2**acc.colors.length,
      });
    }
    if(acc.sizes.find(size => size.val === toy.size) === undefined) {
      acc.sizes.push({
        val: toy.size,
        code: 2**acc.sizes.length,
      });
    }
    acc.amountMin = Math.min(toy.amount, acc.amountMin);
    acc.amountMax = Math.max(toy.amount, acc.amountMax);
    acc.yearMin = Math.min(toy.year, acc.yearMin);
    acc.yearMax = Math.max(toy.year, acc.yearMax);
    return acc;
  }, {
    shapes: [] as IToysParams['shapes'],
    colors: [] as IToysParams['colors'],
    sizes: [] as IToysParams['sizes'],
    amountMin: newToys[0].amount,
    amountMax: newToys[0].amount,
    yearMin: newToys[0].year,
    yearMax: newToys[0].year,
  });
  
  useEffect(() => {
    const restoreSavedFavs = (toy: IToy): IToy => {
      if(saved.savedFavToyNums?.includes(toy.num)) {
        return { ...toy, favorite: true };
      } 
      return toy;
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch('../../static/toys.json')
      .then((resp: Response) => resp.json())
      .then((toysJson: IFetchedToy[]) => {

        const newToys = toysJson
          .map(transformFetchedToys)
          .filter(toy => toy !== null)
          .map(restoreSavedFavs);

        setToys(newToys);
        setFilteredToys(newToys);
          
        const params = determineFetchedNewToysParams(newToys);

        const newRangeFilters: IRangeFilters = {
          amountRange: {
            from: params.amountMin,
            to: params.amountMax,
          },
          yearRange: {
            from: params.yearMin,
            to: params.yearMax,      
          },
        };
        
        setToysParams(params);
        setDefaultRangeFiltersState(newRangeFilters);

        if(!saved.savedRangeFilters) {
          setRangeFilters(newRangeFilters);
        }
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

  const onShapeFiltersChanged = useCallback(
    (value: number) => setValueFilters(prev => ({ ...prev, shapes: prev.shapes ^ value })),
    []
  );

  const onFavoriteFilterChanged = useCallback(
    () => setValueFilters(prev => ({ ...prev, favorite: !prev.favorite })),
    []
  );

  const onColorFiltersChanged = useCallback(
    (value: number) => setValueFilters(prev => ({ ...prev, colors: prev.colors ^ value })),
    []
  );

  const onSizeFiltersChanged = useCallback(
    (value: number) => setValueFilters(prev => ({ ...prev, sizes: prev.sizes ^ value })),
    []
  );

  const onSearchQueryChanged = useCallback(
    (query: string) => setSearchQuery(query),
    []
  );

  const favToysAmount = toys.filter(toy => toy.favorite).length;

  const onToyFavoriteStatusChanged = useCallback(
    (changedToy: IToy) => {
      if(!changedToy.favorite && favToysAmount >= 20) {
        invokeToast('Извините, все слоты заполнены');
        return;
      }
      setToys(prevToys => [...prevToys.map(prevToy => {
        if(prevToy === changedToy) {
          return {...prevToy, favorite: !prevToy.favorite};
        }
        return {...prevToy};
      })]);
    },
    [favToysAmount, invokeToast]
  );

  const onSortTypeChanged = useCallback(
    (option: IOption) => setSortOption(option as IToySortOption),
    []
  );

  const resetFilters = useCallback(
    () => {
      setRangeFilters(defaultRangeFiltersState);
      setValueFilters(defaultValueFiltersState);
      invokeToast('Фильтры сброшены!');
    },
    [defaultRangeFiltersState, defaultValueFiltersState, invokeToast]
  );

  const saveFilters = useCallback(
    () => {
      localStorage.setItem('rangeFilters', JSON.stringify(rangeFilters));
      localStorage.setItem('valueFilters', JSON.stringify(valueFilters));
      localStorage.setItem('sortOption', sortOptions.indexOf(sortOption).toString());
      const favToyNums = toys.filter(toy => toy.favorite).map(toy => toy.num);
      localStorage.setItem('favToyNums', JSON.stringify(favToyNums));
      invokeToast('Настройки сохранены!');
    },
    [rangeFilters, valueFilters, sortOption, toys, invokeToast]
  );
    
  const resetSave = useCallback(
    () => {
      localStorage.removeItem('rangeFilters');
      localStorage.removeItem('valueFilters');
      localStorage.removeItem('sortOption');
      localStorage.removeItem('favToyNums');
      setToys(prevToys => prevToys.map(prevToy => saved.savedFavToyNums?.includes(prevToy.num)
        ? ({ ...prevToy, favorite: false})
        : ({ ...prevToy })));
      invokeToast('Сохранение сброшено!');
    },
    [invokeToast]
  );
  // eslint-disable-next-line react/no-array-index-key
  const toyCardsToDisplay = filteredToys.map((toy, idx) =><ToyCard key={idx} toy={toy} onClick={onToyFavoriteStatusChanged}/>);
  
  const sizeCheckboxes = () => {
    const sizeBig = toysParams.sizes.find(size => size.val === 'большой');
    const sizeMid = toysParams.sizes.find(size => size.val === 'средний');
    const sizeSmall = toysParams.sizes.find(size => size.val === 'малый');

    return [
      <CustomCheckbox
        key={0}
        value={sizeBig ? sizeBig.code : 0} 
        checked={sizeBig ? ((valueFilters.sizes & sizeBig.code) !== 0) : false}
        onCheckedChange={sizeBig ? onSizeFiltersChanged : undefined} 
        shapeStyle={ShapeStyle.BigBall}
      />,
      <CustomCheckbox 
        key={1}
        value={sizeMid ? sizeMid.code : 0}
        checked={sizeMid ? ((valueFilters.sizes & sizeMid.code) !== 0) : false}
        onCheckedChange={sizeMid ? onSizeFiltersChanged : undefined} 
        shapeStyle={ShapeStyle.MidBall} 
      />,
      <CustomCheckbox 
        key={2}
        value={sizeSmall ? sizeSmall.code : 0}
        checked={sizeSmall ? ((valueFilters.sizes & sizeSmall.code) !== 0) : false}
        onCheckedChange={sizeSmall ? onSizeFiltersChanged : undefined} 
        shapeStyle={ShapeStyle.SmallBall} 
      />,
    ];
  };
  
  const shapeCheckboxes = () => {
    const shapeBall = toysParams.shapes.find(shape => shape.val === 'шар');
    const shapeBell = toysParams.shapes.find(shape => shape.val === 'колокольчик');
    const shapeCone = toysParams.shapes.find(shape => shape.val === 'шишка');
    const shapeSnowflake = toysParams.shapes.find(shape => shape.val === 'снежинка');
    const shapeToy = toysParams.shapes.find(shape => shape.val === 'фигурка');

    return [
      <CustomCheckbox 
        key={0}
        value={shapeBall ? shapeBall.code : 0}
        checked={shapeBall ? ((valueFilters.shapes & shapeBall.code) !== 0) : false}
        onCheckedChange={shapeBall ? onShapeFiltersChanged : undefined}
        shapeStyle={ShapeStyle.MidBall} 
      />,
      <CustomCheckbox 
        key={1}
        value={shapeBell ? shapeBell.code : 0} 
        checked={shapeBell ? ((valueFilters.shapes & shapeBell.code) !== 0) : false}
        onCheckedChange={shapeBell ? onShapeFiltersChanged : undefined} 
        shapeStyle={ShapeStyle.Bell} 
      />,
      <CustomCheckbox 
        key={2}
        value={shapeCone ? shapeCone.code : 0} 
        checked={shapeCone ? ((valueFilters.shapes & shapeCone.code) !== 0) : false}
        onCheckedChange={shapeCone ? onShapeFiltersChanged : undefined}
        shapeStyle={ShapeStyle.Cone} 
      />,
      <CustomCheckbox 
        key={3}
        value={shapeSnowflake ? shapeSnowflake.code : 0} 
        checked={shapeSnowflake ? ((valueFilters.shapes & shapeSnowflake.code) !== 0) : false}
        onCheckedChange={shapeSnowflake ? onShapeFiltersChanged : undefined}
        shapeStyle={ShapeStyle.Snowflake} 
      />,
      <CustomCheckbox 
        key={4}
        value={shapeToy ? shapeToy.code : 0}
        checked={shapeToy ? ((valueFilters.shapes & shapeToy.code) !== 0) : false}
        onCheckedChange={shapeToy ? onShapeFiltersChanged : undefined}
        shapeStyle={ShapeStyle.Toy} 
      />,
    ];
  };
  
  const colorCheckboxes = () => {
    const colorWhite = toysParams.colors.find(color=> color.val === 'белый');
    const colorYellow = toysParams.colors.find(color=> color.val === 'желтый');
    const colorRed = toysParams.colors.find(color=> color.val === 'красный');
    const colorBlue = toysParams.colors.find(color=> color.val === 'синий');
    const colorGreen = toysParams.colors.find(color=> color.val === 'зелёный');

    return [
      <CustomCheckbox 
        key={0}
        value={colorWhite ? colorWhite.code : 0} 
        checked={colorWhite ? ((valueFilters.colors & colorWhite.code) !== 0) : false}
        onCheckedChange={colorWhite ? onColorFiltersChanged : undefined}
        color={Color.White} 
      />,
      <CustomCheckbox 
        key={1}
        value={colorYellow ? colorYellow.code : 0}
        checked={colorYellow ? ((valueFilters.colors & colorYellow.code) !== 0) : false}
        onCheckedChange={colorYellow ? onColorFiltersChanged : undefined} 
        color={Color.Yellow}
      />,
      <CustomCheckbox 
        key={2}
        value={colorRed ? colorRed.code : 0}
        checked={colorRed ? ((valueFilters.colors & colorRed.code) !== 0) : false}
        onCheckedChange={colorRed ? onColorFiltersChanged : undefined}
        color={Color.Red}
      />,
      <CustomCheckbox 
        key={3}
        value={colorBlue ? colorBlue.code : 0}
        checked={colorBlue ? ((valueFilters.colors & colorBlue.code) !== 0) : false}
        onCheckedChange={colorBlue ? onColorFiltersChanged : undefined}
        color={Color.Blue} 
      />,
      <CustomCheckbox 
        key={4}
        value={colorGreen ? colorGreen.code : 0}
        checked={colorGreen ? ((valueFilters.colors & colorGreen.code) !== 0) : false}
        onCheckedChange={colorGreen ? onColorFiltersChanged : undefined}
        color={Color.Green} 
      />,
    ];
  };

  return (
    <React.Fragment>
      <Header onSearch={onSearchQueryChanged} favToysNumber={favToysAmount}/>

      <main className={globalStyles['main']}>
        <div className={globalStyles['blur-container']}>

          <section className={styles['controls']}>

            <section className={classNames(styles['control-bar'], styles['value-filter'])}>
              <h2 className={styles['control-bar__title']}>Фильтры по значению</h2>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__shapes'])}>
                Форма:
                { shapeCheckboxes() }
              </div>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__colors'])}>
                Цвет:
                { colorCheckboxes() }
              </div>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__sizes'])}>
                Размер:
                { sizeCheckboxes() }
              </div>
              <div className={classNames(styles['value-filter__choice'], styles['value-filter__is-favorite'])}>
                Только любимые:
                <CustomCheckbox 
                  value={valueFilters.favorite}
                  checked={valueFilters.favorite}
                  onCheckedChange={onFavoriteFilterChanged} 
                />
              </div>
            </section>

            <section className={classNames(styles['control-bar'], styles['range-filter'])}>
              <h2 className={styles['control-bar__title']}>Фильтры по диапазону</h2>
              <div className={styles['range-filter__amount']}>
                Количество экземпляров:
                <CustomRangeSlider value={rangeFilters.amountRange} from={toysParams.amountMin} to={toysParams.amountMax} onChange={onAmountFilterChanged}/>
              </div>
              <div className={styles['range-filter__year']}>
                Год приобретения:
                <CustomRangeSlider value={rangeFilters.yearRange} from={toysParams.yearMin} to={toysParams.yearMax} onChange={onYearFilterChanged}/>
              </div>
            </section>

            <div className={styles['vstack']}>
              <section className={classNames(styles['control-bar'], styles['sort'])}>
                <h2 className={styles['control-bar__title']}>Сортировка</h2>
                <CustomSelect options={sortOptions} selected={sortOption} onChange={onSortTypeChanged}/>
              </section>

              <section className={classNames(styles['control-bar'], styles['buttons'])}>
                <button className={styles['button']} onClick={resetFilters} type='button'>Сброс фильтров</button>
                <div className={styles['hstack']}>
                  <button className={styles['button']} onClick={saveFilters} type='button'>Сохранение настроек</button>
                  <button className={styles['button']} onClick={resetSave} type='button'>Сброс сохранения</button>
                </div>
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
      <Toast/>
    </React.Fragment>
  );
};
