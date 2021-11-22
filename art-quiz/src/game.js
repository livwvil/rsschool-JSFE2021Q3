import Utils from '@/utils';
import {
  QUIZ_CATEGORIES_AMOUNT,
  QUIZ_QUESTIONS_AMOUNT,
  ARTIST_QUIZ,
  DEFAULT_VOLUME,
  DEFAULT_TIME_TO_ANSWER_INF,
} from '@/constants';

const getImagePathById = (id) => `/assets/img/${id}full.jpg`;

const getAnswerVariants = (answersArray, correctAnswer) => {
  const values = new Set([correctAnswer]);
  do {
    const rnd = Math.floor(Math.random() * answersArray.length);
    values.add(answersArray[rnd]);
  } while (values.size !== 4);
  return Utils.shuffleArray(Array.from(values));
};

const separateData = (rawImagesInfo) => {
  const authorsSet = new Set();

  const _ = rawImagesInfo.map((imgInfo) => {
    const imageHref = getImagePathById(imgInfo.imageNum);
    authorsSet.add(imgInfo.author);
    return {
      author: imgInfo.author,
      name: imgInfo.name,
      href: imageHref,
      year: imgInfo.year,
    };
  });
  const authors = Array.from(authorsSet);

  const artistQuizImagesInfo = _;
  const picturesQuizImagesInfo = artistQuizImagesInfo.splice(_.length / 2);

  return {
    artistQuizImagesInfo,
    picturesQuizImagesInfo,
    authors,
  };
};

const getGameManager = async () => {
  const rawImagesInfo = await Utils.getImagesInfo();
  const { authors, artistQuizImagesInfo, picturesQuizImagesInfo } = separateData(rawImagesInfo);

  const getQuizQuestions = (game, categoryId) => {
    const imagesInfo = game === ARTIST_QUIZ ? artistQuizImagesInfo : picturesQuizImagesInfo;

    const begin = categoryId * QUIZ_QUESTIONS_AMOUNT;
    const result = [];

    for (let i = begin; i < begin + QUIZ_QUESTIONS_AMOUNT; i += 1) {
      const imgInfo = imagesInfo[i];
      const variants = game === ARTIST_QUIZ
        ? getAnswerVariants(authors, imgInfo.author)
        : getAnswerVariants(
          [...artistQuizImagesInfo, ...picturesQuizImagesInfo]
            .filter((item) => item.author !== imgInfo.author)
            .map((item) => item.href),
          imgInfo.href,
        );

      result.push({
        ...imgInfo,
        variants,
        game,
        categoryId,
      });
    }
    return result;
  };

  const scoreManager = {
    getScore: () => JSON.parse(localStorage.getItem('score')),
    getCategoryScore: (game, categoryId) => {
      const score = scoreManager.getScore();
      const gameScore = score ? score[game] : null;
      const categoryScore = gameScore ? gameScore[categoryId] : null;
      return categoryScore;
    },
    saveScore: (game, category, guessedHrefs) => {
      const score = scoreManager.getScore() || {};
      if (!score[game]) {
        score[game] = {};
      }
      score[game][category] = guessedHrefs;
      localStorage.setItem('score', JSON.stringify(score));
    },
  };

  const getCategories = (game) => {
    const result = [];
    const imgOffset = game === ARTIST_QUIZ ? 0 : QUIZ_CATEGORIES_AMOUNT;

    for (let categoryId = 0; categoryId < QUIZ_CATEGORIES_AMOUNT; categoryId += 1) {
      const categoryScore = scoreManager.getCategoryScore(game, categoryId);

      const guessedPicturesAmount = categoryScore ? categoryScore.length : null;
      const alreadyPlayed = guessedPicturesAmount !== null;

      const playCategoryHref = `#/${game}/${categoryId}`;
      const scoreCategoryHref = `#/${game}/${categoryId}/score`;

      result.push({
        caption: {
          name: `Category ${categoryId}`,
          ...(alreadyPlayed ? { value: `${guessedPicturesAmount}/${QUIZ_QUESTIONS_AMOUNT}` } : {}),
        },
        image: {
          url: getImagePathById(categoryId + imgOffset),
          shouldFade: !alreadyPlayed,
        },
        popup: alreadyPlayed ? { href: playCategoryHref } : false,
        href: alreadyPlayed ? scoreCategoryHref : playCategoryHref,
      });
    }

    return result;
  };

  const getQuizScore = (questions) => {
    const categoryScore = scoreManager.getCategoryScore(questions[0].game, questions[0].categoryId);

    return questions.map((question) => ({
      caption: null,
      image: {
        url: question.href,
        shouldFade: categoryScore == null || !categoryScore.includes(question.href),
      },
      popup: {
        desc: {
          title: question.name,
          text: `${question.author}, ${question.year}`,
        },
      },
      href: null,
    }));
  };

  const settingsManager = {
    setVolume: (volumePercentage) => {
      const player = document.querySelector('#player');
      const maximumPercentage = 100;
      player.volume = volumePercentage / maximumPercentage;
      localStorage.setItem('volume', volumePercentage);
    },
    getVolume: () => {
      const volume = parseFloat(localStorage.getItem('volume'));
      return Number.isNaN(volume) ? DEFAULT_VOLUME : volume;
    },
    playSound: (soundHref) => {
      setTimeout(() => {
        const player = document.querySelector('#player');
        player.src = soundHref;
        player.play();
      }, 30);
    },
    setGameTime: (gameTime) => {
      localStorage.setItem('game_time', gameTime);
    },
    getGameTime: () => {
      const gameTime = parseFloat(localStorage.getItem('game_time'));
      return Number.isNaN(gameTime) ? DEFAULT_TIME_TO_ANSWER_INF : gameTime;
    },
  };

  return {
    getQuizQuestions,
    getCategories,
    getQuizScore,
    scoreManager,
    settingsManager,
  };
};

export default { getGameManager };
