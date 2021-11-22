import Timer from '@/components/Timer/Timer';
import '@/views/PictureQuiz/style.scss';
import Card from '@/components/Card/Card';

const PictureQuizView = (questions, secondsCounter) => {
  const question = questions[0];

  const getGamePart = () => {
    const getQuestionPart = () => {
      const questionText = document.createElement('span');
      questionText.classList.add('question');
      questionText.innerText = `Which is ${question.author} picture?`;
      return questionText;
    };

    const getMasterpicePart = () => {
      const masterpiceContainer = document.createElement('div');
      masterpiceContainer.classList.add('masterpice-container');
      question.variants.forEach((variant) => {
        masterpiceContainer.append(Card({
          caption: null,
          image: {
            url: variant,
            shouldFade: false,
          },
          popup: null,
          href: null,
        }));
      });

      return masterpiceContainer;
    };

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game');

    gameContainer.append(getQuestionPart('Which is Edvard Munch picture?'));
    gameContainer.append(getMasterpicePart());

    return gameContainer;
  };

  const onClose = () => {
    console.log('close');
  };
  const onTimeEnds = () => {
    console.log('time ends');
  };

  const pictureQuizContainer = document.createElement('div');
  pictureQuizContainer.classList.add('picture-quiz-container');

  pictureQuizContainer.append(Timer(5, secondsCounter, onClose, onTimeEnds));
  pictureQuizContainer.append(getGamePart());

  return pictureQuizContainer;
};

export default PictureQuizView;
