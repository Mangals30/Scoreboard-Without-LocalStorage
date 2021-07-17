const playersInfo = document.querySelector('.players-info')
const addButton = document.querySelector('.btn')
const userFirstName = document.querySelector('.first-name')
const userLastName = document.querySelector('.last-name')
const userCountry = document.querySelector('.country')
const userScore = document.querySelector('.player-score')
const errorMsg = document.querySelector('.error-msg')
const borders = document.querySelectorAll('.bdr')
sortPlayers(players)
for (const player of players) {
  displayPlayers(playersInfo, player)
}

addButton.addEventListener('click', e => {
  e.preventDefault()
  let firstName = userFirstName.value.trim()
  let lastName = userLastName.value.trim()
  let country = userCountry.value.trim()
  let score = userScore.value.trim()
  let obj = {
    firstName,
    lastName,
    country,
    score
  }
  let valid = validatePlayer(obj)
  let {
    isValid,
    msg,
    field
  } = valid
  if (isValid) {
    errorMsg.style.display = 'none'
    removeBdrStyles(borders)
    addPlayer(playersInfo, obj)
    removeInputs(borders)
  } else {
    removeBdrStyles(borders)
    errorMsg.textContent = msg
    if (field == 'names') {
      let firstNameEl = document.getElementsByClassName('first-name')
      for (let i = 0; i < firstNameEl.length; i++) {
        firstNameEl[i].style.border = '1px solid red'
      }
      let lastNameEl = document.getElementsByClassName('last-name')
      for (let i = 0; i < lastNameEl.length; i++) {
        lastNameEl[i].style.border = '1px solid red'
      }
    } else {
      let elements = document.getElementsByClassName(field)
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.border = '1px solid red'
      }
    }
  }

})