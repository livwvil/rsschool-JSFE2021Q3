import SettingsComponent from '@/components/Settings/Settings';

const SettingsView = () => {
  const container = document.createDocumentFragment();

  container.append(SettingsComponent());

  return container;
};

export default SettingsView;
