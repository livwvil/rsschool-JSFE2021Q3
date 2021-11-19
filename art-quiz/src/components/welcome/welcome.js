import '@/components/welcome/style.scss';
import WelcomeHTML from '@/components/welcome/welcome.html';
import Button from '@/components/button/button';
import createFragmentFromString from '@/components/utils';

const WelcomeComponent = () => {
  const fragment = createFragmentFromString(WelcomeHTML);
  const bg = fragment.querySelector('.button-group');
  bg.append(Button('Artist quiz'));
  bg.append(Button('Pictures quiz'));
  return fragment;
};

export default WelcomeComponent;
