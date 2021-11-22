import '@/components/Settings/style.scss';
import SettingsHTML from '@/components/Settings/settings.html';
import Button from '@/components/Button/Button';
import Utils from '@/utils';

const SettingsComponent = (settingsManager) => {
  const fragment = Utils.createFragmentFromString(SettingsHTML);

  const buttonsContainer = fragment.querySelector('.buttons-container');
  buttonsContainer.append(Button('Default', '240px', '60px'));
  buttonsContainer.append(Button('Save', '240px', '60px'));

  const volumePicker = fragment.querySelector('#volume');
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
    settingsManager.setVolume(volumePicker.value);
  });

  [
    ...buttonsContainer.children,
    ...fragment.querySelectorAll('.answer-time-container button'),
    fragment.querySelector('.slider.round'),
    volumePicker,
  ].forEach((elem) => {
    elem.addEventListener('mouseup', () => settingsManager.playSound('/assets/audio/click.wav'));
  });

  return fragment;
};

export default SettingsComponent;
