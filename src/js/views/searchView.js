import View from './view'
import { SEARCH_DELAY_MS } from '../config'
import { debounce } from '../helpers'

class SearchView extends View {
  #inputWrapper = document.querySelector('.input')

  addHandlerSearch(handler) {
    const searchDebounce = debounce(handler, SEARCH_DELAY_MS)
    if (!this.#inputWrapper) return
    this.#inputWrapper.addEventListener('input', function (e) {
      const target = e.target.closest('.input__search')
      if (!target) return
      searchDebounce()
    })
  }

  getSearchValue() {
    const searchValue = this.#inputWrapper.querySelector('.input__search').value
    return searchValue
  }
}

export default new SearchView()
