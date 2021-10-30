import View from './view'
import { SEARCH_DELAY_MS } from '../config'

class SearchView extends View {
  #inputWrapper = document.querySelector('.input')

  #debounce(func, delay) {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func(...args)
      }, delay)
    }
  }

  addHandlerSearch(handler) {
    const debounce = this.#debounce(handler, SEARCH_DELAY_MS)
    if (!this.#inputWrapper) return
    this.#inputWrapper.addEventListener('input', e => {
      const target = e.target.closest('.input__search')
      if (!target) return
      debounce()
    })
  }

  getSearchValue() {
    const searchValue = this.#inputWrapper.querySelector('.input__search').value
    return searchValue
  }
}

export default new SearchView()
