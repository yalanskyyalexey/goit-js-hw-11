import { form, input, gallery, moreButton } from './js/refs';
import getImages from './js/getimages';
import Notiflix from 'notiflix';
import galleryTemplate from './hbs/renderCard.hbs';
import './sass/main.scss';

let inputValue = '';
let pageCounter = 1;

const createMarkup = event => {
  event.preventDefault();

  pageCounter = 1;
  getImages(inputValue, pageCounter).then(photos => (gallery.innerHTML = galleryTemplate(photos)));

  if (!inputValue) {
    moreButton.classList.remove('visible-button');
  } else {
    moreButton.classList.remove('hidden');
  }
};

input.addEventListener('input', ({ currentTarget }) => {
  inputValue = currentTarget.value.trim();
});

moreButton.addEventListener('click', () => {
  pageCounter += 1;

  getImages(inputValue, pageCounter).then(photos =>
    gallery.insertAdjacentHTML('beforeend', galleryTemplate(photos)),
  );
});

form.addEventListener('submit', createMarkup);
