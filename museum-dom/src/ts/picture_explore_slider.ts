const peSliderImg: HTMLImageElement | null =
  document.querySelector("#pe-slider");
const backImg: HTMLImageElement | null = document.querySelector("#p-dark");
const frontImgContainer: HTMLElement | null =
  document.querySelector("#light-container");

export function activatePeSlider() {
  if (!peSliderImg || !frontImgContainer || !backImg) {
    return;
  }

  backImg.addEventListener("load", () => {
    // console.log("slider init started");
    initPeSlider();
  });
}

function initPeSlider() {
  if (!peSliderImg || !frontImgContainer || !backImg) {
    return;
  }

  const getSliderPos = () => {
    return Number.parseFloat(window.getComputedStyle(peSliderImg).marginLeft);
  };

  const setSliderPos = (pos: number) => {
    peSliderImg.style.marginLeft = `${pos}px`;
  };

  const setFrontImgWidth = (width: number) => {
    frontImgContainer.style.width = `${width}px`;
  };

  const applySlider = (newGlobalPos: number) => {
    const backImgGlobalPos = backImg.getBoundingClientRect().x;
    const backImgWidth = backImg.getBoundingClientRect().width;
    const sliderWidth = peSliderImg.getBoundingClientRect().width;

    const globalMinPos = backImgGlobalPos;
    const globalMaxPos = backImgGlobalPos + backImgWidth - sliderWidth;

    let frontImgWidth;
    let sliderPos;

    if (newGlobalPos >= globalMaxPos) {
      sliderPos = backImgWidth - sliderWidth;
      frontImgWidth = backImgWidth - sliderWidth / 2;
    } else if (newGlobalPos <= globalMinPos) {
      sliderPos = 0;
      frontImgWidth = sliderWidth / 2;
    } else {
      sliderPos = newGlobalPos - backImgGlobalPos;
      frontImgWidth = sliderPos + sliderWidth / 2;
    }

    setFrontImgWidth(frontImgWidth);
    setSliderPos(sliderPos);
  };

  //TODO 750px => 777px something wired occures
  let lastBackImgWidth = backImg.getBoundingClientRect().width;
  window.addEventListener("resize", (e: UIEvent) => {
    const currentBackImgWidth = backImg.getBoundingClientRect().width;
    const ratio = currentBackImgWidth / lastBackImgWidth;
    lastBackImgWidth = currentBackImgWidth;

    setSliderPos(getSliderPos() * ratio);

    applySlider(getSliderPos() + backImg.getBoundingClientRect().x);
  });

  var isSlideiPicked = false;

  const handleStopSlide = (e: Event) => {
    // e.preventDefault();
    isSlideiPicked = false;
  };
  document.addEventListener("touchend", handleStopSlide, true);
  document.addEventListener("mouseup", handleStopSlide, true);

  const handleStartSlide = (e: Event) => {
    isSlideiPicked = true;
  };
  peSliderImg.addEventListener("mousedown", handleStartSlide, true);
  peSliderImg.addEventListener("touchstart", handleStartSlide, true);

  const handleMoveSlider = (e: MouseEvent | TouchEvent) => {
    if (isSlideiPicked) {
      e.preventDefault();
      const pointerPos =
        e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
      applySlider(pointerPos - peSliderImg.getBoundingClientRect().width / 2);
    }
  };
  document.addEventListener("mousemove", handleMoveSlider, true);
  document.addEventListener("touchmove", handleMoveSlider, true);

  applySlider(
    backImg.getBoundingClientRect().x +
      backImg.getBoundingClientRect().width * 0.65
  );
}
