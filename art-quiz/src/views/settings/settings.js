import SettingsComponent from '@/components/Settings/Settings';

const SettingsView = (settingsManager) => {
  const container = document.createDocumentFragment();

  container.append(SettingsComponent(settingsManager));

  return container;
};

export default SettingsView;
