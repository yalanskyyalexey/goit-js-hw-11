export const renderCountriesNameList = name => {
  const countryList = document.querySelector('.country-list');
  const markup = name
    .map(country => {
      return `<li class="country-list">
          <img class="country-flag" src = "${country.flags.svg}" alt = "Flag of ${country.name}" width = "60" height = "40"><span class="country-name">${country.name}</span></img></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
};

export const renderCountriesInfo = name => {
  const countryInfo = document.querySelector('.country-info');
  const markup = name
    .map(country => {
      return `<li class="country-info">
              <img class="country-flag" src = "${country.flags.svg}"
              alt = "Flag of ${country.name}"
              width = "60"
              height = "40">
              <span class="country-name">${country.name}
              </span>
              </img>
            <p class="country-info__item"><b>Capital</b>: ${country.capital}</p>
            <p class="country-info__item"><b>Population</b>: ${country.population}</p>
            <p class="country-info__item"><b>Languages</b>: ${country.languages.map(
              language => ' ' + language.name,
            )}</p> </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
};
