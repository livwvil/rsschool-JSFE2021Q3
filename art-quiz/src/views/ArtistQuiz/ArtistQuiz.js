import Timer from '@/components/Timer/Timer';
import '@/views/ArtistQuiz/style.scss';
import Card from '@/components/Card/Card';
import Button from '@/components/Button/Button';

const ArtistQuizView = (questions, secondsCounter) => {
  const question = questions[3];

  const getGamePart = () => {
    const getQuestionPart = (text) => {
      const questionText = document.createElement('span');
      questionText.classList.add('question');
      questionText.innerText = text;
      return questionText;
    };

    const getMasterpicePart = () => {
      const masterpiceContainer = document.createElement('div');
      masterpiceContainer.classList.add('masterpice');
      masterpiceContainer.append(Card({
        caption: null,
        image: {
          url: question.href,
          shouldFade: false,
        },
        popup: null,
        href: null,
      }));

      return masterpiceContainer;
    };

    const getButtonsPart = () => {
      const buttonsContainer = document.createElement('div');
      buttonsContainer.classList.add('buttons-container');
      question.variants.forEach((variant) => {
        buttonsContainer.append(Button(variant, 'auto', '60px'));
      });

      return buttonsContainer;
    };

    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game');

    gameContainer.append(getQuestionPart('Who is the author of this picture?'));
    gameContainer.append(getMasterpicePart());
    gameContainer.append(getButtonsPart());

    return gameContainer;
  };

  const onClose = () => {
    console.log('close');
  };
  const onTimeEnds = () => {
    console.log('time ends');
  };

  const artistQuizContainer = document.createElement('div');
  artistQuizContainer.classList.add('artist-quiz-container');

  artistQuizContainer.append(Timer(5, secondsCounter, onClose, onTimeEnds));
  // artistQuizContainer.append(Timer('∞'));
  artistQuizContainer.append(getGamePart());

  return artistQuizContainer;
};

export default ArtistQuizView;
