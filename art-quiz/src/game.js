import Utils from '@/utils';

const getImageRefById = (id) => `/assets/img/${id}full.jpg`;

const getAnswerVariants = (arr, correctAnswer) => {
  const values = new Set([correctAnswer]);
  do {
    const rnd = Math.floor(Math.random() * arr.length);
    values.add(arr[rnd]);
  } while (values.size !== 4);
  return Utils.shuffleArray(Array.from(values));
};

const separateData = (rawImagesInfo) => {
  const authorsSet = new Set();
  const imageHrefs = [];

  const _ = rawImagesInfo.map((imgInfo) => {
    const imageHref = getImageRefById(imgInfo.imageNum);
    imageHrefs.push(imageHref);
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
    imageHrefs,
    authors,
  };
};

const getGameManager = async () => {
  const rawImagesInfo = await Utils.getImagesInfo();
  const {
    authors, imageHrefs, artistQuizImagesInfo, picturesQuizImagesInfo,
  } = separateData(rawImagesInfo);

  const getQuizQuestions = (game, categoryId) => {
    const imagesInfo = game === 'artist_quiz'
      ? artistQuizImagesInfo
      : picturesQuizImagesInfo;

    const amountOfQuestions = 10;
    const begin = categoryId * amountOfQuestions;
    const result = [];

    for (let i = begin; i < begin + amountOfQuestions; i += 1) {
      const imgInfo = imagesInfo[i];
      const variants = game === 'artist_quiz'
        ? getAnswerVariants(authors, imgInfo.author)
        : getAnswerVariants(imageHrefs, imgInfo.href);

      result.push({
        ...imgInfo, variants, game, categoryId,
      });
    }
    return result;
  };

  const scoreManager = {
    getScore: () => JSON.parse(localStorage.getItem('score')),
    saveScore: (game, category, guessedHrefs) => {
      const score = scoreManager.getScore() || {};
      if (!score[game]) {
        score[game] = {};
      }
      if (!score[game][category]) {
        score[game][category] = [];
      }
      score[game][category] = guessedHrefs;
      localStorage.setItem('score', JSON.stringify(score));
    },
  };

  const getCategories = (game) => {
    const result = [];
    const imgOffset = game === 'artist_quiz' ? 0 : 12;

    for (let categoryId = 0; categoryId < 12; categoryId += 1) {
      const score = scoreManager.getScore();
      const gameScore = score ? score[game] : null;
      const categoryScore = gameScore ? gameScore[categoryId] : null;

      const guessedPicturesAmount = categoryScore ? categoryScore.length : null;
      const alreadyPlayed = guessedPicturesAmount !== null;

      const playCategoryHref = `#/${game}/${categoryId}`;
      const scoreCategoryHref = `#/${game}/${categoryId}/score`;

      const caption = {
        name: `Category ${categoryId}`,
      };
      if (alreadyPlayed) {
        caption.value = `${guessedPicturesAmount}/10`;
      }

      const image = {
        url: `/assets/img/${categoryId + imgOffset}full.jpg`,
        shouldFade: !alreadyPlayed,
      };

      const popup = alreadyPlayed
        ? {
          href: playCategoryHref,
        }
        : false;

      const href = alreadyPlayed ? scoreCategoryHref : playCategoryHref;

      result.push({
        caption,
        image,
        popup,
        href,
      });
    }

    return result;
  };

  const getQuizScore = (questions) => {
    const score = scoreManager.getScore();
    const gameScore = score ? score[questions[0].game] : null;
    const categoryScore = gameScore ? gameScore[questions[0].categoryId] : null;

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

  return {
    getQuizQuestions,
    getCategories,
    getQuizScore,
    scoreManager,
  };
};

export default { getGameManager };
