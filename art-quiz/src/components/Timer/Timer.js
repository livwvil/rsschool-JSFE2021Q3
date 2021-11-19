import '@/components/Timer/style.scss';

const Timer = (time) => {
  const quitButton = document.createElement('button');
  quitButton.classList.add('quit-btn');

  const timeBar = document.createElement('input');
  timeBar.type = 'range';
  timeBar.classList.add('time-bar');

  const timeText = document.createElement('span');
  timeText.classList.add('time-text');
  timeText.innerText = time;

  const timerContainer = document.createElement('div');
  timerContainer.classList.add('timer-container');
  timerContainer.append(quitButton);
  timerContainer.append(timeBar);
  timerContainer.append(timeText);
  return timerContainer;
};

export default Timer;
