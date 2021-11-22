const createFragmentFromString = (str) => {
  const template = document.createElement('template');
  template.innerHTML = str;
  return template.content;
};

const parseRequestURL = () => {
  // eslint-disable-next-line no-restricted-globals
  const url = location.hash.slice(1).toLowerCase() || '/';

  const r = url.split('/');

  return {
    resource: r[1] || null,
    id: r[2] || null,
    verb: r[3] || null,
  };
};

const getRoute = () => {
  const request = parseRequestURL();

  return (
    (request.resource ? `#/${request.resource}` : '#/')
    + (request.id ? '/:id' : '')
    + (request.verb ? `/${request.verb}` : '')
  );
};

const shuffleArray = (array) => {
  const result = Array.from(array);

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
};

const imagesInfoGetter = () => {
  let imagesInfoCache = null;
  return async () => {
    if (!imagesInfoCache) {
      const resp = await fetch('/assets/json/images.json');
      const json = await resp.json();
      imagesInfoCache = json;
    }
    return imagesInfoCache;
  };
};

const getSecondsCounter = () => {
  const observers = [];
  const loop = (previousUnixTime = 0) => {
    const currentTime = new Date().getTime();
    observers.forEach((observer) => {
      observer(currentTime - previousUnixTime);
    });
    setTimeout(loop.bind(null, currentTime), 1000);
  };
  loop();
  return {
    addObserver: (observer) => observers.push(observer),
    removeObserver: (observer) => observers.splice(observers.indexOf(observer), 1),
    clear: () => {
      observers.length = 0;
    },
  };
};

const getImagesInfo = imagesInfoGetter();

export default {
  createFragmentFromString,
  parseRequestURL,
  getRoute,
  getImagesInfo,
  shuffleArray,
  getSecondsCounter,
};
