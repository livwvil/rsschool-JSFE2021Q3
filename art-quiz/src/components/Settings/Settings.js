import '@/components/Settings/style.scss';
import SettingsHTML from '@/components/Settings/settings.html';
import Button from '@/components/Button/Button';
import Utils from '@/utils';
import { DEFAULT_TIME_TO_ANSWER_INF, DEFAULT_VOLUME } from '@/constants';

const SettingsComponent = (settingsManager) => {
  let volume = settingsManager.getVolume();
  let gameTime = settingsManager.getGameTime();

  const fragment = Utils.createFragmentFromString(SettingsHTML);
  const timeGameChkBox = fragment.querySelector('#time-game');
  const timeGameInp = fragment.querySelector('#answ-time');
  const timeInput = fragment.querySelector('.answer-time-container');
  const volumePicker = fragment.querySelector('#volume');
  const buttonsContainer = fragment.querySelector('.buttons-container');

  buttonsContainer.append(Button('Default', '240px', '60px', () => {
    volumePicker.value = DEFAULT_VOLUME;
    volumePicker.dispatchEvent(new Event('input'));
    timeGameChkBox.checked = false;
    timeGameChkBox.dispatchEvent(new Event('change'));
  }));
  buttonsContainer.append(Button('Save', '240px', '60px', () => {
    settingsManager.setVolume(volume);
    settingsManager.setGameTime(gameTime);
  }));

  const setVolumeGrad = () => {
    const style = `linear-gradient(
      to right,
      #ffbca2 0%,
      #ffbca2 ${volumePicker.value}%,
      #a4a4a4 ${volumePicker.value}%,
      #a4a4a4 100%
      )`;
    volumePicker.style.background = style;
  };

  volumePicker.value = settingsManager.getVolume();
  setVolumeGrad();

  volumePicker.addEventListener('input', () => {
    setVolumeGrad();
    volume = volumePicker.value;
  });

  [
    ...buttonsContainer.children,
    ...fragment.querySelectorAll('.answer-time-container button'),
    fragment.querySelector('.slider.round'),
    volumePicker,
  ].forEach((elem) => {
    elem.addEventListener('mouseup', () => settingsManager.playSound('/assets/audio/click.wav'));
  });

  const timeToAnswer = settingsManager.getGameTime();
  timeGameChkBox.checked = (timeToAnswer !== DEFAULT_TIME_TO_ANSWER_INF);
  if (timeGameChkBox.checked) {
    timeGameInp.value = timeToAnswer;
  } else {
    timeInput.classList.add('hidden');
  }

  timeGameChkBox.addEventListener('change', () => {
    if (timeGameChkBox.checked) {
      timeInput.classList.remove('hidden');
      gameTime = timeGameInp.value;
    } else {
      timeInput.classList.add('hidden');
      gameTime = DEFAULT_TIME_TO_ANSWER_INF;
    }
  });
  timeGameInp.addEventListener('change', () => {
    if (timeGameChkBox.checked) {
      gameTime = timeGameInp.value;
    }
  });

  return fragment;
};

export default SettingsComponent;
