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
  let images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".art-gallery img");
  let imagesShuffled = Array.from(images);
  shuffleArray(imagesShuffled);
  imagesShuffled.forEach((image, idx) => {
    image.src = `assets/img/galery${idx + 1}.jpg`;
  });
}
randomizeImages();

let timeline: HTMLInputElement | null =
  document.querySelector(".progress.timeline");
function timelineListener() {
  let progress = timeline?.value;
  let style = `linear-gradient(
    to right,
    #710707 0%,
    #710707 ${progress}%,
    #b3b3b3 ${progress}%,
    #b3b3b3 100%
    )`;
  if (timeline) timeline.style.background = style;
}
timeline?.addEventListener("input", timelineListener);

let volume: HTMLInputElement | null =
  document.querySelector(".progress.volume");
function volumeListener() {
  let progress = volume?.value;
  let style = `linear-gradient(
      to right,
      #710707 0%,
      #710707 ${progress}%,
      #b3b3b3 ${progress}%,
      #b3b3b3 100%
      )`;
  if (volume) volume.style.background = style;
}
volume?.addEventListener("input", volumeListener);

const buyBtn: HTMLElement | null = document.querySelector(".buy-btn");
const closeBtn: HTMLElement | null = document.querySelector(".close-btn");
const modalBuy: HTMLElement | null = document.querySelector(".modal-buy");
const toggleBuyModal = (e: MouseEvent) => {
  if ([modalBuy, buyBtn, closeBtn].includes(e.target as HTMLElement)) {
    modalBuy?.classList.toggle("active");
    e.stopPropagation();
  }
};
buyBtn?.addEventListener("click", toggleBuyModal);
modalBuy?.addEventListener("click", toggleBuyModal);
closeBtn?.addEventListener("click", toggleBuyModal);
const bookBtn: HTMLElement | null = document.querySelector(".book-button");
bookBtn?.addEventListener("click", function (e) {
  const x = e.clientX;
  const y = e.clientY;

  const buttonTop = this.getBoundingClientRect().y;
  const buttonLeft = this.getBoundingClientRect().x;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement("span");

  circle.classList.add("circle");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  this && this.appendChild(circle);
  setTimeout(() => circle.remove(), 500);
});

let result = {
  "(1024) Блок header +4": 0,
  "(1024) Секция Welcome +4": 0,
  "(1024) Секция Visiting +4": 0,
  "(1024) Секция Explore +4": 0,
  "(1024) Секция Video +4": 0,
  "(1024) Секция Gallery +4": 0,
  "(1024) Секция Tickets +4": 0,
  "(1024) Форма покупки билетов +4": 0,
  "(1024) Секция Contacts +4": 0,
  "(1024) Блок footer +4": 0,
  "(768) Блок header +4": 0,
  "(768) Секция Welcome +4": 0,
  "(768) Секция Visiting +4": 0,
  "(768) Секция Explore +4": 0,
  "(768) Секция Video +4": 0,
  "(768) Секция Gallery +4": 0,
  "(768) Секция Tickets +4": 0,
  "(768) Форма покупки билетов +4": 0,
  "(768) Секция Contacts +4": 0,
  "(768) Блок footer +4": 0,
  "(420) Блок header +4": 0,
  "(420) Секция Welcome +4": 0,
  "(420) Секция Visiting +4": 0,
  "(420) Секция Explore +4": 0,
  "(420) Секция Video +4": 0,
  "(420) Секция Gallery +4": 0,
  "(420) Секция Tickets +4": 0,
  "(420) Форма покупки билетов +4": 0,
  "(420) Секция Contacts +4": 0,
  "(420) Блок footer +4": 0,
  "Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +6": 0,
  "При изменении ширины экрана плавно изменяются размеры: слайдера в секции Welcome +2": 0,
  "При изменении ширины экрана плавно изменяются размеры: слайдера сравнения изображений в секции Explore +2": 0,
  "При изменении ширины экрана плавно изменяются размеры: кастомного видеоплеера в секции Video +2": 0,
  "При изменении ширины экрана плавно изменяются размеры: слайдера в секции Video +2": 0,
  "При изменении ширины экрана плавно изменяются размеры: YouTube-видео в плейлисте в секции Video, маленькие видео выровнены по краям большого +2": 0,
  "При изменении ширины экрана плавно изменяются размеры: галереи изображений и изображений в ней +2": 0,
  "При изменении ширины экрана плавно изменяются размеры: карты +2": 0,
  "На ширине экрана 1024рх и меньше реализовано адаптивное меню +12": 0,
  "при нажатии на бургер-иконку меню появляется, плавно выдвигаясь слева, бургер-иконка изменяется на крестик. При нажатии на крестик меню исчезает, плавно возвращаясь назад, иконка крестика превращается в бургер-иконку +2": 0,
  "ссылки в меню работают, обеспечивая плавную прокрутку по якорям +2": 0,
  "при клике по ссылке в адаптивном меню, или при клике по любому месту сайта, кроме самого адаптивного меню, меню закрывается +2": 0,
  "вёрстка меню соответствует макету на всех проверяемых разрешениях +6": 0,
  "Оптимизация скорости загрузки страницы +8": 0,
};
/*
0 to 49 (red): Poor - не выполнено, 0 баллов
50 to 89 (orange): Needs Improvement - частично выполнено +4
90 to 100 (green): Good - выполнено полностью +8
*/
let sum = 0;
for (let i of Object.entries(result)) {
  console.log(i[1] + "\t" + i[0]);
  sum += i[1];
}
console.table("Total result: " + sum);
