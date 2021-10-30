import {
  formatNumbers,
  hideSearchBoxAndDropdown,
  clearSearhbox,
  formatData,
  formatCountryName,
} from '../helper'
import View from './view'

class CountryDetailsPageView extends View {
  #borderList

  addHandlerMoreInfoClick(handler) {
    this.parentEl.addEventListener('click', function (e) {
      e.preventDefault()
      const link = e.target.closest('.card__more-details')
      if (!link) return
      const country = formatCountryName(link.dataset.details)
      hideSearchBoxAndDropdown()
      handler(country, [false])
      clearSearhbox()
    })
  }

  addHandlerClickInBorderCountries(handler) {
    this.parentEl.addEventListener('click', function (e) {
      e.preventDefault()
      const borderCountryLink = e.target.closest('.card__border-country-link')
      if (!borderCountryLink) return
      const country = formatCountryName(borderCountryLink.dataset.details)
      handler(country, [false, true, true])
    })
  }

  renderMarkup(data, borders) {
    this.data = data
    this.#borderList = borders
    const markup = this.createMarkup()
    this.parentEl.innerHTML = markup
  }

  createMarkup() {
    const [data] = this.data
    return `
    <button class="main__back-btn">Back</button>
    <figure class="card card-detail-page">
     <div class="card__img-container card__img-container-detail-page">
        <img class="card__img card__img-detail-page" src="${data.flag}" alt="Image of ${
      data.countryName
    }'s flag">
     </div>
     <figcaption class="card__caption card__caption-detail-page">
        <ul class="card__list card__list-detail-page">

          <li class="card__item card__item-0">
            <h2 class="card__country-name card__country-name-detail-page">${data.countryName}</h2>
          </li>
          
          <li class="card__item card__item-1">
            <ul class="card__info-list">
            
              <li class="card__item-detail-page">Native Name: <span class="card__value"> ${
                data.nativeName
              }</span></li>

              <li class="card__item-detail-page">Population: <span class="card__value">${formatNumbers(
                data.population,
              )}</span> </li>
  
              <li class="card__item-detail-page">Region: <span class="card__value">${
                data.region
              }</span></li>

              <li class="card__item-detail-page">Sub Region: <span class="card__value">${
                data.subRegion
              }</span></li>
           
              <li class="card__item-detail-page">Capital: <span class="card__value">${
                data.capital ?? 'None'
              }</span></li>
              
            </ul>
          </li>

          <li class="card__item card__item-2">
            <ul class="card__info-list">
              <li class="card__item-detail-page">Top Level Domain: <span class="card__value">${
                data.topLevelDomain
              }
                </span>
              </li>

              <li class="card__item-detail-page">Currencies: <span class="card__value">${
                !data.currencies ? 'None' : data.currencies.map(cur => cur.name).join(', ')
              }
                </span>
              </li>

              <li class="card__item-detail-page">
            Languages: <span class="card__value">${
              !data.languages ? 'None' : data.languages.map(lang => lang.name).join(', ')
            }
                </span>
              </li>
            </ul>
          </li>

          <li class="card__item card__item-3">
            <span class=" card__item-detail-page">Border Countries: </span>
            <ul class="card__border-list">
            ${
              !this.#borderList
                ? `
                <li class="card__no-border-found-msg">
                  No Borders found.
                </li>`
                : this.#borderList
                    .map(borders => {
                      return `
                <li class="card__border-country">
                  <a class="card__border-country-link" href="/more-information/${formatData(
                    borders.countryName,
                  )}" data-details="${formatData(borders.countryName)}">${borders.countryName}
                  </a>
                </li>`
                    })
                    .join('')
            } 
            </ul>   
          </li>
        </ul>
      </figcaption>
    </figure>`
  }
}

export default new CountryDetailsPageView()
