import playList from "./playList";

const audio: HTMLAudioElement | null = document.querySelector("audio");
const playPauseBtn: HTMLButtonElement | null =
  document.querySelector("#play-pause-btn");
const nextBtn: HTMLButtonElement | null = document.querySelector(".play-next");
const prevBtn: HTMLButtonElement | null = document.querySelector(".play-prev");
const playlistContainer: HTMLElement | null =
  document.querySelector(".play-list");

const title: HTMLSpanElement | null = document.querySelector(
  ".player-controls .title"
);
const currentTime: HTMLSpanElement | null = document.querySelector(
  ".player-progress-current"
);
const totalTime: HTMLSpanElement | null = document.querySelector(
  ".player-progress-total"
);
const progress: HTMLInputElement | null =
  document.querySelector(".player-progress");
const volume: HTMLInputElement | null =
  document.querySelector(".player-volume");
const muteBtn: HTMLButtonElement | null =
  document.querySelector(".player-mute");

export function initAudioplayer() {
  if (
    !audio ||
    !playPauseBtn ||
    !nextBtn ||
    !prevBtn ||
    !playlistContainer ||
    !title ||
    !currentTime ||
    !totalTime ||
    !muteBtn ||
    !volume ||
    !progress
  ) {
    return;
  }

  let isPlay = false;
  let trackNumber = 0;

  function playAudio() {
    if (!audio || !playlistContainer || !playPauseBtn || !title) {
      return;
    }

    isPlay = true;
    setupTrack();
    for (let track of playlistContainer.children) {
      track.classList.remove("active");
    }
    playlistContainer.children[trackNumber].classList.add("active");
    playPauseBtn.classList.add("pause");
    playPauseBtn.classList.remove("play");
    audio.currentTime = 0;
    audio.play();
  }

  function play_pause() {
    if (!audio || !playPauseBtn || !playlistContainer) {
      return;
    }

    if (!isPlay) {
      isPlay = true;
      playPauseBtn.classList.add("pause");
      playPauseBtn.classList.remove("play");
      playlistContainer.children[trackNumber].classList.add("active");
      audio.play();
    } else {
      isPlay = false;
      playPauseBtn.classList.remove("pause");
      playPauseBtn.classList.add("play");
      playlistContainer.children[trackNumber].classList.remove("active");
      audio.pause();
    }
  }

  function nextTrack() {
    const tracks = playList.length;
    trackNumber = (trackNumber + 1) % tracks;
    playAudio();
  }

  function prevTrack() {
    const tracks = playList.length;
    trackNumber =
      trackNumber === 0
        ? tracks - 1
        : (trackNumber = (trackNumber - 1) % tracks);
    playAudio();
  }

  const setupTrack = () => {
    const track = playList[trackNumber];
    audio.src = track.src;
    title.textContent = track.title;
    progress.value = "0";
    progress.dispatchEvent(new Event("change"));
    currentTime.textContent = "0:00";
    totalTime.textContent = track.duration;
  };

  function getProgressByTime(current: number, total: number) {
    let videoTime = Math.round(current);
    let videoLength = Math.round(total);
    const progress = (videoTime * 100) / videoLength;
    return isFinite(progress) ? progress : 0;
  }

  function getTimeByProgress(progress: number, total: number) {
    const result = (total * progress) / 100;
    return isFinite(result) ? result : total;
  }

  function getTimeFormatted(curSeconds: number) {
    const minutes = Math.floor(curSeconds / 60);
    const seconds = Math.floor(curSeconds - minutes * 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  const onTimeUpdate = (e: Event) => {
    const timeProgress = getProgressByTime(
      audio.currentTime || 0,
      audio.duration || 0
    );
    if (progress) {
      currentTime.textContent = getTimeFormatted(audio.currentTime);
      progress.value = timeProgress.toString();
      progress.dispatchEvent(new Event("change"));
    }
  };

  const toggleMute = () => {
    if (!audio.muted) {
      volume.value = "0";
      audio.muted = true;
      muteBtn.classList.add("active");
    } else {
      volume.value = String(audio.volume * 100);
      audio.muted = false;
      muteBtn.classList.remove("active");
    }
  };

  const onProgressChange = () => {
    const value = Math.round(Number.parseFloat(progress.value));
    audio.currentTime = getTimeByProgress(value, audio.duration);
  };

  const onVolumeChange = () => {
    const value = Number.parseFloat(volume.value);
    audio.volume = value / 100;
    if (audio.volume <= 0.05 && !audio.muted) {
      toggleMute();
    } else if (audio.volume > 0.05 && audio.muted) {
      toggleMute();
    }
  };

  setupTrack();
  audio.addEventListener("ended", nextTrack);
  audio.addEventListener("timeupdate", onTimeUpdate);
  progress.addEventListener("input", onProgressChange);
  volume.addEventListener("input", onVolumeChange);
  muteBtn.addEventListener("click", toggleMute);

  playPauseBtn.addEventListener("click", play_pause);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  for (let i = 0; i < playList.length; i++) {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = playList[i].title;
    li.addEventListener("click", () => {
      if (trackNumber === i) {
        play_pause();
      } else {
        trackNumber = i;
        playAudio();
      }
    });
    playlistContainer.append(li);
  }
  return {
    finalize: () => {
      playPauseBtn.removeEventListener("click", play_pause);
      nextBtn.removeEventListener("click", nextTrack);
      prevBtn.removeEventListener("click", prevTrack);
      audio.removeEventListener("ended", nextTrack);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      progress.removeEventListener("input", onProgressChange);
      volume.removeEventListener("input", onVolumeChange);
      muteBtn.removeEventListener("click", toggleMute);
      playlistContainer.innerHTML = "";
    },
  };
}
