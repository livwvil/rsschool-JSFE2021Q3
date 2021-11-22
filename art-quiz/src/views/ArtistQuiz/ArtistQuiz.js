import Timer from '@/components/Timer/Timer';
import '@/views/ArtistQuiz/style.scss';
import Card from '@/components/Card/Card';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

const ArtistQuizView = (gameRoot, questions, secondsCounter, onQuizFinished, timeToAnswer) => {
  let previousMarkup = { remove: () => {}, before: (markup) => gameRoot.append(markup) };
  const questionsQueue = [...questions].reverse();
  const guessedQuestionHrefs = [];

  const getMarkup = (question, onClose, onAnswer) => {
    let answerClicked = false;

    const artistQuizContainer = document.createElement('div');
    artistQuizContainer.classList.add('artist-quiz-container');

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
        masterpiceContainer.append(
          Card({
            caption: null,
            image: {
              url: question.href,
              shouldFade: false,
            },
            popup: null,
            href: null,
          }),
        );

        return masterpiceContainer;
      };

      const getButtonsPart = () => {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');
        question.variants.forEach((variant) => {
          buttonsContainer.append(
            Button(variant, 'auto', '60px', () => {
              answerClicked = true;
              onAnswer(artistQuizContainer, variant);
            }),
          );
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

    const boundOnClose = onClose.bind(null, artistQuizContainer);
    const boundOnTimeEnds = () => {
      if (!answerClicked) {
        onAnswer(artistQuizContainer);
      }
    };

    if (timeToAnswer) {
      artistQuizContainer.append(
        Timer(timeToAnswer, secondsCounter, boundOnClose, boundOnTimeEnds),
      );
    } else {
      artistQuizContainer.append(Timer('∞', null, boundOnClose, boundOnTimeEnds));
    }

    artistQuizContainer.append(getGamePart());
    return artistQuizContainer;
  };

  const displayNextQuestion = () => {
    const currentQuestion = questionsQueue.pop();

    if (currentQuestion) {
      const onAnswer = (root, gamerAnswer) => {
        if (gamerAnswer === currentQuestion.author) {
          guessedQuestionHrefs.push(currentQuestion.href);
        }
        const modal = Modal(
          [
            {
              title: 'Next',
              callback: () => {
                modal.remove();
                displayNextQuestion();
              },
            },
          ],
          {
            type: null,
            caption: null,
            image: {
              url: currentQuestion.href,
              shouldFade: false,
              highlightAnswerAs: gamerAnswer === currentQuestion.author,
            },
            popup: {
              isActive: true,
              desc: {
                truthSign: gamerAnswer === currentQuestion.author,
              },
            },
            href: null,
          },
          {
            middle: currentQuestion.name,
            tiny: `${currentQuestion.author}, ${currentQuestion.year}`,
          },
        );
        root.append(modal);
      };

      const closeGame = () => {
        window.history.back();
      };

      const onClose = (root, promptResult) => {
        const modal = Modal(
          [
            {
              title: 'Cancel',
              callback: () => {
                modal.remove();
                promptResult(false);
              },
            },
            {
              title: 'Yes',
              callback: () => {
                promptResult(true);
                closeGame();
              },
            },
          ],
          null,
          {
            middle: 'Do you really want to quit the game?',
          },
        );
        root.append(modal);
      };

      const markup = getMarkup(currentQuestion, onClose, onAnswer);
      previousMarkup.before(markup);
      previousMarkup.remove();
      previousMarkup = markup;
    } else {
      const modal = Modal(
        [
          {
            title: 'Home',
            callback: () => {
              modal.remove();
              window.location = '/#';
            },
          },
          {
            title: 'Categories',
            callback: () => {
              modal.remove();
              window.history.back();
            },
          },
        ],
        {
          type: 'cube',
          caption: null,
          image: null,
          popup: null,
          href: null,
        },
        {
          middle: 'Congratulations!',
          big: `${guessedQuestionHrefs.length}/${questions.length}`,
        },
      );
      gameRoot.append(modal);
      onQuizFinished(guessedQuestionHrefs);
    }
  };

  displayNextQuestion();
};

export default ArtistQuizView;
