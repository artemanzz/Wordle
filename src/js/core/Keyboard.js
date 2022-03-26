export class Keyboard {
  constructor(core) {
    this._core = core
    this.$root = document.getElementById('keyboard')
    this.clickHandler = this.clickHandler.bind(this)
  }

  startListener() {
    this.$root.addEventListener('click', this.clickHandler)
  }

  stopListener() {
    this.$root.removeEventListener('click', this.clickHandler)
  }

  clickHandler(e) {
    let { target } = e
    target = target.closest('[data-key]')
    if (target) {
      this._core.keyHandler({ key: target.dataset.key })
    }
  }
}
