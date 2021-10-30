export const toCapitalize = function (str) {
  if (str === null) return false
  return str
    .trim()
    .split(' ')
    .map(s => {
      if (s === 'of' || s === 'the' || s === 'da' || s === 'and') return s
      return s[0]?.toUpperCase() + s.slice(1)
    })
    .join(' ')
}

export const formatNumbers = function (num) {
  return num.toLocaleString('en-US')
}

export const timeout = function (timeOutSec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long! Please try again.'))
    }, timeOutSec * 1000)
  })
}

export const hideSearchBoxAndDropdown = function (add = true) {
  const searchFieldWrapper = document.querySelector('.search-field-wrapper')
  if (!add) {
    searchFieldWrapper.querySelector('.country-drop-down__current-region').textContent = 'All'
    searchFieldWrapper.classList.remove('hidden')
  } else searchFieldWrapper.classList.add('hidden')
}

export const formatSpecialCharCountryName = function (str) {
  if (str === '%C3%85land Islands') return 'Åland Islands'
  if (str === 'Saint Barth%C3%A9lemy') return 'Saint Barthélemy'
  if (str === 'R%C3%A9union') return 'Réunion'
  if (str === 'Cura%C3%A7ao') return 'Curaçao'
  return str
}

export const toggleHiddenClass = function () {
  const countryDropDownList = document.querySelector('.country-drop-down__list')
  const dropdown = document.querySelector('.country-drop-down__current-region')
  if (!countryDropDownList || !dropdown) return
  countryDropDownList.classList.toggle('hidden')
  dropdown.classList.toggle('country-drop-down__current-region--rotate-arrow')
}

export const disableInputAndDropdown = function (isDisabled = true) {
  const currRegion = document.querySelector('.country-drop-down__current-region')
  const input = document.querySelector('.input__search')
  if (!input || !currRegion) return
  if (!isDisabled) {
    input.removeAttribute('disabled')
    input.parentElement.classList.remove('reduce-opacity')
    currRegion.parentElement.classList.remove('reduce-opacity')
    currRegion.classList.remove('pointer-events-none')
  }

  if (isDisabled) {
    input.setAttribute('disabled', '')
    input.parentElement.classList.add('reduce-opacity')
    currRegion.classList.add('pointer-events-none')
    currRegion.parentElement.classList.add('reduce-opacity')
  }
}

export const clearSearhbox = function () {
  const searchbox = document.querySelector('.input__search')
  if (!searchbox) return
  searchbox.value = ''
}

export const getCountryOnPathname = function () {
  const pathName = window.location.pathname
  const splitedPathName = pathName.split('/')[2]
  if (splitedPathName === undefined) return false
  if (splitedPathName.includes('%20')) {
    return splitedPathName.replace(/%20/g, ' ')
  }
  if (splitedPathName.includes('-')) {
    return splitedPathName.replace(/-/g, ' ')
  }
  return formatSpecialCharCountryName(splitedPathName)
}

export const getCountryOnPathnameOnNewTab = function () {
  const pathName = window.location.pathname
  const splitedPathName = pathName.split('/')[2]
  if (splitedPathName === undefined) return false
  return splitedPathName.replace(/-/g, ' ')
}

export const formatData = function (str) {
  return str.replace(/' *'/g, '-')
}

export const formatCountryName = function (str) {
  return str.replace(/-/g, ' ')
}
