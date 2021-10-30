import View from './view'
import { toggleHiddenClass } from '../helper'

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
    const regionElement = data => this.updateRegionElement(data)
    this.#dropDownList.addEventListener('keyup', function (e) {
      if (e.key !== 'Enter') return
      if (e.key === 'Enter') {
        const regionItems = e.target.closest('.country-drop-down__item')
        if (!regionItems) return
        const regionData = regionItems.dataset.region
        const selectedRegion = regionData
        regionElement(regionData)
        toggleHiddenClass()
        handler(selectedRegion)
      }
    })
  }

  addHandlerClick(handler) {
    const regionElement = data => this.updateRegionElement(data)
    this.#targetParentEl.addEventListener('click', function (e) {
      const regionItems = e.target.closest('.country-drop-down__item')
      if (!regionItems) return
      const regionData = regionItems.dataset.region
      const selectedRegion = regionData
      regionElement(regionData)
      toggleHiddenClass()
      handler(selectedRegion)
    })
  }

  #openCloseDropDownClick() {
    this.#targetParentEl.addEventListener('click', function (e) {
      const dropdownBtn = e.target.closest('.country-drop-down__current-region')
      if (!dropdownBtn) return
      toggleHiddenClass()
    })
  }
  #openCloseDropDownEnter() {
    this.#targetParentEl.addEventListener('keyup', function (e) {
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
