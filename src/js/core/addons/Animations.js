export class Animations {
  static typing(el) {
    const animationendHandler = ({ target }) => {
      target.classList.remove('typing')
      target.removeEventListener('animationend', animationendHandler)
    }

    el.classList.add('typing')
    el.addEventListener('animationend', animationendHandler)
  }

  static flipping(cells) {
    const animationendHandler = ({ target }) => {
      target.classList.remove('validating')
      target.removeEventListener('animationend', animationendHandler)
    }

    cells.forEach(cell => {
      cell.classList.add('validating')
      cell.addEventListener('animationend', animationendHandler)
    })
  }
}