/*Declaration of variables*/ 
const firstNameInput = document.querySelector('.first-name')
const lastNameInput = document.querySelector('.last-name')
const countryInput = document.querySelector('.country')
const scoreInput = document.querySelector('.player-score')
const addPlayerButton = document.querySelector('.add-player')
const resultsDiv = document.querySelector('.results-conatiner')
const errorDiv = document.querySelector('.error')
/*Setting flag to check whether +5 or -5 is clicked*/ 
let addFlag = 0
let minusFlag = 0

/*Creating the player object to be displayed*/ 
let players = [{
    firstName: 'Mangalam',
    lastName: 'Krishnan',
    country: 'India',
    score:   60,
    time: 'February 4, 2020 13:20:42'
},
{

    firstName: 'Sharanya',
    lastName: 'Sanjay',
    country: 'Finland',
    score: 50,
    time: 'February 3, 2020 14:20:42'
},
{

    firstName: 'Sanjay',
    lastName: 'Jayaraman',
    country: 'Belgium',
    score: 40,
    time: 'February 2, 2020 15:20:42'


}]

/*Function to display the month in the time when the player is added*/ 
const getMonth = num => {
    let month = ''
    switch (num) {
        case 0:
            month = 'January'
            break;
        case 1:
            month = 'February'
            break;
        case 2:
            month = 'March'
            break;
        case 3:
            month = 'April'
            break;
        case 4:
            month = 'May'
            break;
        case 5:
            month = 'June'
            break;
        case 6:
            month = 'July'
            break;
        case 7:
            month = 'August'
            break;
        case 8:
            month = 'September'
            break;
        case 9:
            month = 'October'
            break;
        case 10:
            month = 'November'
            break;
        case 11:
            month = 'December'
            break;    
        default:
            month ='NoMonth'
            break;
    }
    return month
}
/*Function to display the date when the player is added*/ 
const dateToday = () => {
    const today = new Date()
    let monthNum = today.getMonth()
    let month = getMonth(monthNum)
    let date = today.getDate()
    let year = today.getFullYear()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()
    return (`${month} ${date}, ${year} ${hours}:${minutes}:${seconds}`)
     
}

/*Function to sort the players by the score*/ 
const sortByScore = (players) => {
    players.sort((a,b) => {
        if(a.score < b.score) return 1
        if(a.score > b.score) return -1
        return 0
    })
    return players
}

/*Function to display the player name and the time when the player is added*/ 
const createNameDiv = (playerDiv,firstName,lastName,time) => {
const nameDiv = document.createElement('div')
nameDiv.setAttribute('class','name-div')
const fullNameDiv = document.createElement('div')
fullNameDiv.setAttribute('class','full-name-div')
fullNameDiv.textContent = (firstName + ' ' + lastName).toUpperCase()
const timeDiv = document.createElement('div')
timeDiv.setAttribute('class','time-div')
timeDiv.textContent = time
nameDiv.appendChild(fullNameDiv)
nameDiv.appendChild(timeDiv)
playerDiv.appendChild(nameDiv)
}

/*Function to display the country of the player*/ 
const createCountryDiv = (playerDiv,country) => {
    const countryDiv = document.createElement('div')
countryDiv.setAttribute('class','country-div')
countryDiv.textContent = country
playerDiv.appendChild(countryDiv)
}

/*Function to display the score of the player*/
const createScoreDiv = (playerDiv,score) => {
const scoreDiv = document.createElement('div')
scoreDiv.setAttribute('class','score-div')
scoreDiv.textContent = score
playerDiv.appendChild(scoreDiv)

}

/*Function to delete the player*/ 
const deletePlayer = (firstName,lastName,country,score) => {
    const tempArray = []
    for(player of players) {
        if (!(player.firstName == firstName && player.lastName == lastName )) {
            tempArray.push(player)

        }
    }
    const delPlayer =sortByScore(tempArray)
    players = [...delPlayer]
    addPlayer(players)
}

/*Function to add or minus the scores*/ 
const addOrMinusScore = (firstName,lastName,score) => {
    for(player of players) {
        if(player.firstName == firstName && player.lastName == lastName) {
            if(addFlag == 1) {
                player.score = parseInt(score) + 5
            }
            if(minusFlag == 1) {
                player.score = parseInt(score) - 5
            }
        }
    }
    const sortedArray = sortByScore(players)
    players = [...sortedArray]
    addPlayer(players)
}
/*Function to add the delete, plus and minus buttons*/ 
const createDelAddDiv = (playerDiv,firstName,lastName,country,score) => {
    const delAddDiv = document.createElement('div')
delAddDiv.setAttribute('class','del-add-div')
const delButton = document.createElement('button')
delButton.setAttribute('class','del-button')
delButton.innerHTML = '<i class="fas fa-trash-alt"></i>'
//delButton.textContent = 'Del'
const plusButton = document. createElement('button')
plusButton.setAttribute('class','plus-button')
plusButton.textContent = '+5'
const minusButton = document.createElement('button')
minusButton.setAttribute('class','minus-button')
minusButton.textContent = '-5'
delAddDiv.appendChild(delButton)
delAddDiv.appendChild(plusButton)
delAddDiv.appendChild(minusButton)
playerDiv.appendChild(delAddDiv)
delButton.addEventListener('click',event => {
    playerDiv.textContent = ''
    deletePlayer(firstName,lastName,country,score)
})
plusButton.addEventListener('click',event => {
    addFlag =1
    minusFlag = 0
    playerDiv.textContent = ''
    addOrMinusScore(firstName,lastName,score)

})
minusButton.addEventListener('click',event => {
    minusFlag = 1
    addFlag = 0
    addOrMinusScore(firstName,lastName,score)
})
}

/*Function to add the player*/ 
const addPlayer = (sortedPlayers) => {
    resultsDiv.textContent = ''
    for(const player of sortedPlayers) {
    let{firstName,lastName,country,score,time} = player
const playerDiv = document.createElement('div')
playerDiv.setAttribute('class','player-div')
resultsDiv.appendChild(playerDiv)
createNameDiv(playerDiv,firstName,lastName,time)
createCountryDiv(playerDiv,country)
createScoreDiv(playerDiv,score)
createDelAddDiv(playerDiv,firstName,lastName,country,score)

    }
}

/*Function to give stylings to error message*/
const errorStyles = (errorMessage) => {

    errorDiv.textContent = ''
    errorDiv.style.display = 'block'
    errorDiv.style.color = 'red'
    errorDiv.textContent = errorMessage

}
/*Function to check whether the player exist or not*/ 
const playerDuplicate = (firstNameValue,lastNameValue) => {
    for (const player of players) {
        if((player.firstName == firstNameValue) && (player.lastName == lastNameValue)) {
            return true
        }
    }
    return false
}

/*Validation function to check whether the input is correct or not*/ 
const validateInputs = () => {
    let pattern1 = /^[A-Z]+$/ig
    let pattern2 = /^[0-9]+$/
    let firstNameValue = firstNameInput.value
    let lastNameValue = lastNameInput.value
    let countryValue = countryInput.value
    let scoreValue = scoreInput.value
    if(firstNameValue.length ==0 || lastNameValue.length ==0 || countryValue.length==0 || scoreValue.length==0) {
        let errorMessage = 'All fields are required'
        errorStyles(errorMessage)
    }
    else if (!(firstNameValue.match(pattern1)) || !(lastNameValue.match(pattern1)) || !(countryValue.match(pattern1))){
        let errorMessage = 'Please enter only alphabets'
        errorStyles(errorMessage)
    }
    else if(!(scoreValue.match(pattern2))) {
        let errorMessage = 'Please enter only digits'
        errorStyles(errorMessage)
    }
    else if(playerDuplicate(firstNameValue,lastNameValue)) {
        let errorMessage = 'Player already exists'
        errorStyles(errorMessage)
    }
    else {
        let time = dateToday()
        errorDiv.textContent = ''
        players.push({
            firstName:firstNameValue,
            lastName: lastNameValue,
            country: countryValue,
            score: scoreValue,
            time: time
        })
        const sortedPlayers = sortByScore(players)
        addPlayer(sortedPlayers)
    }
}

/*Event listener to add players*/ 
addPlayerButton.addEventListener('click', event => {
    validateInputs()  
})

/*Home page to display the default players*/ 
const sortedPlayers = sortByScore(players)
addPlayer(sortedPlayers)






