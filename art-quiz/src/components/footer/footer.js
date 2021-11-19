import '@/components/Footer/style.scss';
import FooterHTML from '@/components/Footer/footer.html';

const FooterComponent = () => {
  const template = document.createElement('template');
  template.innerHTML = FooterHTML;

  return template.content;
};

export default FooterComponent;
