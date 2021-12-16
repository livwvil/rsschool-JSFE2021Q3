import React, { FC , useState } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

// import styles from './ToysManager.scss';

export const ToysManager: FC = () => {
  const [q, setQ] = useState('');
  const some = (s: string) => {
    setQ(s);
  };

  return (
    <React.Fragment>
      <Header onSearch={some} favToysNumber={0}/>
      ToysManager
      {q}
      <Footer/>
    </React.Fragment>
  );
};
