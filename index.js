'use strict';

const logo = document.querySelector('.header__logo');
const navbar = document.querySelector('.navigation');
const navbarList = document.querySelector('.navigation__list');

document.addEventListener('scroll', () => {
  const positionY = window.scrollY;
  if (positionY > 137) {
    navbar.classList.add('navigation__position--top');
    navbarList.classList.add('navigation__position--column');
    logo.classList.remove('hidden');
    logo.classList.add('header__animation');
    navbar.classList.add('navigation__animation');
  }
  if (positionY < 137) {
    navbar.classList.remove('navigation__position--top');
    navbarList.classList.remove('navigation__position--column');
    logo.classList.add('hidden');
    navbar.classList.remove('navigation__animation');
  }
});
