import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";

const alignContainer: HTMLElement | null = document.querySelector(
  "#welcome .align-container"
);
let sliderImgs: NodeListOf<HTMLImageElement> = document.querySelectorAll(
  ".welcome-section-wrapper .integrated-slider-wrapper img"
);
const sliderWrapper: HTMLElement | null = document.querySelector(
  ".welcome-section-wrapper .integrated-slider-wrapper"
);
const welcomeText: HTMLSpanElement | null = document.querySelector(
  ".welcome-section-wrapper .welcome-text"
);
const current: HTMLSpanElement | null = document.querySelector(
  ".slider-controls .pages .current"
);
const total: HTMLSpanElement | null = document.querySelector(
  ".slider-controls .pages .total"
);
const thumbs: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  ".slider-controls .thumbs .thumb"
);
const left: HTMLButtonElement | null = document.querySelector(
  ".slider-controls .arrows .left"
);
const right: HTMLButtonElement | null = document.querySelector(
  ".slider-controls .arrows .right"
);

function initWelcomeSlider() {
  Swiper.use([Navigation, Pagination]);
  const swiper = new Swiper(".mySwiper", {
    loop: true,
  });

  swiper.on("slideChange", function (e) {
    const imgIndex = e.realIndex + 1;

    if (current && total) {
      current.textContent = imgIndex.toString().padStart(2, "0");
      total.textContent = "05";
    }

    if (thumbs) {
      const activeThumb = [...thumbs].find((thumb) =>
        thumb.classList.contains("active")
      );
      const nextActiveThumb = thumbs[imgIndex - 1];
      [activeThumb, nextActiveThumb].forEach((thumb) => {
        thumb?.classList.toggle("active");
      });
    }
  });

  if (thumbs) {
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        swiper.slideTo(index + 1);
      });
    });
  }

  if (left && right && thumbs) {
    right.addEventListener("click", () => {
      swiper.slideNext();
    });
    left.addEventListener("click", () => {
      swiper.slidePrev();
    });
  }
}

function welcomeSliderQuickFix() {
  if (!alignContainer || !sliderWrapper || !welcomeText) {
    return;
  }

  const fixSliderMaxWidth = () => {
    const currentwelcomeTextWidth = welcomeText.getBoundingClientRect().width;
    const alignContainerStyles = window.getComputedStyle(alignContainer);

    const alignContainerWidth = alignContainer.getBoundingClientRect().width;
    const alignContainerPaddingLeft = Number.parseFloat(
      alignContainerStyles.paddingLeft
    );
    const alignContainerPaddingRight = Number.parseFloat(
      alignContainerStyles.paddingRight
    );

    const calculatedSliderWidth =
      alignContainerWidth -
      (alignContainerPaddingLeft + alignContainerPaddingRight * 2) -
      currentwelcomeTextWidth;

    const newSliderWidth =
      window.innerWidth <= 768
        ? "none"
        : `${Math.min(1000, calculatedSliderWidth)}px`;

    [...sliderImgs, sliderWrapper].forEach((item) => {
      item.style.maxWidth = newSliderWidth;
    });
  };

  window.addEventListener("resize", fixSliderMaxWidth);

  fixSliderMaxWidth();
}

export function activateWelcomeSlider() {
  Promise.all(
    [...sliderImgs].map((img) => {
      new Promise((resolve) => {
        img.addEventListener("load", resolve);
      });
    })
  ).then(() => {
    initWelcomeSlider();
    setTimeout(() => {
      welcomeSliderQuickFix();
    }, 100);
  });
}
