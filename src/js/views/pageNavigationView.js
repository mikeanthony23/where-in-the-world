import {
  hideSearchBoxAndDropdown,
  formatCountryName,
  disableInputAndDropdown,
  getCountryOnPathname,
} from '../helper'

class PageNavigationView {
  #navEl = document.querySelector('.nav')
  parentEl = document.querySelector('.main')

  constructor() {
    this.#addhandlerBackBtnClick()
  }

  addHandlerPopstate(singleCountryHandler, allCountriesHandler) {
    window.addEventListener('popstate', function (e) {
      if (e.state === null) {
        const country = getCountryOnPathname()
        hideSearchBoxAndDropdown()
        return singleCountryHandler(country, [true, false, false, true])
      }
      const country = formatCountryName(e.state.country)
      if (country === 'none') {
        hideSearchBoxAndDropdown(false)
        return allCountriesHandler()
      }
      hideSearchBoxAndDropdown()
      return singleCountryHandler(country, [true, false, false])
    })
  }

  addHandlerClickInTitle(handler) {
    this.#navEl.addEventListener('click', function (e) {
      e.preventDefault()
      const link = e.target.closest('.nav__title-link')
      if (!link) return
      hideSearchBoxAndDropdown(false)
      handler(false, [true, false, true])
      disableInputAndDropdown(false)
    })
  }

  #addhandlerBackBtnClick() {
    this.parentEl.addEventListener('click', function (e) {
      const homeBtn = e.target.closest('.main__back-btn')
      if (!homeBtn) return
      window.history.back()
    })
  }

  newPageTitle(title = 'Where in the World', country = '') {
    const pageTitle = document.querySelector('.title')
    pageTitle.textContent = `${title} ${formatCountryName(country)}`
    return pageTitle
  }
}

export default new PageNavigationView()
