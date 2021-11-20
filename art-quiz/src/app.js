import '@/styles/style.scss';
import WelcomeView from '@/views/Welcome/Welcome';
import SettingsView from '@/views/Settings/Settings';
import MeshView from '@/views/Mesh/Mesh';

import FooterComponent from '@/components/Footer/Footer';
import HeaderComponent from '@/components/Header/Header';
import ArtistQuiz from './views/ArtistQuiz/ArtistQuiz';
import PictureQuiz from './views/PictureQuiz/PictureQuiz';
import Modal from './components/Modal/Modal';

const views = [
  WelcomeView(),
  SettingsView(),
  MeshView(),
  ArtistQuiz(),
  PictureQuiz(),
];

const App = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const view = 2;
  if (view === 0) {
    container.classList.add('welcome');
  }

  if (view !== 3 && view !== 4) {
    container.append(HeaderComponent(view === 1 || view === 2));
  } else {
    container.classList.add('reduced');
  }
  container.append(views[view]);
  container.append(FooterComponent());
  container.append(Modal());

  return container;
};

export default App;
