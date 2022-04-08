import { LocalStorage } from "./addons/LocalStorage.js"
import { Grid } from "./grid/Grid.js"
import { Keyboard } from "./addons/Keyboard.js"

export class GameCore {
  constructor(root) {
    this.game = root
    this.storage = new LocalStorage()
    this.goalWord = this.storage.get('goal_word') || this.generateGoalWord()

    this.keyboard = new Keyboard(this)
    this.grid = new Grid(this)
  }

  startListeners() {
    this.keyboard.startListener()
    window.addEventListener('keydown', this.keyHandler)
  }

  stopListeners() {
    this.keyboard.stopListener()
    window.removeEventListener('keydown', this.keyHandler)
  }

  keyHandler = (e) => {
    const key = e.code ?? e.key
    if (key.match(/ENTER/i))
      return this.grid.checkCurrentAttempt()
    if (key.match(/backspace/i))
      return this.grid.clearCurrentAttempt()
    if (key.match(/^Key[a-zA-Z]$/))
      return this.grid.drawCurrentAttempt(key[3])
    if (key.match(/^[a-zA-Z]$/))
      return this.grid.drawCurrentAttempt(key)
  }

  generateGoalWord() {
    const randN = Math.floor(Math.random() * this.game.words.length)
    const newWord = this.game.words[randN]
    this.storage.set('goal_word', newWord)
    return newWord
  }
}
