'use strict';

const root = document.getElementsByTagName('html')[0];
const loader = document.querySelector('.loader');
const loaderTimeOut = 1500;
const popupTimeOut = 1000;

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  root.classList.add('no-scroll');
  setTimeout(() => {
    loader.classList.add('loader--hidden');
    root.classList.remove('no-scroll');
  }, loaderTimeOut);
});

const logo = document.querySelector('.header__logo');
const navbar = document.querySelector('.navigation');
const navbarList = document.querySelector('.navigation__list');

document.addEventListener('scroll', () => {
  const positionY = window.scrollY;
  if (positionY > 137) {
    navbar.classList.add('navigation__position--top');
    navbar.classList.add('navigation__animation--appearing');
    navbarList.classList.add('navigation__position--column');
    logo.classList.remove('hidden');
    logo.classList.add('header__animation');
  }
  if (positionY < 137) {
    navbar.classList.remove('navigation__position--top');
    navbar.classList.remove('navigation__animation--appearing');
    navbarList.classList.remove('navigation__position--column');
    logo.classList.add('hidden');
  }
});

const popup = document.querySelector('.popup');

const sendMail = async (mail) => {
  loader.classList.remove('loader--hidden');
  loader.style.backgroundColor = 'rgba(25, 23, 23, 0.8)';
  root.classList.add('no-scroll');
  try {
    const response = await fetch('http://localhost:3000/send', {
      method: 'POST',
      body: mail,
    });
    if (response.ok) {
      popup.classList.add('popup--open');
      loader.classList.add('loader--hidden');
      root.classList.remove('no-scroll');

      setTimeout(() => {
        popup.classList.remove('popup--open');
      }, popupTimeOut);
    }
  } catch (e) {
    console.error(e);
  }
};

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let mail = new FormData(form);
  sendMail(mail);
});
