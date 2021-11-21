import '@/styles/style.scss';

import FooterComponent from '@/components/Footer/Footer';
import HeaderComponent from '@/components/Header/Header';

import SettingsView from '@/views/Settings/Settings';
import MeshView from '@/views/Mesh/Mesh';
import WelcomeView from '@/views/Welcome/Welcome';
import ArtistQuizView from '@/views/ArtistQuiz/ArtistQuiz';
import PictureQuizView from '@/views/PictureQuiz/PictureQuiz';

import Utils from '@/utils';

const Routes = {
  Welcome: '#/',
  Settings: '#/settings',

  ArtistQuiz: '#/artist_quiz',
  PictureQuiz: '#/picture_quiz',

  ArtistQuizGame: '#/artist_quiz/:id',
  PictureQuizGame: '#/picture_quiz/:id',

  ArtistQuizScore: '#/artist_quiz/:id/score',
  PictureQuizScore: '#/picture_quiz/:id/score',
};

const getCardsForStats = () => {
  const cards = [
    {
      caption: null,
      image: {
        url: '/assets/img/77.jpg',
        shouldFade: false,
      },
      popup: {
        desc: {
          title: 'Girl with a Pearl Earring',
          text: 'Johannes Vermeer, 1665',
        },
      },
      href: null,
    },
    {
      caption: null,
      image: {
        url: '/assets/img/4.jpg',
        shouldFade: true,
      },
      popup: {
        desc: {
          title: 'Girl with a Pearl Earring',
          text: 'Johannes Vermeer, 1665',
        },
      },
      href: null,
    },
  ];
  const result = [];
  for (let i = 0; i < 10; i += 1) {
    result.push(cards[Math.round(Math.random())]);
  }
  return result;
};

const getCardsForArtistQuiz = () => {
  const cards = [
    {
      caption: {
        name: 'Portrait',
        value: '2/10',
      },
      image: {
        url: '/assets/img/77.jpg',
        shouldFade: false,
      },
      popup: {
        href: '/#/artist_quiz/1',
      },
      href: '#/artist_quiz/1/score',
    },
    {
      caption: {
        name: 'Landscape',
        value: '0/10',
      },
      image: {
        url: '/assets/img/4.jpg',
        shouldFade: true,
      },
      popup: false,
      href: '#/artist_quiz/2',
    },
  ];
  const result = [];
  for (let i = 0; i < 12; i += 1) {
    result.push(cards[Math.round(Math.random())]);
  }
  return result;
};

const getCardsForPictureQuiz = () => {
  const cards = [
    {
      caption: {
        name: 'Portrait',
        value: '2/10',
      },
      image: {
        url: '/assets/img/77.jpg',
        shouldFade: false,
      },
      popup: {
        href: '/#/picture_quiz/1',
      },
      href: '#/picture_quiz/1/score',
    },
    {
      caption: {
        name: 'Landscape',
        value: '0/10',
      },
      image: {
        url: '/assets/img/4.jpg',
        shouldFade: true,
      },
      popup: false,
      href: '#/picture_quiz/2',
    },
  ];
  const result = [];
  for (let i = 0; i < 12; i += 1) {
    result.push(cards[Math.round(Math.random())]);
  }
  return result;
};

const router = () => {
  const route = Utils.getRoute();
  const { resource: game, id: categoryId } = Utils.parseRequestURL();

  console.log(route);
  console.log(game);
  console.log(categoryId);

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
        href: Routes.ArtistQuiz,
        active: route === Routes.ArtistQuiz,
      },
      {
        title: 'Picture quiz',
        href: Routes.PictureQuiz,
        active: route === Routes.PictureQuiz,
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

  switch (route) {
    case Routes.Welcome: {
      appContainer.classList.add('welcome');
      appContainer.append(HeaderComponent(welcomeNavbar));
      appContainer.append(WelcomeView({
        artistQuiz: Routes.ArtistQuiz,
        pictureQuiz: Routes.PictureQuiz,
      }));
      break;
    }
    case Routes.Settings: {
      appContainer.append(HeaderComponent(settingsNavbar));
      appContainer.append(SettingsView());
      break;
    }
    case Routes.ArtistQuiz: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(getCardsForArtistQuiz()));
      break;
    }
    case Routes.PictureQuiz: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(getCardsForPictureQuiz()));
      break;
    }
    case Routes.ArtistQuizGame: {
      appContainer.classList.add('reduced');
      appContainer.append(ArtistQuizView());
      break;
    }
    case Routes.PictureQuizGame: {
      appContainer.classList.add('reduced');
      appContainer.append(PictureQuizView());
      break;
    }
    case Routes.ArtistQuizScore: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(getCardsForStats()));
      break;
    }
    case Routes.PictureQuizScore: {
      appContainer.append(HeaderComponent(defaultNavbar));
      appContainer.append(MeshView(getCardsForStats()));
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
