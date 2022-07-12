const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0 , 1 , 2],
    [3 , 4 , 5],
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6],
]
const cellElements = document.querySelectorAll('[data-cell]')
const game = document.getElementById ('game')
const winningElements = document.getElementById ('winning')
const restartButton = document.getElementById('restartButton')
const winningTextElements = document.querySelector('[data-winning-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setGameHoverClass()
    winningElements.classList.remove('show')
}


function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell , currentClass)
    if (checkWin(currentClass)){
       endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setGameHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningTextElements.innerText = 'Draw! '
    } else {
        winningTextElements.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningElements.classList.add(`show`)
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}
function setGameHoverClass(){
    game.classList.remove(X_CLASS)
    game.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
        game.classList.add(CIRCLE_CLASS)
    } else {
        game.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}