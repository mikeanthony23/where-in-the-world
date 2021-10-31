import View from './view'
import { toggleHiddenClass } from '../helpers'

class FilterView extends View {
  #targetParentEl = document.querySelector('.search-field-wrapper')
  #dropDownList = document.querySelector('.country-drop-down__list')
  #currentRegionEl = document.querySelector('.country-drop-down__current-region')

  constructor() {
    super()
    this.#openCloseDropDownClick()
    this.#openCloseDropDownEnter()
  }

  updateRegionElement(data) {
    this.#currentRegionEl.textContent = data
    this.#currentRegionEl.dataset.region = data
  }

  getSelectedRegion() {
    return this.#currentRegionEl.dataset.region
  }

  addHandlerKeyup(handler) {
    this.#dropDownList.addEventListener('keyup', e => {
      if (e.key !== 'Enter') return
      if (e.key === 'Enter') {
        const regionItems = e.target.closest('.country-drop-down__item')
        if (!regionItems) return
        const regionData = regionItems.dataset.region
        const selectedRegion = regionData
        this.updateRegionElement(regionData)
        toggleHiddenClass()
        handler(selectedRegion)
      }
    })
  }

  addHandlerClick(handler) {
    this.#targetParentEl.addEventListener('click', e => {
      const regionItems = e.target.closest('.country-drop-down__item')
      if (!regionItems) return
      const regionData = regionItems.dataset.region
      const selectedRegion = regionData
      this.updateRegionElement(regionData)
      toggleHiddenClass()
      handler(selectedRegion)
    })
  }

  #openCloseDropDownClick() {
    this.#targetParentEl.addEventListener('click', e => {
      const dropdownBtn = e.target.closest('.country-drop-down__current-region')
      if (!dropdownBtn) return
      toggleHiddenClass()
    })
  }
  #openCloseDropDownEnter() {
    this.#targetParentEl.addEventListener('keyup', e => {
      if (e.key !== 'Enter') return
      if (e.key === 'Enter') {
        const dropdownBtn = e.target.closest('.country-drop-down__current-region')
        if (!dropdownBtn) return
        toggleHiddenClass()
      }
    })
  }
}

export default new FilterView()
