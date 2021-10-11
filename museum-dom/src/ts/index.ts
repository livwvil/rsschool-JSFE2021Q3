import "../sass/style.scss";
import { activateModalBuy } from "./modal_buy";
import { activatePeSlider } from "./picture_explore_slider";
import { printSelfcheck } from "./self_check";
import { activateTickets } from "./tickets";
import { shuffleArray } from "./tools";
import { activateWelcomeSlider } from "./welcome_slider";

export function randomizeImages() {
  let images: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".art-gallery img");
  let imagesShuffled = Array.from(images);
  shuffleArray(imagesShuffled);
  imagesShuffled.forEach((image, idx) => {
    image.src = `assets/img/galery${idx + 1}.jpg`;
  });
}

// randomizeImages();

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

const burgerBtn: HTMLElement | null = document.querySelector(".burger");
const navMenu: HTMLElement | null = document.querySelector(".mobile-nav");
const welcomeTextBlock: HTMLElement | null = document.querySelector(
  ".welcome-text-wrapper"
);
const mobileMenuLiItems: NodeListOf<HTMLImageElement> =
  document.querySelectorAll(".mobile-nav .nav-menu .nav-item");
const mobileMenuBelongItems = [burgerBtn, ...mobileMenuLiItems];
const mobileMenuToggler = (e: MouseEvent) => {
  let burgerClasses = burgerBtn?.classList;
  burgerClasses?.toggle("active");

  let menuClasses = navMenu?.classList;
  menuClasses?.toggle("active");

  let welcomeTextBlockClassList = welcomeTextBlock?.classList;
  welcomeTextBlockClassList?.toggle("hidden");

  e.stopPropagation();
};
mobileMenuBelongItems.forEach((it) => {
  it?.addEventListener("click", mobileMenuToggler);
});

document.addEventListener("click", (e: MouseEvent) => {
  if (burgerBtn?.classList.contains("active")) {
    mobileMenuToggler(e);
  }
});

function mapQuickFix() {
  const text: HTMLElement | null = document.querySelector("#contacts .text");
  const mapWrapper: HTMLElement | null =
    document.querySelector("#contacts .map");
  const alignContainer: HTMLElement | null =
    document.querySelector("#contacts");

  if (!alignContainer || !mapWrapper || !text) {
    return;
  }

  const fixMapWidth = () => {
    const currentwelcomeTextWidth = text.getBoundingClientRect().width;
    const alignContainerStyles = window.getComputedStyle(alignContainer);

    const alignContainerWidth = alignContainer.getBoundingClientRect().width;
    const alignContainerPaddingLeft = Number.parseFloat(
      alignContainerStyles.paddingLeft
    );
    const alignContainerPaddingRight = Number.parseFloat(
      alignContainerStyles.paddingRight
    );

    const calculatedMapWidth =
      alignContainerWidth -
      (alignContainerPaddingLeft + alignContainerPaddingRight) -
      currentwelcomeTextWidth;

    const newMapWidth =
      window.innerWidth <= 768
        ? `${Math.min(711, calculatedMapWidth + currentwelcomeTextWidth)}px`
        : `${Math.min(960, calculatedMapWidth)}px`;

    mapWrapper.style.width = newMapWidth;
    mapWrapper.style.height = `${
      Number.parseFloat(newMapWidth) * (620 / 960)
    }px`;
  };

  window.addEventListener("resize", fixMapWidth);

  fixMapWidth();
}

document.addEventListener("DOMContentLoaded", () => {
  activateWelcomeSlider();
  activatePeSlider();
  activateTickets();
  activateModalBuy();
  mapQuickFix();
  printSelfcheck(false);
});
