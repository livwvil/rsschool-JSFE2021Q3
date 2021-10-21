const slideNextElement: HTMLElement | null =
  document.querySelector(".slide-next");
const slidePreviousElement: HTMLElement | null =
  document.querySelector(".slide-prev");
const imageContainer: HTMLElement | null =
  document.querySelector(".bg-container");

const REPO_IMAGES_COUNT = 20;

export function initSlider(timeOfDay: string, imageNumber: number) {
  if (!slideNextElement || !slidePreviousElement) {
    return;
  }

  let currentTimeOfDay: string = timeOfDay;
  let currentImageNumber: number = imageNumber;
  let canSetImage: boolean = true;

  function getImageRef(imageNumber: number) {
    const imageNumberStr = imageNumber.toString().padStart(2, "0");
    return `https://raw.githubusercontent.com/livwvil/stage1-tasks/assets/images/${currentTimeOfDay}/${imageNumberStr}.jpg`;
  }

  function setImage(
    imageRef: string,
    imageLoadedCallback: (() => void) | void
  ) {
    if (
      !imageContainer ||
      !canSetImage ||
      imageContainer.children.length > 2
    ) {
      return;
    }

    canSetImage = false;

    const img = new Image();
    img.src = imageRef;
    imageContainer.appendChild(img);
    img.onload = (e: Event) => {
      img.classList.add("visible");
      imageLoadedCallback && imageLoadedCallback();
    };
    img.ontransitionend = () => {
      canSetImage = true;
      if (imageContainer.children.length > 1) {
        imageContainer.firstChild?.remove();
      }
    };
  }

  function changeTimeOfDay(timeOfDay: string) {
    currentTimeOfDay = timeOfDay;
    const randomNumber = Math.round(Math.random() * 19) + 1;
    const imageRef = getImageRef(randomNumber);
    setImage(imageRef, () => {
      currentImageNumber = randomNumber;
    });
  }

  const setNextImage = (e: Event) => {
    const imgNumber = ((currentImageNumber + 1 - 1) % REPO_IMAGES_COUNT) + 1;
    const imageRef = getImageRef(imgNumber);
    setImage(imageRef, () => {
      currentImageNumber = imgNumber;
    });
  };

  const setPreviousImage = (e: Event) => {
    const imgNumber =
      currentImageNumber === 1
        ? REPO_IMAGES_COUNT
        : ((currentImageNumber - 1 - 1) % REPO_IMAGES_COUNT) + 1;
    const imageRef = getImageRef(imgNumber);
    setImage(imageRef, () => {
      currentImageNumber = imgNumber;
    });
  };

  setImage(getImageRef(currentImageNumber));
  slideNextElement.addEventListener("click", setNextImage);
  slidePreviousElement.addEventListener("click", setPreviousImage);

  return {
    changeTimeOfDay: changeTimeOfDay,
    finalize: () => {
      slideNextElement.removeEventListener("click", setNextImage);
      slidePreviousElement.removeEventListener("click", setPreviousImage);
    },
  };
}
