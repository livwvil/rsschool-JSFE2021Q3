import '@/components/Header/style.scss';
import HeaderDefHTML from '@/components/Header/header_default.html';
import HeaderAltHTML from '@/components/Header/header_alternative.html';

const HeaderComponent = (alternative = false) => {
  const template = document.createElement('template');
  template.innerHTML = alternative ? HeaderAltHTML : HeaderDefHTML;

  return template.content;
};

export default HeaderComponent;
