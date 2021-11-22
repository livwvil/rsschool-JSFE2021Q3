import '@/components/Footer/style.scss';
import FooterHTML from '@/components/Footer/footer.html';
import Utils from '@/utils';

const FooterComponent = (settingsManager) => {
  const fragment = Utils.createFragmentFromString(FooterHTML);
  setTimeout(() => {
    settingsManager.setVolume(settingsManager.getVolume());
  }, 0);

  return fragment;
};

export default FooterComponent;
