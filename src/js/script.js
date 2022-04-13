/****************** Header Features Start ******************/
const header = document.querySelector('header');
const menuBurger = document.querySelector('#menu-burger');
const menuBurgerPanel = document.querySelector('#menu-panel');
const btnLogin = document.querySelector('#btn-login');
const loginModal = document.querySelector('#login-modal');

window.addEventListener('scroll', changeLogoSize);
window.addEventListener('resize', resizeHandler);
menuBurger.addEventListener('click', toogleMenu);
btnLogin.addEventListener('click', showLoginModal);


function changeLogoSize() {
  window.scrollY > 0
    ? header.classList.add('header-on-scroll')
    : header.classList.remove('header-on-scroll');
}

function toogleMenu() {
  menuBurger.classList.toggle('switch-burger');
  menuBurgerPanel.classList.toggle('show-panel');
}

function showLoginModal(e) {
    e.preventDefault();
    loginModal.classList.add("show-login-modal");
    setTimeout(() => {
        loginModal.classList.remove("show-login-modal");  
    }, 3000);
}

function resizeHandler() {
  const largeScreen = 1024;
  const windowWidth = window.innerWidth;

  if (windowWidth < largeScreen) {
    menuBurgerPanel.style.display = "none";
    setTimeout(() => {
      menuBurgerPanel.classList.add('panel');
      menuBurgerPanel.style.display = "flex";
    }, 1);
    menuBurger.style.display = "block";

  } else {
    menuBurgerPanel.classList.remove('panel');
    menuBurgerPanel.classList.remove('show-panel');
    menuBurger.style.display = "none";
    menuBurger.classList.remove('switch-burger');
  }
}
// First page render
resizeHandler();

/****************** Header Features End ******************/

/******************FormValidation Start******************/

const getType = (value) => {
    const type = Object.prototype.toString.call(value).slice(1, -1).split(" ");

    return type && type[1].toLowerCase();
};

const validations = {
    isEmpty: ({ value }) => {
        const valueIsType = getType(value);

        if (valueIsType === "string") return !value.trim().length;
        if (valueIsType === "array") return !value.length;
        if (valueIsType === "object") return !Object.keys(value).length;
        if (valueIsType === "number") return Number.isNaN(value);
        if (valueIsType === "boolean") return false;

        return true;
    },
    email: ({ value }) => {
        const isEmpty = validations.isEmpty({ value });
        const returnValue = {
            isValid: false,
            message: null,
        };

        if (isEmpty === true) {
            returnValue.message = "Email is required";
            return returnValue;
        }

        const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = pattern.test(String(value).toLowerCase());

        if (isValid === false) {
            returnValue.message = "Provide a valid email address";
        }
        returnValue.isValid = isValid;

        return returnValue;
    },
    username: ({ value }) => {
        const isEmpty = validations.isEmpty({ value });
        const returnValue = {
            isValid: !isEmpty,
            message: null,
        };

        if (isEmpty === true) {
            returnValue.message = "Username is required";
        }
        return returnValue;
    },
    password: ({ value }) => {
        const isEmpty = validations.isEmpty({ value });
        const returnValue = {
            isValid: false,
            message: null,
        };

        if (isEmpty === true) {
            returnValue.message = "Password is required";
            return returnValue;
        }

        if (value.length < 8) {
            returnValue.message = "Password must be at least 8 character.";
            return returnValue;
        }

        returnValue.isValid = true;
        return returnValue;
    },
    passwordConfirm: ({ value, valueToMatch }) => {
        const isEmpty = validations.isEmpty({ value });
        const valueToMatchIsEmpty = validations.isEmpty(valueToMatch);
        const returnValue = {
            isValid: false,
            message: null,
        };

        if (valueToMatchIsEmpty === true) {
            return returnValue;
        }

        if (isEmpty === true) {
            returnValue.message = "Please confirm your password";
            return returnValue;
        }

        if (value !== valueToMatch) {
            returnValue.message = "Passwords doesn't match";
            return returnValue;
        }

        returnValue.isValid = true;
        return returnValue;
    },
};

const setInputControlClassName = ({ element, isValid = true, message = null }) => {
    const inputControl = element.parentElement || {};
    inputControl.classList.toggle("error", !isValid);
    inputControl.classList.toggle("succes", isValid);


    const errorDisplay = inputControl.querySelector(".error") || {};
    errorDisplay.innerText = message || "";
};

const onSubmitForm = (event) => {
    event.preventDefault();

    let formObject = event.currentTarget;
    let formElements = formObject.elements;
    let sendForm=true;

    Array.prototype.slice.call(formElements).forEach((element) => {
        const { type, required, dataset } = element;

        if (["submit", "reset", "button"].includes(type) || required) return;


        const validationType = dataset.validation;
        const value = element.value?.trim();
        const valueToMatch = validationType === "passwordConfirm" ? formElements.password?.value?.trim() : null;
        const { isValid, message } = validations[validationType]({ value, valueToMatch });
        if(isValid == false && sendForm == true ){
          sendForm =false;
        }
        setInputControlClassName({ element, isValid, message });
    });
    if(sendForm){
      formC2a.parentNode.firstElementChild.innerText="Gracias por registrarse!";
      formC2a.innerText="";
    }
};

const formC2a = document.querySelector('#c2a-landing')
formC2a.addEventListener('submit', onSubmitForm, false);

/******************FormValidation End******************/