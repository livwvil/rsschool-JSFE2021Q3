import '@/components/Button/style.scss';

const Button = (text, width, height) => {
  const w = width || 'auto';
  const h = height || 'auto';

  const button = document.createElement('button');
  button.style.width = w;
  button.style.height = h;
  button.classList.add('button');
  button.innerText = text;
  return button;
};

export default Button;
