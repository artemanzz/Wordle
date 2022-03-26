import { GameCore } from "./GameCore.js"

export class Game {
  constructor() {
    this.words = [
      'piano',
      'pizza',
      'hello',
      'shape',
      'snake'
    ]
    this._core = new GameCore(this)
    this._core.startListeners()
  }

  async pause(ms) {
    this._core.stopListeners()
    await new Promise(res => setTimeout(res, ms))
    this._core.startListeners()
  }

  async win() {
    setTimeout(_ => {
      console.log('u win')
      this.restart()
    }, 2000)

  }

  async lose() {
    setTimeout(_ => {
      console.log('u lose')
      this.restart()
    }, 2000)

  }

  async restart() {
    this._core.goalWord = this._core.generateGoalWord()
    this._core.grid.destroy()
    this._core.grid.init()
  }
}