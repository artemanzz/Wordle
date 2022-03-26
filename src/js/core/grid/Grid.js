import { getChildren, validateAttempt } from "../../functions/utils.js"
import { Animations } from "../Animations.js"
import { GridStorage } from "./GridStorage.js"

export class Grid extends GridStorage {
  constructor(core) {
    super()
    this._core = core
    this.storage = this._core.storage

    this.$root = document.getElementById('gameGrid')
    this.$rows = getChildren(this.$root)

    this.init()
  }

  init() {
    this.goalWord = this._core.goalWord
    this.attempts = this.getAttemptsFromStorage() || {}

    this.currentAttempt = ''
    this.currentRow = this.storage.get('currentRow') || 0
    this.currentCell = 0

    this.drawAttempts()
  }

  drawAttempts() {
    const entries = Object.entries(this.attempts)
    if (entries.length)
      entries.forEach(([rowNumber, attempt]) => {
        const $cells = getChildren(this.$rows[rowNumber])
        $cells.forEach(($cell, i) => $cell.textContent = attempt[i])
        validateAttempt(attempt, this.goalWord, $cells)
      })
  }

  drawCurrentAttempt(letter) {

    if (this.currentCell >= 5) {
      return
    }

    const $currentCell = getChildren(this.$rows[this.currentRow])[this.currentCell]

    $currentCell.textContent = letter
    Animations.typing($currentCell)
    this.currentCell++
  }

  clearCurrentAttempt() {
    if (this.currentCell <= 0)
      return

    this.currentCell--
    getChildren(this.$rows[this.currentRow])[this.currentCell]
      .textContent = null
  }

  checkCurrentAttempt() {
    let valid = 0
    let attempt = ''
    let $cells = getChildren(this.$rows[this.currentRow])

    $cells.forEach(cell => {
      if (cell.textContent) {
        valid++
        attempt += cell.textContent
      }
    })

    if (valid == 5) {
      this.currentAttempt = attempt.toLowerCase()
      this.attempts[this.currentRow] = this.currentAttempt
      this.setAttemptsToStorage()
      Animations.flipping($cells)
      validateAttempt(this.currentAttempt, this.goalWord, $cells)

      if (!this.isGameEnd(this.currentAttempt)) {
        this.currentRow += 1
        this.currentCell = 0
      }
    }
  }

  isGameEnd(attempt) {
    this._core.game.pause(2000)
    if (attempt == this.goalWord) {
      this._core.game.win()
      return true
    }
    if (this.currentRow == this.$rows.length - 1) {
      this._core.game.lose()
      return true
    }
    return false
  }

  destroy() {
    this.attempts = {}
    this.currentRow = 0
    this.currentCell = 0
    this.currentAttempt = ''

    this.$rows.forEach(row => getChildren(row)
      .forEach(cell => {
        cell.textContent = null
        cell.classList.remove('intermediate')
        cell.classList.remove('success')
        cell.classList.remove('incorrect')
      }))

    this.clearAttemptsFromStorage()
  }
}
