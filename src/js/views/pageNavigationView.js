import {
  hideSearchBoxAndDropdown,
  formatCountryName,
  getCountryOnPathname,
  clearSearhbox,
} from '../helpers'

class PageNavigationView {
  #navEl = document.querySelector('.nav')
  parentEl = document.querySelector('.main')
  popstateTarget = window

  constructor() {
    this.#addhandlerBackBtnClick()
  }

  addHandlerPopstate(singleCountryHandler, allCountriesHandler) {
    this.popstateTarget.addEventListener('popstate', e => {
      clearSearhbox()
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
    this.#navEl.addEventListener('click', e => {
      e.preventDefault()
      const link = e.target.closest('.nav__title-link')
      if (!link) return
      hideSearchBoxAndDropdown(false)
      clearSearhbox()
      handler(false, [true, false, true])
    })
  }

  #addhandlerBackBtnClick() {
    this.parentEl.addEventListener('click', e => {
      const homeBtn = e.target.closest('.main__back-btn')
      if (!homeBtn) return
      window.history.back()
    })
  }
}

export default new PageNavigationView()
