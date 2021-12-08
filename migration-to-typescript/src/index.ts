import App from './components/app/app';
import './global.css';

const burgerBtn: HTMLElement | null = document.querySelector('.burger');
const navMenu: HTMLElement | null = document.querySelector('.sources');

const mobileMenuToggler = (e: MouseEvent) => {
    const burgerClasses = burgerBtn?.classList;
    burgerClasses?.toggle('active');

    const menuClasses = navMenu?.classList;
    menuClasses?.toggle('active');

    e.stopPropagation();
};

navMenu.addEventListener('click', mobileMenuToggler);
burgerBtn.addEventListener('click', mobileMenuToggler);

const app = new App();
app.start();
