import Utils from '@/utils';

const getCategories = (game) => {
  const result = [];
  const imgOffset = game === 'artist_quiz' ? 0 : 12;

  for (let i = 0; i < 12; i += 1) {
    const categoryId = i;
    const guessed = Math.round(Math.random() * 2);
    const categoryName = `Category ${categoryId}`;
    const guessedText = `${guessed}/10`;

    const imageUrl = `/assets/img/${categoryId + imgOffset}full.jpg`;
    const notPlayedYet = guessed === 0; // TODO not like that

    const playCategoryHref = `#/${game}/${categoryId}`;
    const scoreCategoryHref = `#/${game}/${categoryId}/score`;

    const caption = {
      name: categoryName,
      value: guessedText,
    };

    const image = {
      url: imageUrl,
      shouldFade: !notPlayedYet,
    };

    const popup = notPlayedYet
      ? {
        href: playCategoryHref,
      }
      : false;

    const href = notPlayedYet ? scoreCategoryHref : playCategoryHref;

    result.push({
      caption,
      image,
      popup,
      href,
    });
  }

  return result;
};

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

const getCardsForStats = () => {
  const cards = [
    {
      caption: null,
      image: {
        url: '/assets/img/77full.jpg',
        shouldFade: false,
      },
      popup: {
        desc: {
          title: 'Girl with a Pearl Earring',
          text: 'Johannes Vermeer, 1665',
        },
      },
      href: null,
    },
    {
      caption: null,
      image: {
        url: '/assets/img/4full.jpg',
        shouldFade: true,
      },
      popup: {
        desc: {
          title: 'Girl with a Pearl Earring',
          text: 'Johannes Vermeer, 1665',
        },
      },
      href: null,
    },
  ];
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push(cards[Math.round(Math.random())]);
  }
  return result;
};

const getGameManager = async () => {
  const rawImagesInfo = await Utils.getImagesInfo();
  const {
    authors, imageHrefs, artistQuizImagesInfo, picturesQuizImagesInfo,
  } = separateData(rawImagesInfo);

  const getArtistQuizQuestions = (categoryId) => {
    const amountOfQuestions = 10;
    const begin = categoryId * amountOfQuestions;
    const result = [];
    for (let i = begin; i < begin + amountOfQuestions; i += 1) {
      const imgInfo = artistQuizImagesInfo[i];
      result.push({
        ...imgInfo,
        variants: getAnswerVariants(authors, imgInfo.author),
        guessed: Math.random() > 0.5,
      });
    }
    return result;
  };

  const getPicturesQuizQuestions = (categoryId) => {
    const amountOfQuestions = 10;
    const begin = categoryId * amountOfQuestions;
    const result = [];
    for (let i = begin; i < begin + amountOfQuestions; i += 1) {
      const imgInfo = picturesQuizImagesInfo[i];
      result.push({
        ...imgInfo,
        variants: getAnswerVariants(imageHrefs, imgInfo.href),
        guessed: Math.random() > 0.5,
      });
    }
    return result;
  };

  // console.log(getArtistQuizQuestions(11));

  return {
    getArtistQuizQuestions,
    getPicturesQuizQuestions,
  };
};

export default { getCategories, getGameManager };
