import { formatData, formatNumbers } from '../helper'

export default class View {
  parentEl = document.querySelector('.main')
  data

  clear() {
    this.parentEl.innerHTML = ''
  }

  renderMarkup(data) {
    this.data = data
    const markup = this.createMarkup()
    this.clear()
    this.parentEl.innerHTML = markup
  }

  renderError(handler, error) {
    if (
      error === 'Failed to fetch' &&
      (handler === 'controlResults' || handler === 'controlCountryDetails')
    )
      error = 'Cannot fetch the data please check your internet connection.'
    if (handler === 'controlResults') {
      this.parentEl.innerHTML = `<li class="main__error-msg"><strong class="main__error-msg-strong" >${error}</strong></li>`
    }

    if (handler === 'controlSearchResults') {
      const [search, region] = error
      this.parentEl.innerHTML = `<li class="main__error-msg">No results found for "<strong>${search}</strong>" in <strong>${region}</strong> region.</li>`
    }

    if (handler === 'controlCountryDetails') {
      this.parentEl.innerHTML = `<li class="main__error-msg main__error-msg-more-info"><strong class="main__error-msg-strong">${error}</strong></li>`
    }
  }

  renderSpinner() {
    const spinner = `
    <div class="spinner-container">
      <div class="loader"></div>
    </div>`
    this.clear()
    this.parentEl.innerHTML = spinner
  }

  createMarkup() {
    return `
    <ul class="main__list">
     ${this.data
       .map(el => {
         return `
      <li class="main__list-item">
        <figure class="card ${
          this.parentEl.classList.contains('dark-mode')
            ? `dark-mode-text-bgColor`
            : ``
        }">
          <div class="card__img-container">
            <img class="card__img" src="${el.flag}" alt="Image of ${
           el.countryName
         }'s flag">
          </div>
          <figcaption class="card__caption">
            <ul class="card__list">

              <li class="card__item card__item-country-name">
                <span class="card__value-country-name">${el.countryName}
                </span>
              </li>

              <li class="card__item">Population:
                <span class="card__value">${formatNumbers(el.population)}
                </span>
              </li>

              <li class="card__item">Region:
                <span class="card__value">${el.region ?? `None`}
                </span>
              </li>

              <li class="card__item">Capital: <span
              class="card__value">${el.capital ?? `None`}
                </span>
             </li>

              <li class="card__item">
                <a class="card__more-details" href="/more-information/${formatData(
                  el.countryName
                )}" data-details="${formatData(el.countryName)}">
               More Information
                </a>
              </li>
           
            </ul>
          </figcaption>
        </figure>
      </li>`
       })
       .join('')}
      </ul>`
  }
}
