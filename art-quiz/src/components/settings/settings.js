import '@/components/Settings/style.scss';
import SettingsHTML from '@/components/Settings/settings.html';
import Button from '@/components/Button/Button';
import Utils from '@/utils';

const SettingsComponent = () => {
  const fragment = Utils.createFragmentFromString(SettingsHTML);

  const buttonsContainer = fragment.querySelector('.buttons-container');
  buttonsContainer.append(Button('Default', '240px', '60px'));
  buttonsContainer.append(Button('Save', '240px', '60px'));

  return fragment;
};

export default SettingsComponent;
