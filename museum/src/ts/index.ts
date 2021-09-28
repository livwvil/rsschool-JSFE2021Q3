import "../sass/style.scss";

function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

export function randomizeImages() {
  let images : NodeListOf<HTMLImageElement> = document.querySelectorAll(".art-gallery img")
  let imagesShuffled = Array.from(images);
  shuffleArray(imagesShuffled);
  imagesShuffled.forEach((image, idx) => {
    image.src = `assets/img/galery${idx+1}.png`
  })
}
randomizeImages()

let timeline: HTMLInputElement | null = document.querySelector(".progress.timeline")
function timelineListener() {
  let progress = timeline?.value
  let style = `linear-gradient(
    to right,
    #710707 0%,
    #710707 ${progress}%,
    #b3b3b3 ${progress}%,
    #b3b3b3 100%
    )`
    if(timeline)
    timeline.style.background = style;
  }
  timeline?.addEventListener("input", timelineListener)
  
let volume: HTMLInputElement | null = document.querySelector(".progress.volume")
function volumeListener() {
  let progress = volume?.value
  let style = `linear-gradient(
    to right,
    #710707 0%,
    #710707 ${progress}%,
    #b3b3b3 ${progress}%,
    #b3b3b3 100%
    )`
    if(volume)
    volume.style.background = style;
}
volume?.addEventListener("input", volumeListener)


let result = {
  "Вёрстка валидная +10": 10,
  "<header>, <main>, <footer> + 2": 2,
  "семь элементов <section> (по количеству секций) +2": 2,
  "только один заголовок <h1> +2": 2,
  "семь заголовков <h2> (по количеству секций) +2": 2,
  "шесть заголовков <h3> (по количеству карточек) +2": 2,
  "два элемента <nav> (основная и вспомогательная панель навигации) +2": 2,
  "три списка ul > li > a (основная и вспомогательная панель навигации, ссылки на соцсети) +2": 0,
  "тринадцать кнопок button (четыре из них в секции Video, пять в секции Tickets, по две - стрелки слайдера и плейлиста) +2": 2,
  "три тега input type='radio' (в секции Tickets) +2": 2,
  "два тега input type='number'(в секции Tickets) +2": 2,
  "два тега input type='range' (громкось и прогрес-бар видео) +2": 2,
  "для всех элементов <img> указан обязательный атрибут alt +2": 2,
  "Вёрстка соответствует макету +45": 45,
  "Форма покупки билетов +22": 0,
  "добавлен favicon +2": 2,
  "для построения сетки используются флексы или гриды +2": 2,
  "при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2": 2,
  "фоновый цвет каждого блока и секции тянется на всю ширину страницы +2": 2,
  "иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2": 2,
  "расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing +2": 2,
  "переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка +2": 2,
  "в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel +2": 2,
  "в футере добавлены ссылки на соцсети. Круглая граница вокруг иконок соцсетей выполнена при помощи css +2": 1,
  "плавная прокрутка по якорям +5": 5,
  "параллакс +5": 5,
  "при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe +5": 0,
  "интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты – изменение цвета фона или шрифта, появление подчёркивания и т.д. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +4": 0,
  "обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +2": 2,
  "интерактивность при наведении карточек в секции Visiting предусматривает плавное растягивание подчёркивания заголовка карточки на всю ширину карточки Демо +2": 2,
  "интерактивность при наведении иконок социальных сетей в футере предусматривает изменение цвета иконки и круглой границы вокруг иконки на золотистый +2": 2,
  "можно передвигать ползунки громкости и прогресс-бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету +2": 2,
  "кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 +2": 2,
  "кнопке Book' в форме покупки билетов добавлен ripple-эффект Демо +2": 0,
  "при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10": 10,
};
let sum = 0;
for (let i of Object.entries(result)) {
  console.log(i[1] + "\t" + i[0]);
  sum += i[1];
}
console.table("Total result: " + sum);
