'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const timeOut = 900;
const scrollLimit = 137;
const screenWidthLimit = 1300;
const urlBase = 'https://portfolio-server-phi-three.vercel.app';
const messageSend = `
          <div class="popup">
            <p class="popup__paragraph">Message reçu !</p>
          </div>`;
const spam = `
          <div class="popup">
            <p class="popup__paragraph">Alerte au spam ! </br> Merci de patientez 30 sec...</p>
          </div>`;
const error = `
          <div class="popup">
            <p class="popup__paragraph">Erreur...</p>
          </div>`;
const root = document.getElementsByTagName('html')[0];
const loader = document.querySelector('.loader');
const jobTitle = document.querySelector('.heading-primary');
const logo = document.querySelector('.header__logo');
const links = document.querySelector('.links');
const navbar = document.querySelector('.navigation');
const navbarList = document.querySelector('.navigation__list');
const navbarLink = document.querySelector('.navigation__link');
const openBtn = document.querySelector('#openBtn');
const closeBtn = document.querySelector('#closeBtn');
const form = document.querySelector('.form');
const isExceedingLimit = (number, limit) => {
  return number > limit;
};
const setLoaderPopup = () => {
  loader.classList.remove('loader--hidden');
  loader.style.backgroundColor = 'rgba(25, 23, 23, 0.8)';
  root.classList.add('no-scroll');
};
const hideLoader = () => {
  loader.classList.add('loader--hidden');
  root.classList.remove('no-scroll');
};
const setResponsePopup = (elementPlace, responseMessage) => {
  elementPlace.insertAdjacentHTML('afterend', responseMessage);
  return document.querySelector('.popup');
};
const removeElementAfterDelay = (element, delay) => {
  setTimeout(() => {
    element.remove();
  }, delay);
};
// LOADER
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  root.classList.add('no-scroll');
  setTimeout(() => {
    hideLoader();
  }, timeOut);
  jobTitle.classList.add('appearing');
});
window.addEventListener('resize', () => {
  const screenSize = window.screen.width;
  !isExceedingLimit(screenSize, screenWidthLimit) &&
    navbarList.classList.add('navigation__position--column');
});
// ANIMATION ON SCROLL
document.addEventListener('scroll', () => {
  const screenSize = window.screen.width;
  const scrollPosition = window.scrollY;
  if (isExceedingLimit(scrollPosition, scrollLimit)) {
    logo.classList.remove('hidden');
    logo.classList.add('header__animation');
    navbarLink.classList.remove('hidden');
    if (isExceedingLimit(screenSize, screenWidthLimit)) {
      navbar.classList.add('navigation__position--top');
      navbar.classList.add('navigation__animation--appearing');
      navbarList.classList.add('navigation__position--column');
    }
  }
});
document.addEventListener('scroll', () => {
  const screenSize = window.screen.width;
  const scrollPosition = window.scrollY;
  if (!isExceedingLimit(scrollPosition, scrollLimit)) {
    logo.classList.add('hidden');
    navbar.classList.remove('navigation__position--top');
    navbar.classList.remove('navigation__animation--appearing');
    navbarList.classList.remove('navigation__position--column');
    navbarLink.classList.add('hidden');
    links.classList.remove('hidden');
    if (!isExceedingLimit(screenSize, screenWidthLimit)) {
      navbarList.classList.add('navigation__position--column');
    }
  }
});
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
// SEND MAIL
const sendMail = (mail) =>
  __awaiter(void 0, void 0, void 0, function* () {
    setLoaderPopup();
    try {
      const response = yield fetch(`${urlBase}/send`, {
        method: 'POST',
        body: mail,
      });
      if (response) {
        hideLoader();
      }
      if (response.ok) {
        removeElementAfterDelay(setResponsePopup(loader, messageSend), timeOut);
        form.reset();
      }
      if (response.statusText === 'Too Many Requests') {
        removeElementAfterDelay(setResponsePopup(loader, spam), timeOut);
      } else {
        removeElementAfterDelay(setResponsePopup(loader, error), timeOut);
      }
    } catch (e) {
      console.error(e);
    }
  });
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mail = new FormData(form);
  sendMail(mail).catch();
});
