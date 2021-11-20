import '@/components/Welcome/style.scss';
import WelcomeHTML from '@/components/Welcome/welcome.html';
import Button from '@/components/Button/Button';
import createFragmentFromString from '@/utils';

const WelcomeComponent = () => {
  const fragment = createFragmentFromString(WelcomeHTML);
  const bg = fragment.querySelector('.button-group');
  bg.append(Button('Artist quiz', '240px', '60px'));
  bg.append(Button('Pictures quiz', '240px', '60px'));
  return fragment;
};

export default WelcomeComponent;
