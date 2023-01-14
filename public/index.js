'use strict';

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

const sendMail = async (mail) => {
  try {
    const response = await fetch('http://localhost:3000/send', {
      method: 'POST',
      body: mail,
    });
    console.log(response);
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
