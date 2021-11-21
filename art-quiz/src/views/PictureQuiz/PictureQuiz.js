import Timer from '@/components/Timer/Timer';
import '@/views/PictureQuiz/style.scss';
import Card from '@/components/Card/Card';

const card = {
  caption: null,
  image: {
    url: '/assets/img/77.jpg',
    shouldFade: false,
  },
  popup: null,
  href: null,
};

const PictureQuizView = () => {
  const getQuestionPart = (text) => {
    const questionText = document.createElement('span');
    questionText.classList.add('question');
    questionText.innerText = text;
    return questionText;
  };

  const getMasterpicePart = () => {
    const masterpiceContainer = document.createElement('div');
    masterpiceContainer.classList.add('masterpice-container');
    for (let i = 0; i < 4; i += 1) {
      masterpiceContainer.append(Card(card));
    }

    return masterpiceContainer;
  };

  const getGamePart = () => {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game');

    gameContainer.append(getQuestionPart('Which is Edvard Munch picture?'));
    gameContainer.append(getMasterpicePart());

    return gameContainer;
  };

  const pictureQuizContainer = document.createElement('div');
  pictureQuizContainer.classList.add('picture-quiz-container');

  pictureQuizContainer.append(Timer('0:20'));
  pictureQuizContainer.append(getGamePart());

  return pictureQuizContainer;
};

export default PictureQuizView;
