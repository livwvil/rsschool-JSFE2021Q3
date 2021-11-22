import '@/components/Button/style.scss';

const Button = (text, width, height, onClick, highlightAs) => {
  const w = width || 'auto';
  const h = height || 'auto';

  const button = document.createElement('button');
  button.style.width = w;
  button.style.height = h;
  button.classList.add('button');
  button.innerText = text;
  if (onClick && typeof onClick === 'function') {
    button.addEventListener('click', () => {
      if (highlightAs !== undefined) {
        button.classList.add(highlightAs ? 'right' : 'not-right');
      }
      onClick();
    });
  }
  return button;
};

export default Button;
