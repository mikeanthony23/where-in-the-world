class ThemeView {
  #bodyEl = document.querySelector('body')
  #themeEl = document.querySelector('.nav__theme-switch')

  constructor() {
    this.intializeThemeText()
  }

  addHandlerClick(handler) {
    this.#bodyEl.addEventListener('click', e => {
      const themeSwitchBtn = e.target.closest('.nav__theme-switch')
      if (!themeSwitchBtn) return
      handler()
    })
  }

  isDarkMode() {
    return this.#bodyEl.classList.contains('darkmode')
  }

  toggleTheme() {
    this.#bodyEl.classList.toggle('darkmode')
  }

  toggleText(text = 'Dark Mode') {
    this.#themeEl.textContent = text
  }

  intializeThemeText() {
    const isDarkmode = this.#bodyEl.classList.contains('darkmode')
    if (!isDarkmode) this.toggleText()
    else this.toggleText('Light Mode')
  }

  addDarkmodeTheme() {
    this.#bodyEl.classList.add('darkmode')
    this.toggleText('Light Mode')
  }
  addLightmodeTheme() {
    this.#bodyEl.classList.remove('darkmode')
    this.toggleText()
  }
}

export default new ThemeView()
