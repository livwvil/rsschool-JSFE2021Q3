import Timer from '@/components/Timer/Timer';
import '@/views/PictureQuiz/style.scss';
import Card from '@/components/Card/Card';
import Modal from '@/components/Modal/Modal';

const PictureQuizView = (gameRoot, questions, secondsCounter, onQuizFinished, timeToAnswer) => {
  let previousMarkup = { remove: () => {}, before: (markup) => gameRoot.append(markup) };
  const questionsQueue = [...questions].reverse();
  const guessedQuestionHrefs = [];

  const getMarkup = (question, onClose, onAnswer) => {
    let answerClicked = false;

    const pictureQuizContainer = document.createElement('div');
    pictureQuizContainer.classList.add('picture-quiz-container');

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
          const masterpice = Card({
            caption: null,
            image: {
              url: variant,
              shouldFade: false,
            },
            popup: null,
            href: null,
          });
          masterpice.addEventListener('click', () => {
            answerClicked = true;
            onAnswer(pictureQuizContainer, variant);
          });
          masterpiceContainer.append(masterpice);
        });

        return masterpiceContainer;
      };

      const gameContainer = document.createElement('div');
      gameContainer.classList.add('game');

      gameContainer.append(getQuestionPart('Which is Edvard Munch picture?'));
      gameContainer.append(getMasterpicePart());

      return gameContainer;
    };

    const boundOnClose = onClose.bind(null, pictureQuizContainer);
    const boundOnTimeEnds = () => {
      if (!answerClicked) {
        onAnswer(pictureQuizContainer);
      }
    };

    if (timeToAnswer) {
      pictureQuizContainer.append(
        Timer(timeToAnswer, secondsCounter, boundOnClose, boundOnTimeEnds),
      );
    } else {
      pictureQuizContainer.append(Timer('∞', null, boundOnClose, boundOnTimeEnds));
    }

    pictureQuizContainer.append(getGamePart());

    return pictureQuizContainer;
  };

  const displayNextQuestion = () => {
    const currentQuestion = questionsQueue.pop();

    if (currentQuestion) {
      const onAnswer = (root, gamerAnswer) => {
        if (gamerAnswer === currentQuestion.href) {
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
              highlightAnswerAs: gamerAnswer === currentQuestion.href,
            },
            popup: {
              isActive: true,
              desc: {
                truthSign: gamerAnswer === currentQuestion.href,
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

      const markup = getMarkup(
        currentQuestion,
        onClose,
        onAnswer,
      );
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

export default PictureQuizView;
