'use strict';

const logo = document.querySelector('.header__logo');
const navbar = document.querySelector('.navigation');
const navbarList = document.querySelector('.navigation__list');

document.addEventListener('scroll', () => {
  const positionY = window.scrollY;
  if (positionY > 137) {
    navbar.classList.add('navigation__position-top');
    navbarList.classList.add('navigation__column');
    logo.classList.remove('hidden');
  }
  if (positionY < 137) {
    navbar.classList.remove('navigation__position-top');
    navbarList.classList.remove('navigation__column');
    logo.classList.add('hidden');
  }
});
