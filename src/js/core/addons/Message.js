export class Message {
  constructor(core) {
    this._core = core

    this.$root = document.getElementById('message')
    this.$messageContainer = this.$root.querySelector('container')
    this.$title = this.$root.querySelector('h2')
    this.$word = this.$root.querySelector('#correctWord')

    this.init()
  }

  init() {
    this.$root.addEventListener('click', this.hide)
  }

  show(...args) {
    this.updateMessage(...args)
    this.$root.classList.add('visible')
    this._core.stopListeners()
  }

  hide = ({ target }) => {

    if (
      !target.closest('#message .container') ||
      target.closest('#messageClose')
    )
      this.$root.classList.remove('visible')
    this._core.startListeners()
  }

  updateMessage(result = true, attempt, classes) {
    let word = ''

    if (result) {
      word = template(attempt, classes)
      this.$title.textContent = 'Great! You Win'
    } else {
      word = template(attempt, classes)
      this.$title.textContent = 'Better luck next time:('
    }

    this.$word.innerHTML = word
  }
}

let template = (letters, classes) => {
  classes = classes.map((c) => (c ? `Cell ${c}` : 'Cell'))
  return `
<div class="${classes[0]}">${letters[0]}</div>
<div class="${classes[1]}">${letters[1]}</div>
<div class="${classes[2]}">${letters[2]}</div>
<div class="${classes[3]}">${letters[3]}</div>
<div class="${classes[4]}">${letters[4]}</div>
`
}
