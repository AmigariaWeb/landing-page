/*********** Funcionalidades del Header *************/
// Selectores
const header = document.querySelector('header');
const menuBurger = document.querySelector('#menu-burger');
const menuBurgerPanel = document.querySelector('#menu-panel')

// Eventos
window.addEventListener('scroll', changeLogoSize)
window.addEventListener('resize', resizeHandler);
menuBurger.addEventListener('click', toogleMenu);


//Funciones
function changeLogoSize() {
  window.scrollY > 0
    ? header.classList.add('header-on-scroll')
    : header.classList.remove('header-on-scroll')
}

function toogleMenu() {
  menuBurger.classList.toggle('switch-burger');
  menuBurgerPanel.classList.toggle('show-panel')
}


function resizeHandler() {
  const largeScreen = 1024;
  const windowWidth = window.innerWidth;

  if (windowWidth < largeScreen) {
    menuBurgerPanel.style.display = "none"
    setTimeout(() => {
      menuBurgerPanel.classList.add('panel')
      menuBurgerPanel.style.display = "flex"
    }, 1);
    menuBurger.style.display = "block"

  } else {
    menuBurgerPanel.classList.remove('panel')
    menuBurgerPanel.classList.remove('show-panel')
    menuBurger.style.display = "none"
    menuBurger.classList.remove('switch-burger');
  }
}
// Primera ejecución al abrir la página
resizeHandler();