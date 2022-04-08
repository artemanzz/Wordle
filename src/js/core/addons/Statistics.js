import { LocalStorage } from './LocalStorage.js'

export class Statistics {
  constructor(core) {
    this._core = core

    this.storage = new LocalStorage()

    this.$root = document.getElementById('statsList')
    this.$statsContainer = document.getElementById('gameStats')
    this.$trigger = document.getElementById('stats')

    this.statistics = this.storage.get('statistics') ?? {}

    this.rating = this.statistics.rating ?? [0, 0]

    this.$gameWin = document.getElementById('gameWin')
    this.$gameLose = document.getElementById('gameLose')
    this.$gameWinRate = document.getElementById('gameWinRate')
    this.$gameCurrentStreak = document.getElementById('gameCurrentStreak')
    this.$gameMaxStreak = document.getElementById('gameMaxStreak')

    this.init()
  }

  init() {
    this.$trigger.addEventListener('click', this.showStats)
    this.$statsContainer.addEventListener('click', this.hideStats)

    this.$gameWin.textContent = this.rating[0]
    this.$gameLose.textContent = this.rating[1]
    this.$gameWinRate.textContent = this.statistics.winRate || 0
    this.currentStreak = this.statistics.currentStreak || 0
    this.maxStreak = this.statistics.maxStreak || 0
  }

  showStats = () => {
    this.$statsContainer.classList.add('visible')
    this._core.stopListeners()
  }

  hideStats = ({ target }) => {
    let newTarget = target.closest('#gameStats .container')
    if (!newTarget || target.closest('#statsClose'))
      this.$statsContainer.classList.remove('visible')

    this._core.startListeners()
  }

  updateStats(result = true) {
    if (result) {
      this.rating[0] += 1
      this.currentStreak += 1
      this.maxStreak = Math.max(this.currentStreak, this.maxStreak)
    } else {
      this.rating[1] += 1
      this.currentStreak = 0
    }

    ;[this.$gameWin.textContent, this.$gameLose.textContent] = this.rating

    let winRate = (this.rating[0] - this.rating[1]) / this.rating[0]
    winRate = isFinite(winRate) ? (winRate * 100).toFixed(0) + '%' : '0%'
    this.$gameWinRate.textContent = winRate

    this.updateStorage()
  }

  updateStorage() {
    this.storage.set('statistics', {
      rating: this.rating,
      winRate: this.$gameWinRate.textContent,
      currentStreak: this.currentStreak,
      maxStreak: this.maxStreak,
    })
  }

  set currentStreak(value) {
    this.$gameCurrentStreak.textContent = value
  }

  get currentStreak() {
    return +this.$gameCurrentStreak.textContent
  }

  set maxStreak(value) {
    this.$gameMaxStreak.textContent = value
  }

  get maxStreak() {
    return +this.$gameMaxStreak.textContent
  }
}

let stopKeydowns = (e) => e.preventDefault()
