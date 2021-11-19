import '@/styles/style.scss';
import WelcomeView from '@/views/welcome/welcome';
import SettingsView from '@/views/settings/settings';
import MeshView from '@/views/mesh/mesh';

import FooterComponent from '@/components/footer/footer';
import HeaderComponent from '@/components/header/header';
import ArtistQuiz from './views/ArtistQuiz/ArtistQuiz';

const views = [
  WelcomeView(),
  SettingsView(),
  MeshView(),
  ArtistQuiz(),
];

const App = () => {
  const container = document.createElement('div');
  container.classList.add('container');

  const view = 3;
  if (view === 0) {
    container.classList.add('welcome');
  }

  if (view !== 3) {
    container.append(HeaderComponent(view === 1 || view === 2));
  } else {
    container.classList.add('reduced');
  }
  container.append(views[view]);
  container.append(FooterComponent());

  return container;
};

export default App;
