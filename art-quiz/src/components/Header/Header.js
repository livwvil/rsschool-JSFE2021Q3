import '@/components/Header/style.scss';

const HeaderComponent = (props) => {
  const getNavPart = (navig, isAlternative) => {
    const nav = document.createElement('nav');
    nav.classList.add('app-nav');

    if (isAlternative) {
      const button = document.createElement('button');
      button.innerText = navig.title;
      button.classList.add('back');
      button.addEventListener('click', () => {
        window.history.back();
      });
      nav.append(button);
    } else {
      const a = document.createElement('a');
      a.classList.add('app-logo');
      a.href = '#';

      const img = document.createElement('img');
      img.src = './assets/svg/app-logo.svg';
      img.alt = '';

      a.append(img);

      const ul = document.createElement('ul');
      ul.classList.add('nav-list');

      navig.forEach((navPage) => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerText = navPage.title;
        if (navPage.active) {
          li.classList.add('active');
        }
        li.addEventListener('click', () => {
          window.location = navPage.href;
        });
        ul.append(li);
      });

      nav.append(a);
      nav.append(ul);
    }
    return nav;
  };

  const getButtonPart = (settingsHref, isAlternative) => {
    const button = document.createElement('button');
    button.classList.add('app-settings');
    if (isAlternative) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      if (isAlternative) {
        window.history.back();
      } else {
        window.location = settingsHref;
      }
    });
    return button;
  };

  const header = document.createElement('header');

  const isAlternativeHeader = props.nav && !Array.isArray(props.nav);

  if (props.nav) {
    header.append(getNavPart(props.nav, isAlternativeHeader));
  }
  header.append(getButtonPart(props.settingsHref, isAlternativeHeader));

  return header;
};

export default HeaderComponent;
