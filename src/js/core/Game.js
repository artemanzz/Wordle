import { GameCore } from './GameCore.js'
import { Statistics } from './addons/Statistics.js'
import { Message } from './addons/Message.js'

export class Game {
  constructor() {
    this.words = ['piano', 'pizza', 'hello', 'shape', 'snake']
    this._core = new GameCore(this)
    this.statistics = new Statistics(this._core)
    this.message = new Message(this._core)
    this._core.startListeners()
  }

  async pause(ms) {
    this._core.stopListeners()
    await new Promise((res) => setTimeout(res, ms))
    this._core.startListeners()
  }

  async win(classes) {
    await this.pause(2000)
    this.message.show(true, this._core.goalWord, classes)
    this.restart()
    this.statistics.updateStats(true)
  }

  async lose(classes) {
    await this.pause(2000)
    this.message.show(false, this._core.goalWord, classes)
    this.restart()
    this.statistics.updateStats(false)
  }

  async restart() {
    this._core.goalWord = this._core.generateGoalWord()
    this._core.grid.destroy()
    this._core.grid.init()
  }
}
