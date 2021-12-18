interface IRequirement {
  max: number;
  cur: number;
  name: string;
}
export default function selfcheck() {
  // eslint-disable-next-line no-console
  console.log('%cSelfcheck:', 'background: #222; color: #bada55; font-size: 30px');

  const requirements: IRequirement[] = [
    {
      max: 10,
      cur: 10,
      name:
                'Страница с игрушками содержит карточки всех игрушек а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке',
    },
    {
      max: 10,
      cur: 10,
      name:
                'Карточка игрушки содержит её изображение, название, текстом или условным значком обозначено количество экземпляров, год покупки, форма, цвет, размер, является ли игрушка любимой. Карточки игрушек добавляются динамически средствами JavaScript (на кросс-чеке этот пункт не проверяется)',
    },
    {
      max: 10,
      cur: 10,
      name:
                'Добавление игрушек в избранное: кликая по карточке с игрушкой или по кнопке на ней игрушку можно добавлять в избранное или удалять из избранного. Карточки добавленных в избранное игрушек внешне отличаются от остальных',
    },
    {
      max: 10,
      cur: 5,
      name:
                'Добавление игрушек в избранное: на странице отображается количество добавленных в избранное игрушек. При попытке добавить в избранное больше 20 игрушек, выводится всплывающее уведомление с текстом "Извините, все слоты заполнены"',
    },
    {
      max: 10,
      cur: 10,
      name:
                'Сортировка (Сортируются только те игрушки, которые в данный момент отображаются на странице): сортировка игрушек по названию в возрастающем и спадающем порядке',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Сортировка (Сортируются только те игрушки, которые в данный момент отображаются на странице): сортировка игрушек по году их приобретения в возрастающем и спадающем порядке',
    },
    {
      max: 10,
      cur: 10,
      name: 'Фильтры в указанном диапазоне от и до: фильтры по количеству экземпляров',
    },
    {
      max: 10,
      cur: 10,
      name: 'Фильтры в указанном диапазоне от и до: фильтры по году покупки',
    },
    {
      max: 10,
      cur: 10,
      name:
                'Фильтры в указанном диапазоне от и до: для фильтрации в указанном диапазоне используется range slider с двумя ползунками. При перемещении ползунков отображается их текущее значение, разный цвет слайдера до и после ползунка',
    },
    {
      max: 5,
      cur: 0,
      name: 'Фильтры по значению (Выбранные фильтры выделяются стилем): фильтры по форме',
    },
    {
      max: 5,
      cur: 0,
      name: 'Фильтры по значению (Выбранные фильтры выделяются стилем): фильтры по цвету',
    },
    {
      max: 5,
      cur: 0,
      name: 'Фильтры по значению (Выбранные фильтры выделяются стилем): фильтры по размеру',
    },
    {
      max: 5,
      cur: 0,
      name: 'Фильтры по значению (Выбранные фильтры выделяются стилем): можно отобразить только любимые игрушки',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Фильтры по значению (Выбранные фильтры выделяются стилем): можно отфильтровать игрушки по нескольким фильтрам одного типа',
    },
    {
      max: 20,
      cur: 0,
      name:
                'Можно отфильтровать игрушки по нескольким фильтрам разного типа. Для нескольких фильтров разного типа отображаются только те игрушки, которые соответствуют всем выбранным фильтрам. Например, можно отобразить только синие шары. Или любимые белые и красные игрушки купленные в 1940-1960 годах. Если игрушек, соответствующих всем выбранным фильтрам нет, на странице выводится уведомление в человекочитаемом формате, например, "Извините, совпадений не обнаружено"',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Сброс фильтров: есть кнопка reset для сброса фильтров. Кнопка reset сбрасывает только фильтры, не влияя на порядок сортировки или игрушки, добавленные в избранное. После использования кнопки reset фильтры остаются работоспособными',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Сброс фильтров: при сбросе фильтров кнопкой reset, ползунки range slider сдвигаются к краям, значения ползунков возвращаются к первоначальным, range slider закрашивается одним цветом',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Сохранение настроек в local storage: выбранные пользователем фильтры, порядок сортировки, добавленные в избранное игрушки сохраняются при перезагрузке страницы. Есть кнопка сброса настроек, которая очищает local storage',
    },
    {
      max: 2,
      cur: 2,
      name: 'Поиск: при открытии приложения курсор находится в поле поиска',
    },
    {
      max: 2,
      cur: 2,
      name: 'Поиск: автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами)',
    },
    {
      max: 2,
      cur: 2,
      name: 'Поиск: есть placeholder',
    },
    {
      max: 2,
      cur: 2,
      name: 'Поиск: в поле поиска есть крестик, позволяющий очистить поле поиска',
    },
    {
      max: 2,
      cur: 2,
      name:
                'Поиск: если нет совпадения последовательности букв в поисковом запросе с названием игрушки, выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено"',
    },
    {
      max: 10,
      cur: 10,
      name:
                'Поиск: при вводе поискового запроса на странице остаются только те игрушки, в которых есть указанные в поиске буквы в указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается. Поиск ведётся только среди игрушек, которые в данный момент отображаются на странице.',
    },
    {
      max: 10,
      cur: 10,
      name:
                'Поиск: если очистить поле поиска, на странице отображаются игрушки, соответствующие всем выбранным фильтрам и настройкам сортировки',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Дополнительный функционал на выбор: в процессе сортировки, фильтрации, поиска карточки с изображениями игрушек плавно меняют своё положение. ',
    },
    {
      max: 10,
      cur: 0,
      name:
                'Дополнительный функционал на выбор: очень высокое качество оформления приложения + дополнительный, не указанный в задании, сложный в реализации функционал, улучшающий качество приложения, удобство пользования им',
    },
  ];

  let available = 0;
  let total = 0;
  requirements
    .sort((a, b) => b.cur - a.cur)
    .forEach(req => {
      const style =
                // eslint-disable-next-line no-nested-ternary
                req.cur === 0 ? 'color: red;' : req.cur < req.max ? 'color: rgb(209, 187, 59);' : 'color: green;';
      // eslint-disable-next-line no-console
      console.log(`%c(${req.cur}/${req.max}): ${req.name}`, style);
      available += req.max;
      total += req.cur;
    });
  // eslint-disable-next-line no-console
  console.log(`%cResult: ${total}/${available}`, 'background-color: black; font-size: 15px; color: lightgreen;');
}

// function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
//   return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
// }
