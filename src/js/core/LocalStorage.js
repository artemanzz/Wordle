export class LocalStorage {
  constructor() {
    this.root = window.localStorage
  }

  get(key) {
    return JSON.parse(this.root.getItem(key))
  }

  set(key, data) {
    return this.root.setItem(key, JSON.stringify(data))
  }

  remove(key) {
    return this.root.removeItem(key)
  }
}