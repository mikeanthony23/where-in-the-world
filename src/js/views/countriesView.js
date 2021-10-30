import View from './view'
import { hideSearchBoxAndDropdown, getCountryOnPathname } from '../helper'

class CountriesView extends View {
  addHandlerLoad(handler, handler2) {
    const country = getCountryOnPathname()
    if (!country || country === null) return window.addEventListener('load', handler)
    hideSearchBoxAndDropdown()
    return handler2(country, [true, true])
  }
}

export default new CountriesView()
