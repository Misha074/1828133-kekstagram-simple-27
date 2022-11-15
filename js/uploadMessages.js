import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const successUploadTemplate = document.querySelector('#success').content.querySelector('.success');
const errorUploadTemplate = document.querySelector('#error').content.querySelector('.error');
const fragment = document.createDocumentFragment();

const closeSuccessMessage = () => {
  const successBanner = document.querySelector('.success');
  const closeSuccessButton = document.querySelector('.success__button');
  document.body.removeChild(successBanner);
  closeSuccessButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onSuccessBannerKeydown);
  document.removeEventListener('click', closeSuccessMessage);
};

// Тут сделал функцию а не конст, чтобы "всплыла наверх в closeSuccessMessage"
function onSuccessBannerKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
  }
}

const showSuccessMessage = () => {
  const successUploadMessage = successUploadTemplate.cloneNode(true);
  fragment.appendChild(successUploadMessage);
  body.appendChild(fragment);
  const closeSuccessButton = document.querySelector('.success__button');
  closeSuccessButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessBannerKeydown);
  document.addEventListener('click', closeSuccessMessage);
};

const closeErrorMessage = () => {
  const errorBanner = document.querySelector('.error');
  const closeSuccessButton = document.querySelector('.error__button');
  document.body.removeChild(errorBanner);
  closeSuccessButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onErrorBannerKeydown);
  document.removeEventListener('click', closeErrorMessage);
};

// Тут сделал функцию а не конст, чтобы "всплыла наверх в closeSuccessMessage"
function onErrorBannerKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  const errorUploadMessage = errorUploadTemplate.cloneNode(true);
  fragment.appendChild(errorUploadMessage);
  body.appendChild(fragment);
  const closeErrorButton = document.querySelector('.error__button');
  closeErrorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorBannerKeydown);
  document.addEventListener('click', closeErrorMessage);
};

export {showSuccessMessage, showErrorMessage};
