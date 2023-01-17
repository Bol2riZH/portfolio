'use strict';
const loaderTimeOut = 900;
const popupTimeOut = 1000;
const spamTimeOut = 1500;
const urlBase = 'https://portfolio-server-phi-three.vercel.app';

const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');

const root = document.getElementsByTagName('html')[0];
const loader = document.querySelector('.loader');
const jobTitle = document.querySelector('.heading-primary');

const logo = document.querySelector('.header__logo');

const navbar = document.querySelector('.navigation');
const navbarList = document.querySelector('.navigation__list');
const navbarLink = document.querySelector('.navigation__link');

const links = document.querySelector('.links');

const openNav = () => {
  navbar.classList.add('active');
  closeBtn.classList.remove('hidden');
  navbarList.classList.add('navigation__position--column');
  navbar.classList.remove('navigation__position--top');
};
openBtn.onclick = openNav;

const closeNav = () => {
  navbar.classList.remove('active');
  closeBtn.classList.add('hidden');
};
closeBtn.onclick = closeNav;
navbarList.onclick = closeNav;

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  root.classList.add('no-scroll');
  setTimeout(() => {
    loader.classList.add('loader--hidden');
    root.classList.remove('no-scroll');
  }, loaderTimeOut);
  jobTitle.classList.add('appearing');
});

window.addEventListener('resize', () => {
  if (window.screen.width < 1300) {
    navbarList.classList.add('navigation__position--column');
  }
});

document.addEventListener('scroll', () => {
  const positionY = window.scrollY;
  if (positionY > 137) {
    logo.classList.remove('hidden');
    logo.classList.add('header__animation');

    if (window.screen.width > 1300) {
      navbar.classList.add('navigation__position--top');
      navbar.classList.add('navigation__animation--appearing');
      navbarList.classList.add('navigation__position--column');
    }
  }

  if (positionY < 137) {
    navbar.classList.remove('navigation__position--top');
    navbar.classList.remove('navigation__animation--appearing');
    navbarList.classList.remove('navigation__position--column');
    navbarLink.classList.add('hidden');
    logo.classList.add('hidden');
    links.classList.remove('hidden');
    if (window.screen.width < 1300) {
      navbarList.classList.add('navigation__position--column');
    }
  }
});

const sendMail = async (mail) => {
  loader.classList.remove('loader--hidden');
  loader.style.backgroundColor = 'rgba(25, 23, 23, 0.8)';
  root.classList.add('no-scroll');
  try {
    const response = await fetch(`${urlBase}/send`, {
      method: 'POST',
      body: mail,
    });
    console.log(response);

    if (response) {
      loader.classList.add('loader--hidden');
      root.classList.remove('no-scroll');
    }

    if (response.ok) {
      const popup = `
          <div class="popup">
            <p class="popup__paragraph">Message reçu !</p>
          </div>`;

      loader.insertAdjacentHTML('afterend', popup);
      setTimeout(() => {
        document.querySelector('.popup').remove();
      }, popupTimeOut);
      form.reset();
    }
    if (response.statusText === 'Too Many Requests') {
      const spam = `
          <div class="popup">
            <p class="popup__paragraph">Alerte au spam ! </br> Merci de patientez 30 sec...</p>
          </div>`;

      loader.insertAdjacentHTML('afterend', spam);
      setTimeout(() => {
        document.querySelector('.popup').remove();
      }, spamTimeOut);
    } else {
      const error = `
          <div class="popup">
            <p class="popup__paragraph">Erreur...</p>
          </div>`;

      loader.insertAdjacentHTML('afterend', error);
      setTimeout(() => {
        document.querySelector('.popup').remove();
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
