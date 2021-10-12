import './css/styles.css';
import { fetchCountries } from './js/functions';
import { renderCountriesNameList, renderCountriesInfo } from './js/markup';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchCountryInput = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const countryListClear = () => {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};

const searchCountry = () => {
  let name = searchCountryInput.value.trim();
  console.log(fetchCountries(name));
  if (name.length === 0) {
    countryListClear();
  } else {
    fetchCountries(name)
      .then(name => {
        if (name.length > 10) {
          Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        } else if (name.length >= 2 && name.length <= 10) {
          renderCountriesNameList(name);
          countryList.style.display = 'block';
        } else if (name.length === 1) {
          renderCountriesInfo(name);
          countryList.style.display = 'none';
        } else {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          countryListClear();
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        countryListClear();
      });
  }
};
searchCountryInput.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

//STYLE

countryList.style.listStyle = 'none';
countryList.style.fontSize = '20px';
countryList.style.marginBottom = '10px';
countryList.style.marginLeft = '5px';

countryInfo.style.listStyle = 'none';
