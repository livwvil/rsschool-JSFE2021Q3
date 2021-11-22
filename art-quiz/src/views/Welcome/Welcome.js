import WelcomeComponent from '@/components/Welcome/Welcome';

const WelcomeView = (urls) => {
  const container = document.createDocumentFragment();

  container.append(WelcomeComponent(urls));

  return container;
};

export default WelcomeView;
