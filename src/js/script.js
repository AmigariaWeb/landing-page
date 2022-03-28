const header = document.querySelector('header');
const menuBurger = document.querySelector('#menuBurger');
const menuBurgerPanel = document.querySelector('#menuPanel')



window.addEventListener('scroll', changeLogoSize)
menuBurger.addEventListener('click', toogleMenu);

function changeLogoSize() {
  window.scrollY > 0
    ? header.classList.add('headerOnScroll')
    : header.classList.remove('headerOnScroll')
}

function toogleMenu() {
  menuBurger.classList.toggle('switchBurger');
  menuBurgerPanel.classList.toggle('showPanel')
}


const screen = {
    small: 640,
    medium: 768,
    large: 1024
  };

window.addEventListener('resize', resizeHandler);
resizeHandler();

function resizeHandler() {
  const iw = window.innerWidth;
  let size = null;
  for (let breakpoint in screen) {
    if (iw >= screen[breakpoint]) size = breakpoint;
  }

  if (size !== 'large') {
    menuBurgerPanel.classList.add('panel')
    menuBurger.style.display = "block"

  } else {
    menuBurgerPanel.classList.remove('panel')
    menuBurger.style.display = "none"
    menuBurgerPanel.classList.remove('showPanel')
    menuBurger.classList.remove('switchBurger');
  }
}
