import themeView from './views/themeView'
import countriesView from './views/countriesView'
import filterView from './views/filterView'
import searchView from './views/searchView'
import countryDetailsPageView from './views/countryDetailsPageView'
import pageNavigationView from './views/pageNavigationView'
import * as model from './model'

import {
  disableInputAndDropdown,
  formatSpecialCharCountryName,
  toCapitalize,
  newPageTitle,
} from './helpers'

const controlAllCountriesResults = async function (isInitialPageLoad = true) {
  try {
    countriesView.renderSpinner()
    await model.getJSON()
    countriesView.renderMarkup(model.state.results)
    if (!isInitialPageLoad) window.history.pushState({ country: 'none' }, '', '/')
    newPageTitle()
    window.history.replaceState({ country: 'none' }, '', '/')
  } catch (err) {
    console.error(err.message)
    countriesView.renderError('controlAllCountriesResults', err.message)
    disableInputAndDropdown()
  }
}

const controlSearchResults = function () {
  const searchQuery = toCapitalize(searchView.getSearchValue())
  const currentRegion = filterView.getSelectedRegion()
  const country = model.searchResults(searchQuery)
  searchView.renderMarkup(country)
  if (!country.length) searchView.renderError('controlSearchResults', [searchQuery, currentRegion])
  if (!searchQuery && !country.length) {
    filterView.updateRegionElement('All')
    searchView.renderMarkup(model.state.results)
  }
}

const controlFilterRegion = function (selectedRegion) {
  const region = selectedRegion
  filterView.renderSpinner()
  const filteredRegions = model.filterRegion(region)
  model.state.regionFilteredResults = filteredRegions
  filterView.renderMarkup(filteredRegions)
  if (searchView.getSearchValue().length >= 1) controlSearchResults()
}

const controlSingleCountryInformation = async function (data, historyStates) {
  try {
    const country = formatSpecialCharCountryName(data)
    if (!historyStates) historyStates = [true, false, false]
    const [isAPopstate = true, isPageReloaded = false, isReplaceState = false] = historyStates
    if (isAPopstate === false) {
      window.history.pushState({ country }, '', `more-information/${country}`)
      newPageTitle(`Where in the World | `, country)
    }
    if (isPageReloaded === true) newPageTitle(`Where in the World | `, country)
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

const setSavedTheme = function () {
  if (model.state.savedTheme === 'dark') themeView.addDarkmodeTheme()
  if (model.state.savedTheme === 'light') themeView.addLightmodeTheme()
}

const init = function () {
  setSavedTheme()
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
