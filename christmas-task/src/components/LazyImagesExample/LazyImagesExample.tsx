import styles from './LazyImagesExample.scss';

import { LazyImage } from '@/components/LazyImage';

export const LazyImagesExample = (): JSX.Element => (
  <div className={styles['images-wrapper']}>
    <LazyImage
      alt="First"
      src="https://images.theconversation.com/files/350851/original/file-20200803-22-dfm95n.jpg"
      width="800px"
      height="600px"
    />

    <LazyImage
      alt="First"
      src="https://lp-cms-production.imgix.net/features/2019/06/panda-d55d15231c4f.jpg"
      width="800px"
      height="600px"
    />

    <LazyImage
      alt="First"
      src="https://media.nature.com/lw800/magazine-assets/d41586-019-00301-y/d41586-019-00301-y_16427380.jpg"
      width="800px"
      height="600px"
    />
  </div>
);
