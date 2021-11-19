import '@/components/footer/style.scss';
import FooterHTML from '@/components/footer/footer.html';

const FooterComponent = () => {
  const template = document.createElement('template');
  template.innerHTML = FooterHTML;

  return template.content;
};

export default FooterComponent;
