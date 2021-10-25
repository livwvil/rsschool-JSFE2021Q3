import * as flickerAPI from "./flickerAPI";
import * as githubAPI from "./githubAPI";

const slideNextElement: HTMLElement | null =
  document.querySelector(".slide-next");
const slidePreviousElement: HTMLElement | null =
  document.querySelector(".slide-prev");
const imageContainer: HTMLElement | null =
  document.querySelector(".bg-container");
const loaderElement: HTMLElement | null = document.querySelector(".loader");

// max count for GitHub is 20
const REPO_IMAGES_COUNT = 20;

export function initSlider(timeOfDay: string, imageNumber: number) {
  if (!slideNextElement || !slidePreviousElement) {
    return;
  }

  let currentTimeOfDay: string = timeOfDay;
  let currentImageNumber: number = imageNumber;
  let canSetImage: boolean = true;

  let urlGenerator: AsyncGenerator<string, null, unknown>;
  const imageUrls: string[] = [];

  const getNextImageUrl = async () => {
    loaderElement?.classList.add("active");
    const res = await urlGenerator.next();
    loaderElement?.classList.remove("active");
    if (!res.done && res.value) {
      const url = res.value;
      imageUrls.push(url);
      return true;
    }
    return false;
  };

  const initImagesUrlGenerator = () => {
    currentImageNumber = 0;
    imageUrls.length = 0;

    const api = localStorage.getItem("img-src") || "github";
    const tags = localStorage.getItem("img-src-tags") || currentTimeOfDay;

    if (api === "api2") {
      urlGenerator = flickerAPI.getNextUrl(tags);
    } else {
      urlGenerator = githubAPI.getNextUrl(REPO_IMAGES_COUNT, currentTimeOfDay);
    }
  };

  function getImageRef(imageNumber: number) {
    return imageUrls[imageNumber];
  }

  function setImage(
    imageRef: string,
    imageLoadedCallback: (() => void) | void
  ) {
    if (!imageContainer || !canSetImage || imageContainer.children.length > 2) {
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
    initApi();
  }

  const setNextImage = async () => {
    if (
      currentImageNumber < REPO_IMAGES_COUNT &&
      currentImageNumber === imageUrls.length - 1
    ) {
      const urlFetched = await getNextImageUrl();
    }

    const imgNumber = (currentImageNumber + 1) % imageUrls.length;
    const imageRef = getImageRef(imgNumber);
    setImage(imageRef, () => {
      currentImageNumber = imgNumber;
    });
  };

  const setPreviousImage = () => {
    const imgNumber =
      currentImageNumber === 0
        ? imageUrls.length - 1
        : (currentImageNumber - 1) % imageUrls.length;
    const imageRef = getImageRef(imgNumber);
    setImage(imageRef, () => {
      currentImageNumber = imgNumber;
    });
  };

  const onApiChanged = () => {
    initApi();
  };

  const initApi = () => {
    initImagesUrlGenerator();
    getNextImageUrl().then((res) => {
      if (res) {
        setImage(getImageRef(currentImageNumber));
        slideNextElement.addEventListener("click", setNextImage);
        slidePreviousElement.addEventListener("click", setPreviousImage);
      }
    });
  };

  initApi();

  return {
    changeTimeOfDay: changeTimeOfDay,
    onApiChanged: onApiChanged,
    finalize: () => {
      slideNextElement.removeEventListener("click", setNextImage);
      slidePreviousElement.removeEventListener("click", setPreviousImage);
    },
  };
}
