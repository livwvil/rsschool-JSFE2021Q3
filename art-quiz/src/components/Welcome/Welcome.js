import '@/components/Welcome/style.scss';
import WelcomeHTML from '@/components/Welcome/welcome.html';
import Button from '@/components/Button/Button';
import Utils from '@/utils';

const WelcomeComponent = (urls) => {
  const fragment = Utils.createFragmentFromString(WelcomeHTML);
  const bg = fragment.querySelector('.button-group');
  bg.append(Button('Artist quiz', '240px', '60px', () => {
    location = urls.artistQuiz;
  }));
  bg.append(Button('Pictures quiz', '240px', '60px', () => {
    location = urls.pictureQuiz;
  }));
  return fragment;
};

export default WelcomeComponent;
