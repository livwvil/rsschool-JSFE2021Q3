import '@/components/settings/style.scss';
import SettingsHTML from '@/components/settings/settings.html';
import Button from '@/components/button/button';
import createFragmentFromString from '@/components/utils';

const SettingsComponent = () => {
  const fragment = createFragmentFromString(SettingsHTML);

  const buttonsContainer = fragment.querySelector('.buttons-container');
  buttonsContainer.append(Button('Default', '240px', '60px'));
  buttonsContainer.append(Button('Save', '240px', '60px'));

  return fragment;
};

export default SettingsComponent;
