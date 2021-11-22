import '@/components/Modal/style.scss';
import Card from '@/components/Card/Card';
import Button from '../Button/Button';

const Modal = (buttons, imgInfo, caption) => {
  const getImagePart = () => {
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    if (imgInfo.type === 'stars') {
      imageContainer.classList.add('symbol');
      imageContainer.classList.add('stars');
    } else if (imgInfo.type === 'cube') {
      imageContainer.classList.add('symbol');
      imageContainer.classList.add('cube');
    } else {
      imageContainer.append(Card(imgInfo));
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

  const getButtonsPart = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    buttons.forEach((button) => {
      const btn = Button(button.title, 'auto', '60px');
      btn.classList.add('black');
      btn.addEventListener('click', button.callback);
      buttonsContainer.append(btn);
    });

    return buttonsContainer;
  };

  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modalContainer.classList.add('active');

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal-window');

  if (imgInfo) {
    if (imgInfo.type === 'stars') {
      modalWindow.classList.add('symbol');
      modalWindow.classList.add('stars');
    } else if (imgInfo.type === 'cube') {
      modalWindow.classList.add('symbol');
      modalWindow.classList.add('cube');
    }
    modalWindow.append(getImagePart());
  }
  if (caption) {
    modalWindow.append(
      getTextPart({
        tiny: caption.tiny, small: caption.small, middle: caption.middle, big: caption.big,
      }),
    );
  }
  modalWindow.append(getButtonsPart());

  modalContainer.append(modalWindow);
  return modalContainer;
};

export default Modal;
