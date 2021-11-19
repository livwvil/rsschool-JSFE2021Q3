import '@/components/header/style.scss';
import HeaderDefHTML from '@/components/header/header_default.html';
import HeaderAltHTML from '@/components/header/header_alternative.html';

const HeaderComponent = (alternative = false) => {
  const template = document.createElement('template');
  template.innerHTML = alternative ? HeaderAltHTML : HeaderDefHTML;

  return template.content;
};

export default HeaderComponent;
