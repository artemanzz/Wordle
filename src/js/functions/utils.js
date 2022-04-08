export function isLetterInWord(letter, word) {
  return letter !== '' && word.includes(letter)
}

export function isLetterInCorrectPlace(letter, word, i) {
  return letter !== '' && word[i] === letter
}

export function getChildren(node) {
  return [...node.children]
}

export function splitWord(word) {
  const result = {}

  word.split('').reduce((acc, letter) => {
    acc[letter] ? (acc[letter] += 1) : (acc[letter] = 1)
    return acc
  }, result)

  return result
}

export function validateAttempt(currentAttempt, goalWord, cells) {
  const goalLetters = splitWord(goalWord)
  const result = []

  for (let i = 0; i < currentAttempt.length; i++) {
    if (goalLetters[currentAttempt[i]]) {
      goalLetters[currentAttempt[i]] -= 1

      if (goalWord[i] == currentAttempt[i]) {
        cells[i].classList.add('success')
        result.push('success')
      } else {
        cells[i].classList.add('intermediate')
        result.push('intermediate')
      }
    } else {
      cells[i].classList.add('incorrect')
      result.push('incorrect')
    }
  }
  return result
}
