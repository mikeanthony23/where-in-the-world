import themeView from './views/themeView'
import countriesView from './views/countriesView'
import filterView from './views/filterView'
import searchView from './views/searchView'
import countryDetailsPageView from './views/countryDetailsPageView'
import pageNavigationView from './views/pageNavigationView'
import * as model from './model'

import { disableInputAndDropdown, formatSpecialCharCountryName } from './helper'

const controlAllCountriesResults = async function (isInitialPageLoad = true) {
  try {
    countriesView.renderSpinner()
    await model.getJSON()
    countriesView.renderMarkup(model.state.results)
    if (!isInitialPageLoad) window.history.pushState({ country: 'none' }, '', '/')
    pageNavigationView.newPageTitle()
    window.history.replaceState({ country: 'none' }, '', '/')
  } catch (err) {
    console.error(err.message)
    countriesView.renderError('controlAllCountriesResults', err.message)
    disableInputAndDropdown()
  }
}

const controlSearchResults = function () {
  const searchQuery = searchView.getSearchValue()
  const currentRegion = filterView.getSelectedRegion()
  const country = model.searchResults(searchQuery)
  if (country.length === 0)
    searchView.renderError('controlSearchResults', [searchQuery, currentRegion])
  if (searchQuery.length === 0) {
    filterView.updateRegionElement('All')
    searchView.renderMarkup(model.state.results)
  }
  if (country.length > 0) searchView.renderMarkup(country)
}

const controlFilterRegion = function (selectedRegion) {
  const region = selectedRegion
  filterView.renderSpinner()
  const filteredRegions = model.filterRegion(region)
  model.state.regionFilteredResults = filteredRegions
  if (searchView.getSearchValue().length >= 1) return controlSearchResults()
  filterView.renderMarkup(filteredRegions)
  return true
}

const controlSingleCountryInformation = async function (data, historyStates) {
  try {
    const country = data
    if (!historyStates) historyStates = [true, false, false]
    const [isAPopstate = true, isPageReloaded = false, isReplaceState = false] = historyStates
    if (isAPopstate === false) {
      window.history.pushState({ country }, '', `more-information/${country}`)
      pageNavigationView.newPageTitle(
        `Where in the World | `,
        formatSpecialCharCountryName(country)
      )
    }
    if (isPageReloaded === true)
      pageNavigationView.newPageTitle(
        `Where in the World | `,
        formatSpecialCharCountryName(country)
      )
    if (isReplaceState === true) {
      window.history.replaceState({ country }, '', `/more-information/${country}`)
    }
    countriesView.renderSpinner()
    const countryData = await model.loadCountriesDetailPage(country)
    const countryDataBorderCode = countryData[0].borderCountries
    const borderCountries = model.borderCodeToCountryNames(countryDataBorderCode)
    countryDetailsPageView.renderMarkup(countryData, borderCountries)
  } catch (err) {
    console.error(err.message)
    countryDetailsPageView.renderError('controlSingleCountryInformation', err.message)
  }
}

const toggleTheme = function () {
  themeView.toggleTheme()
  if (themeView.isDarkMode()) {
    themeView.addDarkmodeTheme()
    model.setLocalStorageTheme('dark')
  }
  if (!themeView.isDarkMode()) {
    themeView.addLightmodeTheme()
    model.setLocalStorageTheme('light')
  }
}

const init = function () {
  themeView.addHandlerClick(toggleTheme)
  countriesView.addHandlerLoad(controlAllCountriesResults, controlSingleCountryInformation)
  searchView.addHandlerSearch(controlSearchResults)
  filterView.addHandlerClick(controlFilterRegion)
  filterView.addHandlerKeyup(controlFilterRegion)
  pageNavigationView.addHandlerPopstate(controlSingleCountryInformation, controlAllCountriesResults)
  pageNavigationView.addHandlerClickInTitle(controlAllCountriesResults)
  countryDetailsPageView.addHandlerMoreInfoClick(controlSingleCountryInformation)
  countryDetailsPageView.addHandlerClickInBorderCountries(controlSingleCountryInformation)
}
init()
