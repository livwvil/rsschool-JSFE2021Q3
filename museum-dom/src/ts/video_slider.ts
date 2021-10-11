import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";

let iframes: NodeListOf<HTMLIFrameElement> =
  document.querySelectorAll("#video iframe");
let mainVideo: HTMLVideoElement | null = document.querySelector("#main-video");
let bigPlayBtn: HTMLImageElement | null = document.querySelector(
  "#video .play-big-btn"
);
let progress: HTMLInputElement | null = document.querySelector(
  "#video .progress.timeline"
);
let littlePlayBtn: HTMLImageElement | null =
  document.querySelector("#video .play-btn img");
const thumbs: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  "#video .video-gallery .controls .thumb"
);
const left: HTMLButtonElement | null = document.querySelector(
  "#video .video-gallery .controls .left"
);
const right: HTMLButtonElement | null = document.querySelector(
  "#video .video-gallery .controls .right"
);

function initWelcomeSlider() {
  Swiper.use([Navigation, Pagination]);
  const swiper = new Swiper(".mySwiper2", {
    loop: true,
    slidesPerView: 3,
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 42,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 42,
      },
      420: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  swiper.on("slideChange", function (e) {
    const imgIndex = e.realIndex + 1;

    console.log(imgIndex);

    if (mainVideo) {
      const idxFromZero = imgIndex - 1;
      mainVideo.src = `assets/video/video${idxFromZero}.mp4`;
      mainVideo.poster = `./assets/video/poster${idxFromZero}.jpg`;
    }

    const activeThumb = [...thumbs].find((thumb) =>
      thumb.classList.contains("active")
    );
    const nextActiveThumb = thumbs[imgIndex - 1];
    [activeThumb, nextActiveThumb].forEach((thumb) => {
      thumb?.classList.toggle("active");
    });
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      swiper.slideTo(((index + 3 - 1) % 5) + 1);
    });
  });

  if (left && right && thumbs) {
    right.addEventListener("click", () => {
      swiper.slideNext();
    });
    left.addEventListener("click", () => {
      swiper.slidePrev();
    });
  }
}

function mainVideoPauseView() {
  if (!bigPlayBtn || !littlePlayBtn) {
    return;
  }

  bigPlayBtn.style.visibility = "visible";
  littlePlayBtn.src = "assets/svg/play_control_mini.svg";
}
function mainVideoPlayView() {
  if (!bigPlayBtn || !littlePlayBtn) {
    return;
  }

  bigPlayBtn.style.visibility = "hidden";
  littlePlayBtn.src = "assets/svg/pause.svg";
}
function mainVideoStopView() {
  mainVideoPauseView();
  if (progress) {
    progress.value = "0";
  }
}

function getProgressByTime(current: number, total: number) {
  let videoTime = Math.round(current);
  let videoLength = Math.round(total);
  const progress = (videoTime * 100) / videoLength;
  return isFinite(progress) ? progress : 0;
}
function getTimeByProgress(progress: number, total: number) {
  return total * progress / 100
}

function initMainVideoControls() {
  if(!progress) {
    return
  }

  progress.value = "0";
  progress.dispatchEvent(new Event("change"));
  
  [bigPlayBtn, littlePlayBtn, mainVideo].forEach((btn) => {
    btn?.addEventListener("click", (e:Event) => {
      if (mainVideo?.paused) {
        mainVideo?.play();
        mainVideoPlayView();
      } else {
        mainVideo?.pause();
        mainVideoPauseView();
      }
      e.stopPropagation()
    });
  });
  
  mainVideo?.addEventListener("timeupdate", (e) => {
    const timeProgress = getProgressByTime(
      mainVideo?.currentTime || 0,
      mainVideo?.duration || 0
    );
    if (progress) {
      progress.value = timeProgress.toString();
      progress.dispatchEvent(new Event("change"));
      if (100 - timeProgress <= 0.5) {
        mainVideoStopView();
        // mainVideo?.pause();
      }
    }
  });

  progress?.addEventListener("input", () => {
    if(!progress || !mainVideo) {
      return
    }
    const value = Math.round(Number.parseFloat(progress.value));
    mainVideo.currentTime = getTimeByProgress(value, mainVideo.duration)
  });
}
const fixPlayingTogether = () => {
  const stopAllIframes = (current: Element | null) => {
    iframes = document.querySelectorAll("#video iframe");
    iframes.forEach((it) => {
      if (it === current) {
        return;
      }
      it?.contentWindow?.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    });
  };

  let lastActiveIframe: HTMLIFrameElement;
  var monitor = setInterval(function () {
    var elem = document.activeElement;
    if (elem && elem.tagName == "IFRAME") {
      if (lastActiveIframe !== elem) {
        stopAllIframes(elem);
      }
      lastActiveIframe = elem as HTMLIFrameElement;
    }
  }, 100);

  const controls: (Element | null)[] = [left, right, ...thumbs];
  controls.forEach((control) => {
    control?.addEventListener("click", () => {
      stopAllIframes(control);
      mainVideoPauseView();
    });
  });
};

export function activateVideoSlider() {
  Promise.all(
    [...iframes].map((img) => {
      new Promise((resolve) => {
        img.addEventListener("load", resolve);
      });
    })
  ).then(() => {
    initWelcomeSlider();
    fixPlayingTogether();
    initMainVideoControls();
  });
}
