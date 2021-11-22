import '@/components/Timer/style.scss';

const msInSec = 1000;
const maxPercentage = 100;

const Timer = (sec, secondsCounter, onClose, onTimeEnds) => {
  let timeMs = sec * msInSec;
  let modalOpened = false;

  const quitButton = document.createElement('button');
  quitButton.classList.add('quit-btn');
  quitButton.addEventListener('click', () => {
    modalOpened = true;
    onClose((closed) => {
      if (!closed) {
        modalOpened = false;
      }
    });
  });

  const timeBar = document.createElement('input');
  timeBar.type = 'range';
  timeBar.classList.add('time-bar');
  timeBar.value = 0;

  const timeText = document.createElement('span');
  timeText.classList.add('time-text');
  timeText.innerText = sec;

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer-container');
  timerContainer.append(quitButton);
  timerContainer.append(timeBar);
  timerContainer.append(timeText);

  if (secondsCounter) {
    secondsCounter.addObserver(function observer(tickMilliseconds) {
      if (!modalOpened && timeMs >= 0) {
        timeMs -= tickMilliseconds;

        const givenTimeMs = sec * msInSec;
        const spendedTime = Math.abs(timeMs - givenTimeMs);
        const progress = Math.round((spendedTime / givenTimeMs) * maxPercentage);

        timeText.innerText = Math.round(timeMs / msInSec);
        timeBar.value = progress;
        const style = `linear-gradient(
        to right,
        #ffbca2 0%,
        #ffbca2 ${progress}%,
        #a4a4a4 ${progress}%,
        #a4a4a4 100%
        )`;
        timeBar.style.background = style;
      }
      if (timeMs <= 0) {
        secondsCounter.removeObserver(observer);
        onTimeEnds();
      }
    });
  }

  return timerContainer;
};

export default Timer;
