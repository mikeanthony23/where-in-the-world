class ThemeView {
  #bodyEl = document.querySelector('body')

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
    this.#bodyEl.querySelector('.nav__theme-switch').textContent = text
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
