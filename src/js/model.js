import { TIMEOUT_SEC, API_URL } from './config'
import { timeout } from './helpers'

export const state = {
  results: [],
  regionFilteredResults: [],
  savedTheme: window.localStorage.getItem('theme'),
}

const createNewResultObj = function (data) {
  return data.map(el => {
    return {
      countryName: el.name,
      population: el.population,
      region: el.region,
      capital: el.capital,
      nativeName: el.nativeName,
      subRegion: el.subregion,
      topLevelDomain: el.topLevelDomain[0],
      currencies: el.currencies,
      languages: el.languages,
      borderCountries: el.borders,
      borderCode: el.alpha3Code,
      flag: el.flag,
    }
  })
}

export const getJSON = async function () {
  try {
    const res = await Promise.race([fetch(API_URL), timeout(TIMEOUT_SEC)])
    if (!res.ok) throw new Error(`Something went wrong!! STATUS ${res.status}`)
    const data = await res.json()
    state.results = createNewResultObj(data)
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const filterRegion = function (region) {
  const countries = state.results
  return countries.filter(country => region === 'All' || country.region === region)
}

export const searchResults = function (searchResult) {
  const countries = !state.regionFilteredResults.length
    ? state.results
    : state.regionFilteredResults
  return countries.filter(
    country => country.countryName === searchResult || country.countryName.includes(searchResult)
  )
}

export const loadCountriesDetailPage = async function (data) {
  await getJSON()
  return state.results.filter(country => country.countryName === data)
}

export const borderCodeToCountryNames = function (detailPageBorders) {
  if (!detailPageBorders) return false
  return state.results.filter(country => detailPageBorders.includes(country.borderCode))
}

export const setLocalStorageTheme = function (color) {
  return window.localStorage.setItem('theme', color)
}
