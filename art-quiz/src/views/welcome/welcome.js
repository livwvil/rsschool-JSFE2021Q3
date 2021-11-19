import WelcomeComponent from '@/components/Welcome/Welcome';

const WelcomeView = () => {
  const container = document.createDocumentFragment();

  container.append(WelcomeComponent());

  return container;
};

export default WelcomeView;
