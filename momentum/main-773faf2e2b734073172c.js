(()=>{"use strict";var e,n={208:(e,n,t)=>{t.r(n)},980:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.initDateAndTime=void 0;const r=t(894),a=document.querySelector(".time"),i=document.querySelector(".date");n.initDateAndTime=function(){let e,n,t;function o(e){const n=e.getHours();return["night","morning","afternoon","evening"][Math.floor(n/6)%4]}return function u(){const c=new Date;!function(e){if(!a)return;const n=e.toLocaleTimeString();a.textContent=n}(c),function(e){if(!i)return;const n=e.toLocaleDateString((0,r.t)("date_and_time.locale"),{weekday:"long",month:"long",day:"numeric"});i.textContent=n}(c);const l=o(c);e&&l!==t&&e(l),t=l,n=setTimeout(u,1e3)}(),{setOnTimeOfDayChanged:n=>e=n,getCurrentTimeOfDay:()=>o(new Date),finalize:()=>{clearTimeout(n)}}}},685:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.initGreeting=void 0;const r=t(894),a=document.querySelector(".greeting"),i=document.querySelector(".name");n.initGreeting=function(e){if(!i)return;function n(e){if(!a)return;const n=(0,r.t)(`greeting.${e}`);a.textContent=n}n(e),i.placeholder=`[ ${(0,r.t)("greeting.name_placeholder")} ]`;const t=e=>{localStorage.setItem("username",e.target.value)};i.addEventListener("input",t);const o=localStorage.getItem("username");return i.value=o||"",{setGreeting:n,finalize:()=>{i.removeEventListener("input",t)}}}},294:function(e,n,t){var r=this&&this.__createBinding||(Object.create?function(e,n,t,r){void 0===r&&(r=t),Object.defineProperty(e,r,{enumerable:!0,get:function(){return n[t]}})}:function(e,n,t,r){void 0===r&&(r=t),e[r]=n[t]}),a=this&&this.__setModuleDefault||(Object.create?function(e,n){Object.defineProperty(e,"default",{enumerable:!0,value:n})}:function(e,n){e.default=n}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&r(n,e,t);return a(n,e),n},o=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,i){function o(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,u)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),t(208);const u=t(980),c=t(685),l=t(356),m=t(790),s=t(585),d=i(t(894)),f=t(563),h=[];function g(){const e=(0,u.initDateAndTime)(),n=e.getCurrentTimeOfDay(),t=(0,s.initSlider)(n,1),r=(0,c.initGreeting)(n),a=(0,f.initWeather)(),i=(0,l.initQuotes)();e.setOnTimeOfDayChanged((e=>{r&&r.setGreeting(e),t&&t.changeTimeOfDay(e)})),e&&h.push(e.finalize),r&&h.push(r.finalize),t&&h.push(t.finalize),a&&h.push(a.finalize),i&&h.push(i.finalize)}document.addEventListener("DOMContentLoaded",(()=>o(void 0,void 0,void 0,(function*(){yield d.i18nInitPromise,d.onLanguageChanged((()=>{!function(){for(let e of h)e();h.length=0,g()}()})),g(),(0,m.printSelfcheck)(!1)}))))},356:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,i){function o(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,u)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.initQuotes=void 0;const a=t(894),i=document.querySelector(".quote"),o=document.querySelector(".author"),u=document.querySelector(".change-quote");n.initQuotes=function(){if(!i||!o||!u)return;let e=parseFloat(localStorage.getItem("quoteNumber")||"0");function n(){return r(this,void 0,void 0,(function*(){if(!i||!o)return;const n=`/public/quotes/quotes.${(0,a.t)("quotes.lang")}.json`;try{const t=yield fetch(n),r=yield t.json(),a=null==r?void 0:r.length;if(!(r&&a>0))throw new Error;{let n;do{n=Math.round(Math.random()*(a-1))}while(n===e);e=n,localStorage.setItem("quoteNumber",String(e))}i.innerHTML=r[e].text,o.innerHTML=r[e].author}catch(e){i.innerHTML=(0,a.t)("quotes.error"),o.innerHTML=""}}))}return u.addEventListener("click",n),n(),{finalize:()=>{u.removeEventListener("click",n)}}}},790:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.printSelfcheck=void 0;let t=[{name:"Часы и календарь: время выводится в 24-часовом формате, например: 21:01:00 +5",mark:5},{name:"Часы и календарь: время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5",mark:5},{name:"Часы и календарь: выводится день недели, число, месяц, например: 'Воскресенье, 16 мая' /'Sunday, May 16' / 'Нядзеля, 16 траўня' (Язык и формат вывода даты определяется языком приложения.) +5",mark:5},{name:"Часы и календарь: при изменении дня недели, даты, месяца эти данные меняются в приложении (в ходе кросс-чека этот пункт не проверяется)",mark:0},{name:"Приветствие: текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5\nс 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы\nс 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень\nс 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар\nс 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач",mark:5},{name:"Приветствие: при изменении времени суток, если в это время приложение открыто, меняется текст приветствия (в ходе кросс-чека этот пункт не проверяется)",mark:0},{name:"Приветствие: пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5",mark:5},{name:"Смена фонового изображения: cкачать картинки на компьютер и использовать локальные файлы нельзя. +0",mark:0},{name:"Смена фонового изображения: ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5\nПример ссылки на фоновое изображение: https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg, здесь\nevening - время суток, другие значения afternoon, morning, night\n18 - рандомный (случайный) номер изображения, от 01 до 20.",mark:5},{name:"Смена фонового изображения: изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана. +0",mark:0},{name:"Смена фонового изображения: изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5",mark:5},{name:"Смена фонового изображения: изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5",mark:5},{name:"Смена фонового изображения: при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения +5",mark:0},{name:"Виджет погоды: город по умолчанию - Минск, пока пользователь не ввёл другой город",mark:0},{name:"Виджет погоды: при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5",mark:5},{name:"Виджет погоды: для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API +0",mark:0},{name:"Виджет погоды: данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5",mark:5},{name:"Виджет погоды: выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5",mark:5},{name:"Виджет цитата дня: при загрузке страницы приложения отображается рандомная цитата и её автор +5\nВ качестве источника цитаты можно использовать как API, так и созданный вами или найденный в интернете JSON-файл с цитатами и их авторами. API с цитатами не отличаются надёжностью и долговечностью, используемый в качестве источника цитат собственный JSON-файл гарантирует работоспособность вашего приложения. Запросы к JSON также осуществляются асинхронно, таким образом необходимые знания о работе с асинхронными запросами вы получите",mark:5},{name:"Виджет цитата дня: при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5",mark:5},{name:"Аудиоплеер: при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3",mark:0},{name:"Аудиоплеер: при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3",mark:0},{name:"Аудиоплеер: треки можно пролистывать кнопками Play-next и Play-prev",mark:0},{name:"Аудиоплеер: треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3",mark:0},{name:"Аудиоплеер: трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3",mark:0},{name:"Аудиоплеер: после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3\n    Для удобства проверки треки возьмите небольшой продолжительности. Обрезать треки можно здесь: https://mp3cut.net/ru/",mark:0},{name:"Аудиоплеер: плейлист генерируется средствами JavaScript (в ходе кросс-чека этот пункт не проверяется) +0",mark:0},{name:"Продвинутый аудиоплеер: примерные внешний вид и функциональность плеера https://howlerplayer.github.io/ +0",mark:0},{name:"Продвинутый аудиоплеер: добавлен прогресс-бар в котором отображается прогресс проигрывания +3",mark:0},{name:"Продвинутый аудиоплеер: при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3",mark:0},{name:"Продвинутый аудиоплеер: над прогресс-баром отображается название трека +3",mark:0},{name:"Продвинутый аудиоплеер: отображается текущее и общее время воспроизведения трека +3",mark:0},{name:"Продвинутый аудиоплеер: есть кнопка звука при клике по которой можно включить/отключить звук +2",mark:0},{name:"Продвинутый аудиоплеер: добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука +3",mark:0},{name:"Продвинутый аудиоплеер: можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3",mark:0},{name:"Перевод приложения на два языка: переводится язык и меняется формат отображения даты +3",mark:0},{name:"Перевод приложения на два языка: переводится приветствие и placeholder +3",mark:0},{name:"Перевод приложения на два языка: переводится прогноз погоды в т.ч описание погоды (OpenWeatherMap API предоставляет такую возможность) и город по умолчанию +3",mark:0},{name:"Перевод приложения на два языка: переводится цитата дня (используйте подходящий для этой цели API, возвращающий цитаты на нужном языке или создайте с этой целью JSON-файл с цитатами на двух языках) +3",mark:0},{name:"Перевод приложения на два языка: переводятся настройки приложения. При переключении языка приложения в настройках, язык настроек тоже меняется +3",mark:0},{name:"Перевод приложения на два языка: не переводятся данные, которые вводит пользователь: имя, город, тег для получения фонового изображения от API +0",mark:0},{name:"Получение фонового изображения от API: в качестве источника изображений может использоваться Unsplash API +5",mark:0},{name:"Получение фонового изображения от API: в качестве источника изображений может использоваться Flickr API +5",mark:0},{name:"Настройки приложения: в настройках приложения можно указать язык приложения (en/ru или en/be) +3",mark:0},{name:"Настройки приложения: в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API +3",mark:0},{name:"Настройки приложения: если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото (Например, nature - фото про природу) +3",mark:0},{name:"Настройки приложения: в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал +3",mark:0},{name:"Настройки приложения: скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их +3",mark:0},{name:"Настройки приложения: настройки приложения сохраняются при перезагрузке страницы +5",mark:0},{name:"Дополнительный функционал на выбор: ToDo List - список дел (как в оригинальном приложении) +10",mark:0},{name:"Дополнительный функционал на выбор: список ссылок (как в оригинальном приложении) +10",mark:0},{name:"Дополнительный функционал на выбор: свой собственный дополнительный функционал, по сложности аналогичный предложенным +10",mark:0},{name:"На основе созданного проекта вы можете создать расширение для Google Chrome без публикации его в интернет-магазине (в ходе кросс-чека этот пункт не проверяется и не оценивается) +0",mark:0}];n.printSelfcheck=function(e=!0){let n=t.reduce(((n,t)=>(e&&0===t.mark&&console.log(`${t.mark}\t${t.name}`),Object.assign(Object.assign({},n),{mark:n.mark+t.mark}))),{name:"Total result",mark:0});console.table(`${n.name}: ${n.mark}`)}},585:(e,n)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.initSlider=void 0;const t=document.querySelector(".slide-next"),r=document.querySelector(".slide-prev"),a=document.querySelector(".bg-container");n.initSlider=function(e,n){if(!t||!r)return;let i=e,o=n,u=!0;function c(e){const n=e.toString().padStart(2,"0");return`https://raw.githubusercontent.com/livwvil/stage1-tasks/assets/images/${i}/${n}.jpg`}function l(e,n){if(!a||!u||a.children.length>2)return;u=!1;const t=new Image;t.src=e,a.appendChild(t),t.onload=e=>{t.classList.add("visible"),n&&n()},t.ontransitionend=()=>{var e;u=!0,a.children.length>1&&(null===(e=a.firstChild)||void 0===e||e.remove())}}const m=e=>{const n=(o+1-1)%20+1;l(c(n),(()=>{o=n}))},s=e=>{const n=1===o?20:(o-1-1)%20+1;l(c(n),(()=>{o=n}))};return l(c(o)),t.addEventListener("click",m),r.addEventListener("click",s),{changeTimeOfDay:function(e){i=e;const n=Math.round(19*Math.random())+1;l(c(n),(()=>{o=n}))},finalize:()=>{t.removeEventListener("click",m),r.removeEventListener("click",s)}}}},894:function(e,n,t){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),n.onLanguageChanged=n.t=n.changeLanguage=n.i18nInitPromise=void 0;const a=r(t(226)),i=r(t(122)),o=r(t(71)),u=t(981),c=a.default.use(i.default).use(o.default).use(u.i18nextPlugin).init({fallbackLng:"en",interpolation:{escapeValue:!1}});function l(e){a.default.changeLanguage(e)}n.i18nInitPromise=c,n.changeLanguage=l,n.t=function(e){return a.default.t(e)},n.onLanguageChanged=function(e){a.default.on("languageChanged",e)},document.addEventListener("keyup",(e=>{"q"===e.key?l("en"):"w"===e.key&&l("ru")}))},563:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(a,i){function o(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?a(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(o,u)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.initWeather=void 0;const a=t(894),i=document.querySelector(".city"),o=document.querySelector(".weather-icon"),u=document.querySelector(".temperature"),c=document.querySelector(".weather-description");n.initWeather=function(){if(!i)return;function e(){var e;return r(this,void 0,void 0,(function*(){if(!(u&&c&&o&&i))return;const n=`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(i.value)}&lang=${(0,a.t)("weather.lang")}&appid=85180df66ab95e81c6d07e4eef472fe8&units=metric`;try{const t=yield fetch(n),r=yield t.json();if(o.className="weather-icon owf",!r||200!==r.cod)throw new Error;o.classList.add(`owf-${null===(e=r.weather[0])||void 0===e?void 0:e.id}`),u.textContent=`${r.main.temp}°C ${r.weather[0].description}`,c.innerHTML=`${(0,a.t)("weather.wind")} ${r.wind.speed} ${(0,a.t)("weather.windSpeedUnit")}<br>${(0,a.t)("weather.humidity")} ${r.main.humidity}%`}catch(e){u.textContent="",c.textContent=(0,a.t)("weather.cityNotFound")}}))}const n=e=>{localStorage.setItem("city",e.target.value)},t=n=>{e()};i.addEventListener("input",n),i.addEventListener("change",t);const l=localStorage.getItem("city");return i.value=l||"Минск",e(),{finalize:()=>{i.removeEventListener("input",n),i.removeEventListener("change",t)}}}}},t={};function r(e){var a=t[e];if(void 0!==a)return a.exports;var i=t[e]={exports:{}};return n[e].call(i.exports,i,i.exports,r),i.exports}r.m=n,e=[],r.O=(n,t,a,i)=>{if(!t){var o=1/0;for(m=0;m<e.length;m++){for(var[t,a,i]=e[m],u=!0,c=0;c<t.length;c++)(!1&i||o>=i)&&Object.keys(r.O).every((e=>r.O[e](t[c])))?t.splice(c--,1):(u=!1,i<o&&(o=i));if(u){e.splice(m--,1);var l=a();void 0!==l&&(n=l)}}return n}i=i||0;for(var m=e.length;m>0&&e[m-1][2]>i;m--)e[m]=e[m-1];e[m]=[t,a,i]},r.d=(e,n)=>{for(var t in n)r.o(n,t)&&!r.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={179:0};r.O.j=n=>0===e[n];var n=(n,t)=>{var a,i,[o,u,c]=t,l=0;if(o.some((n=>0!==e[n]))){for(a in u)r.o(u,a)&&(r.m[a]=u[a]);if(c)var m=c(r)}for(n&&n(t);l<o.length;l++)i=o[l],r.o(e,i)&&e[i]&&e[i][0](),e[o[l]]=0;return r.O(m)},t=self.webpackChunkmomentum=self.webpackChunkmomentum||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))})();var a=r.O(void 0,[145],(()=>r(294)));a=r.O(a)})();