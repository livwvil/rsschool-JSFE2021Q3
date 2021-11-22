import Timer from '@/components/Timer/Timer';
import '@/views/ArtistQuiz/style.scss';
import Card from '@/components/Card/Card';
import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

const ArtistQuizView = (gameRoot, questions, secondsCounter, onQuizFinished) => {
  const getMarkup = (question, time, onClose, onAnswer) => {
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
          buttonsContainer.append(Button(variant, 'auto', '60px', () => {
            answerClicked = true;
            onAnswer(artistQuizContainer, variant);
          }));
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

    if (time) {
      artistQuizContainer.append(Timer(time, secondsCounter, boundOnClose, boundOnTimeEnds));
    } else {
      artistQuizContainer.append(Timer('∞', null, boundOnClose, boundOnTimeEnds));
    }

    artistQuizContainer.append(getGamePart());
    return artistQuizContainer;
  };

  let previousMarkup = { remove: () => {}, before: (markup) => gameRoot.append(markup) };
  const fake = [questions[0], questions[1]];
  const guessedHrefs = [];

  const displayNextQuestion = () => {
    const question = fake.pop();
    if (question) {
      const displayCorrectAnswer = (root, gamerAnswer) => {
        if (gamerAnswer === question.author) {
          guessedHrefs.push(question.href);
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
              url: question.href,
              shouldFade: false,
              highlightAnswerAs: gamerAnswer === question.author,
            },
            popup: {
              isActive: true,
              desc: {
                truthSign: gamerAnswer === question.author,
              },
            },
            href: null,
          },
          {
            middle: question.name,
            tiny: `${question.author}, ${question.year}`,
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
        question,
        5,
        onClose,
        displayCorrectAnswer,
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
            title: 'Next Quiz',
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
          big: `${10}/${10}`,
        },
      );
      gameRoot.append(modal);
      onQuizFinished(guessedHrefs);
    }
  };

  displayNextQuestion();
};

export default ArtistQuizView;
