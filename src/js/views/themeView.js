class ThemeView {
  #themeSwitchBtn = document.querySelector('.nav__theme-switch')
  #bodyEl = document.querySelector('body')

  addHandlerClick(handler) {
    const switchBtn = this.#themeSwitchBtn
    if (!switchBtn) return
    switchBtn.addEventListener('click', function () {
      if (this !== switchBtn) return
      handler()
    })
  }

  isDarkMode() {
    return this.#bodyEl.classList.contains('darkmode')
  }

  toggleTheme() {
    this.#bodyEl.classList.toggle('darkmode')
  }

  #toggleText(text = 'Dark Mode') {
    this.#themeSwitchBtn.textContent = text
  }

  addDarkmodeTheme() {
    this.#bodyEl.classList.add('darkmode')
    this.#toggleText('Light Mode')
  }
  addLightmodeTheme() {
    this.#bodyEl.classList.remove('darkmode')
    this.#toggleText()
  }
}

export default new ThemeView()
