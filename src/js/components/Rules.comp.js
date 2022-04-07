let $rules = document.getElementById('rules')
let $trigger = document.getElementById('help')
let $rulesClose = document.getElementById('rulesClose')

$trigger.addEventListener('click', (_) => {
  $rules.classList.add('visible')
})

$rulesClose.addEventListener('click', () => {
  $rules.classList.remove('visible')
})
