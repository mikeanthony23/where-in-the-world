import View from './view'
import { hideSearchBoxAndDropdown, getCountryOnPathname } from '../helpers'

class CountriesView extends View {
  loadTarget = window

  addHandlerLoad(handler, handler2) {
    const country = getCountryOnPathname()
    if (!country || country === null) return this.loadTarget.addEventListener('load', handler)
    hideSearchBoxAndDropdown()
    return handler2(country, [true, true])
  }
}

export default new CountriesView()
