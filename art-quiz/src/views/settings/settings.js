import SettingsComponent from '@/components/settings/settings';

const SettingsView = () => {
  const container = document.createDocumentFragment();

  container.append(SettingsComponent());

  return container;
};

export default SettingsView;
