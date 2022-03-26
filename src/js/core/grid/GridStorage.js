export class GridStorage{
  setAttemptsToStorage() {
    this.storage.set('attempts', this.attempts)
    this.storage.set('currentRow', this.currentRow + 1)
  }

  getAttemptsFromStorage() {
    return this.storage.get('attempts')
  }

  clearAttemptsFromStorage() {
    this.storage.remove('attempts')
    this.storage.remove('currentRow')
  }
}