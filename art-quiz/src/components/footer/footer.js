import '@/components/Footer/style.scss';
import FooterHTML from '@/components/Footer/footer.html';
import Utils from '@/utils';

const FooterComponent = () => {
  const fragment = Utils.createFragmentFromString(FooterHTML);

  return fragment;
};

export default FooterComponent;
