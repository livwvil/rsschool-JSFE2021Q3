import Timer from '@/components/Timer/Timer';
import '@/views/ArtistQuiz/style.scss';
import Card from '@/components/card/card';
import Button from '@/components/button/button';

const url = '/assets/img/77.jpg';

const ArtistQuiz = () => {
  const getQuestionPart = (text) => {
    const questionText = document.createElement('span');
    questionText.classList.add('question');
    questionText.innerText = text;
    return questionText;
  };

  const getMasterpicePart = () => {
    const masterpiceContainer = document.createElement('div');
    masterpiceContainer.classList.add('masterpice');
    masterpiceContainer.append(Card(
      null,
      false,
      false,
      false,
      url,
    ));

    return masterpiceContainer;
  };

  const getButtonsPart = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    for (let i = 0; i < 4; i += 1) {
      buttonsContainer.append(Button('Rembrandt van Rijn', 'auto', '60px'));
    }

    return buttonsContainer;
  };

  const getGamePart = () => {
    const gameContainer = document.createElement('div');
    gameContainer.classList.add('game');

    gameContainer.append(getQuestionPart('Who is the author of this picture?'));
    gameContainer.append(getMasterpicePart());
    gameContainer.append(getButtonsPart());

    return gameContainer;
  };

  const artistQuizContainer = document.createElement('div');
  artistQuizContainer.classList.add('artist-quiz-container');

  artistQuizContainer.append(Timer('0:20'));
  artistQuizContainer.append(getGamePart());

  return artistQuizContainer;
};

export default ArtistQuiz;
