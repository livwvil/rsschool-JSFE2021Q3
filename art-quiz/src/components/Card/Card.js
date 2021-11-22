import '@/components/Card/style.scss';

const RetryButton = (text, href) => {
  const inner = document.createElement('div');
  inner.classList.add('inner');
  inner.innerText = text;

  const button = document.createElement('button');
  button.classList.add('retry-button');

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    window.location = href;
  });

  button.append(inner);
  return button;
};

const Desc = (desc) => {
  const container = document.createElement('div');
  container.classList.add('description');

  if (desc && desc.title) {
    const titleElem = document.createElement('span');
    titleElem.classList.add('title');
    titleElem.innerText = desc.title;
    container.append(titleElem);
  }

  if (desc && desc.text) {
    const textElem = document.createElement('span');
    textElem.classList.add('text');
    textElem.innerText = desc.text;
    container.append(textElem);
  }

  return container;
};

const getCaptionPart = (caption) => {
  const captionContainer = document.createElement('div');
  captionContainer.classList.add('caption');

  if (caption && caption.name) {
    const nameTextElem = document.createElement('span');
    nameTextElem.classList.add('name');
    nameTextElem.innerText = caption.name;
    captionContainer.append(nameTextElem);
  }

  if (caption && caption.value) {
    const valueTextElem = document.createElement('span');
    valueTextElem.classList.add('value');
    valueTextElem.innerText = caption.value;
    captionContainer.append(valueTextElem);
  }

  return captionContainer;
};

const getContentPart = (image, popup, href) => {
  const getImagePart = () => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image');
    imageContainer.style.backgroundImage = `url(${image.url})`;
    if (image.shouldFade) {
      imageContainer.classList.add('fade');
    }

    if ('highlightAnswerAs' in image) {
      imageContainer.addEventListener('click', () => {
        imageContainer.innerHTML = '';
        const filter = document.createElement('div');
        filter.classList.add('filter');
        filter.classList.add(image.highlightAnswerAs ? 'right' : 'not-right');
        imageContainer.append(filter);
      });
    }

    return imageContainer;
  };

  const getPopupPart = (root) => {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup');
    const toggleActive = () => popupContainer.classList.toggle('active');

    if (popup.desc) {
      if (popup.isActive) {
        popupContainer.classList.add('active');
      }
      if ('truthSign' in popup.desc) {
        popupContainer.classList.add('guess-result');
        popupContainer.classList.add(popup.desc.truthSign ? 'right' : 'not-right');
      } else {
        root.addEventListener('click', toggleActive);
        popupContainer.append(Desc(popup.desc));
      }
    } else {
      popupContainer.classList.add('retry-btn');
      popupContainer.append(RetryButton('Play again', popup.href));
      root.addEventListener('mouseenter', toggleActive);
      root.addEventListener('mouseleave', toggleActive);
    }

    return popupContainer;
  };

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content');

  contentContainer.append(getImagePart());

  if (popup) {
    contentContainer.append(getPopupPart(contentContainer));
  }

  if (href) {
    contentContainer.addEventListener('click', () => {
      window.location = href;
    });
  }

  return contentContainer;
};

const Card = ({
  caption, image, popup, href,
}) => {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card');

  if (caption) {
    cardContainer.append(getCaptionPart(caption));
  }

  cardContainer.append(getContentPart(image, popup, href));

  return cardContainer;
};

export default Card;
