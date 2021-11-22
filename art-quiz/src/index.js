import '@/styles/style.scss';

import FooterComponent from '@/components/Footer/Footer';
import HeaderComponent from '@/components/Header/Header';

import SettingsView from '@/views/Settings/Settings';
import MeshView from '@/views/Mesh/Mesh';
import WelcomeView from '@/views/Welcome/Welcome';
import ArtistQuizView from '@/views/ArtistQuiz/ArtistQuiz';
import PictureQuizView from '@/views/PictureQuiz/PictureQuiz';

import Utils from '@/utils';
import Game from '@/game';

const Routes = {
  Welcome: '#/',
  Settings: '#/settings',

  ArtistQuizCategories: '#/artist_quiz',
  PictureQuizCategories: '#/picture_quiz',

  ArtistQuizGame: '#/artist_quiz/:id',
  PictureQuizGame: '#/picture_quiz/:id',

  ArtistQuizScore: '#/artist_quiz/:id/score',
  PictureQuizScore: '#/picture_quiz/:id/score',
};

const gameManagerPromise = Game.getGameManager();
const secondsCounter = Utils.getSecondsCounter();

const router = async () => {
  const gameManager = await gameManagerPromise;
  secondsCounter.clear();

  const route = Utils.getRoute();
  const { resource: game, id: categoryId } = Utils.parseRequestURL();

  const appContainer = document.querySelector('.app-container');
  appContainer.classList.remove('welcome');
  appContainer.classList.remove('reduced');
  appContainer.innerHTML = '';

  const defaultNavbar = {
    nav: [
      {
        title: 'Home',
        href: Routes.Welcome,
        active: route === Routes.Welcome,
      },
      {
        title: 'Artist quiz',
        href: Routes.ArtistQuizCategories,
        active: route === Routes.ArtistQuizCategories,
      },
      {
        title: 'Picture quiz',
        href: Routes.PictureQuizCategories,
        active: route === Routes.PictureQuizCategories,
      },
    ],
    settingsHref: Routes.Settings,
  };

  const settingsNavbar = {
    nav: {
      title: 'Settings',
    },
  };

  const welcomeNavbar = {
    settingsHref: Routes.Settings,
  };

  const quizQuestions = gameManager.getQuizQuestions(game, categoryId);

  const onQuizFinished = (guessedHrefs) => {
    gameManager.scoreManager.saveScore(game, categoryId, guessedHrefs);
  };

  switch (route) {
    case Routes.Welcome: {
      appContainer.classList.add('welcome');
      appContainer.append(HeaderComponent(welcomeNavbar));
      appContainer.append(
        WelcomeView({
          artistQuiz: Routes.ArtistQuizCategories,
          pictureQuiz: Routes.PictureQuizCategories,
        }),
      );
      break;
    }
    case Routes.Settings: {
      appContainer.append(HeaderComponent(settingsNavbar));
      appContainer.append(SettingsView());
      break;
    }
    case Routes.ArtistQuizCategories: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(gameManager.getCategories(game)));
      break;
    }
    case Routes.PictureQuizCategories: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(gameManager.getCategories(game)));
      break;
    }
    case Routes.ArtistQuizGame: {
      appContainer.classList.add('reduced');
      ArtistQuizView(appContainer, quizQuestions, secondsCounter, onQuizFinished);
      break;
    }
    case Routes.PictureQuizGame: {
      appContainer.classList.add('reduced');
      PictureQuizView(appContainer, quizQuestions, secondsCounter, onQuizFinished);
      break;
    }
    case Routes.ArtistQuizScore: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(gameManager.getQuizScore(quizQuestions), true));
      break;
    }
    case Routes.PictureQuizScore: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(gameManager.getQuizScore(quizQuestions), true));
      break;
    }
    default: {
      window.location = Routes.Welcome;
      break;
    }
  }
  appContainer.append(FooterComponent());
};

const container = document.createElement('div');
container.classList.add('app-container');

const root = document.querySelector('#root');
root.append(container);

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
