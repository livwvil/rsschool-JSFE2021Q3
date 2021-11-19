import '@/components/card/style.scss';
import CardHTML from '@/components/card/card.html';
import createFragmentFromString from '../utils';

const RetryButton = (text) => {
  const inner = document.createElement('div');
  inner.classList.add('inner');
  inner.innerText = text;

  const button = document.createElement('button');
  button.classList.add('retry-button');
  button.append(inner);
  return button;
};

const Desc = (title, text) => {
  const titleElem = document.createElement('span');
  titleElem.classList.add('title');
  titleElem.innerText = title;

  const textElem = document.createElement('span');
  textElem.classList.add('text');
  textElem.innerText = text;

  const container = document.createElement('div');
  container.classList.add('description');
  container.append(titleElem);
  container.append(textElem);

  return container;
};

const Card = (caption, isPopupButton, shouldActivatePopup, shouldFadeContent, imageUrl) => {
  const fragment = createFragmentFromString(CardHTML);

  const nameElem = fragment.querySelector('.name');
  const valueElem = fragment.querySelector('.value');
  if (caption) {
    nameElem.innerText = caption.name;
    valueElem.innerText = caption.value;
  }

  const image = fragment.querySelector('.image');
  image.style.backgroundImage = `url(${imageUrl})`;
  if (shouldFadeContent) {
    image.classList.add('fade');
  }

  const popupElem = fragment.querySelector('.popup');
  if (isPopupButton) {
    popupElem.classList.add('retry-btn');
    popupElem.append(RetryButton('Play again'));
  } else {
    popupElem.append(Desc('Girl with a Pearl Earring', 'Johannes Vermeer, 1665'));
  }

  if (shouldActivatePopup) {
    popupElem.classList.add('active');
  }

  return fragment;
};

export default Card;
