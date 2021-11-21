import '@/components/Modal/style.scss';
import Card from '@/components/Card/Card';
import Button from '../Button/Button';

const card = {
  caption: null,
  image: {
    url: '/assets/img/77.jpg',
    shouldFade: false,
    highlightAnswerAs: true,
  },
  popup: {
    isActive: true,
    desc: {
      truthSign: false,
    },
  },
  href: null,
};

const Modal = (type = 'cube') => {
  const getImagePart = () => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    if (type === 'stars') {
      imageContainer.classList.add('symbol');
      imageContainer.classList.add('stars');
    } else if (type === 'cube') {
      imageContainer.classList.add('symbol');
      imageContainer.classList.add('cube');
    } else {
      imageContainer.append(Card(card));
    }

    return imageContainer;
  };

  const getTextPart = (text) => {
    const textContainer = document.createElement('div');
    textContainer.classList.add('text');

    if (text && text.big) {
      const bigTextElem = document.createElement('span');
      bigTextElem.classList.add('big');
      bigTextElem.innerText = text.big;
      textContainer.append(bigTextElem);
    }

    if (text && text.middle) {
      const middleTextElem = document.createElement('span');
      middleTextElem.classList.add('middle');
      middleTextElem.innerText = text.middle;
      textContainer.append(middleTextElem);
    }

    if (text && text.small) {
      const smallTextElem = document.createElement('span');
      smallTextElem.classList.add('small');
      smallTextElem.innerText = text.small;
      textContainer.append(smallTextElem);
    }

    if (text && text.tiny) {
      const tinyTextElem = document.createElement('span');
      tinyTextElem.classList.add('tiny');
      tinyTextElem.innerText = text.tiny;
      textContainer.append(tinyTextElem);
    }

    return textContainer;
  };

  const getButtonsPart = (buttons) => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    buttons.forEach((button) => {
      const btn = Button(button.title, 'auto', '60px');
      btn.classList.add('black');
      buttonsContainer.append(btn);
    });

    return buttonsContainer;
  };

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  // modalContainer.classList.add('active');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');
  if (type === 'stars') {
    modalWindow.classList.add('symbol');
    modalWindow.classList.add('stars');
  } else if (type === 'cube') {
    modalWindow.classList.add('symbol');
    modalWindow.classList.add('cube');
  }

  modalWindow.append(getImagePart());
  modalWindow.append(getTextPart({ big: 'Grand result', middle: 'Congratulations!' }));
  modalWindow.append(getButtonsPart([{ title: 'Next' }]));

  modalContainer.append(modalWindow);
  return modalContainer;
};

export default Modal;
