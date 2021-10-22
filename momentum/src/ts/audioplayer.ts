import playList from "./playList";

const audio: HTMLAudioElement | null = document.querySelector("audio");
const playPauseBtn: HTMLButtonElement | null =
  document.querySelector("#play-pause-btn");
const nextBtn: HTMLButtonElement | null = document.querySelector(".play-next");
const prevBtn: HTMLButtonElement | null = document.querySelector(".play-prev");
const playlistContainer: HTMLElement | null =
  document.querySelector(".play-list");

export function initAudioplayer() {
  if (!audio || !playPauseBtn || !nextBtn || !prevBtn || !playlistContainer) {
    return;
  }

  let isPlay = false;
  let trackNumber = 0;

  function playAudio() {
    if (!audio || !playlistContainer || !playPauseBtn) {
      return;
    }

    isPlay = true;
    audio.src = playList[trackNumber].src;
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

  audio.volume = 0.2;
  audio.src = playList[trackNumber].src;
  audio.addEventListener("ended", nextTrack);
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
      playlistContainer.innerHTML = "";
    },
  };
}
