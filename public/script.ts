const timeOut: number = 900;
const scrollLimit: number = 137;
const screenWidthLimit: number = 1300;
const urlBase = 'https://portfolio-server-phi-three.vercel.app';

const messageSend: string = `
          <div class="popup">
            <p class="popup__paragraph">Message reçu !</p>
          </div>`;

const spam: string = `
          <div class="popup">
            <p class="popup__paragraph">Alerte au spam ! </br> Merci de patientez 30 sec...</p>
          </div>`;

const error: string = `
          <div class="popup">
            <p class="popup__paragraph">Erreur...</p>
          </div>`;

const root = document.getElementsByTagName(
  'html'
)[0] as HTMLElementTagNameMap['html'];

const loader = document.querySelector('.loader') as HTMLDivElement;

const jobTitle = document.querySelector('.heading-primary') as HTMLTitleElement;
const logo = document.querySelector('.header__logo') as HTMLAnchorElement;

const links = document.querySelector('.links') as HTMLElement;

const navbar = document.querySelector(
  '.navigation'
) as HTMLElementTagNameMap['nav'];

const navbarList = document.querySelector(
  '.navigation__list'
) as HTMLUListElement;

const navbarLink = document.querySelector(
  '.navigation__link'
) as HTMLAnchorElement;

const openBtn = document.querySelector('#openBtn') as HTMLAnchorElement;
const closeBtn = document.querySelector('#closeBtn') as HTMLAnchorElement;

const form = document.querySelector('.form') as HTMLFormElement;

const isExceedingLimit = (number: number, limit: number): boolean => {
  return number > limit;
};

const setLoaderPopup = (): void => {
  loader.classList.remove('loader--hidden');
  loader.style.backgroundColor = 'rgba(25, 23, 23, 0.8)';
  root.classList.add('no-scroll');
};

const hideLoader = () => {
  loader.classList.add('loader--hidden');
  root.classList.remove('no-scroll');
};

const setResponsePopup = (
  elementPlace: HTMLElement,
  responseMessage: string
): HTMLDivElement => {
  elementPlace.insertAdjacentHTML('afterend', responseMessage);
  return document.querySelector('.popup')!;
};

const removeElementAfterDelay = (element: HTMLElement, delay: number): void => {
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
  const screenSize: number = window.screen.width;

  !isExceedingLimit(screenSize, screenWidthLimit) &&
    navbarList.classList.add('navigation__position--column');
});

// ANIMATION ON SCROLL
document.addEventListener('scroll', () => {
  const screenSize: number = window.screen.width;
  const scrollPosition: number = window.scrollY;

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
  const screenSize: number = window.screen.width;
  const scrollPosition: number = window.scrollY;

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

const openNav = (): void => {
  navbar.classList.add('active');
  closeBtn.classList.remove('hidden');
  navbarList.classList.add('navigation__position--column');
  navbar.classList.remove('navigation__position--top');
};
openBtn.onclick = openNav;

const closeNav = (): void => {
  navbar.classList.remove('active');
  closeBtn.classList.add('hidden');
};
closeBtn.onclick = closeNav;
navbarList.onclick = closeNav;

// SEND MAIL
const sendMail = async (mail: BodyInit) => {
  setLoaderPopup();
  try {
    const response = await fetch(`${urlBase}/send`, {
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
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mail: BodyInit = new FormData(form);
  sendMail(mail).catch();
});
