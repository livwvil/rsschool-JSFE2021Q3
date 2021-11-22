import WelcomeComponent from '@/components/Welcome/Welcome';

const WelcomeView = (urls, settingsManager) => {
  const container = document.createDocumentFragment();

  container.append(WelcomeComponent(urls, settingsManager));

  return container;
};

export default WelcomeView;
