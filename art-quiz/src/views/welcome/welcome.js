import WelcomeComponent from '@/components/welcome/welcome';

const WelcomeView = () => {
  const container = document.createDocumentFragment();

  container.append(WelcomeComponent());

  return container;
};

export default WelcomeView;
