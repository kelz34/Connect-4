// console.log('project 1')

// Setup variables to access classes and ids to prepare functionalities
const board = document.querySelector(".board");
const playerTurn = document.getElementById("playerTurn");
const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("start-game");
const winnerMessage = document.getElementById("winner-message");
// console.log(board, playerTurn, startScreen, startButton, winnerMessage);

// Setup game object, not working turned into array
let gameBoard = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
]

let gameOver = false;
let currentPlayer;

// Randomize player turn
const generateRandomNumber = (min, max) =>
    Math.floor (Math.random() * (max-min)) + min;



// Access each row
// for(let horiCheck in gameBoard) {
//     for (let j in gameBoard[horiCheck]){
//         // let horiConnect = gameBoard[horiCheck];
//         // const rowAccess = document.getAtt(grid-row);
//         // rowAccess.addEventListener("click");
//         // console.log(rowAccess)
//     };
// };
const getGridElementsPosition = (index) => {
    const gridEl = document.getElementsByClassName("board");
// console.log(gridEl)
let offset = Number(window.getComputedStyle(gridEl.children[0]).gridColumnStart) - 1;
// console.log(offset)
if (isNaN(offset)){
    offset = 0;
}
const colCount = window.getComputedStyle(gridEl).gridTemplateColumns.split(" ").length;

const rowPosition = Math.floor((index + offset) / colCount);
const colPosition = (index + offset) % colCount;

return { row: rowPosition, column: colPosition };
}

const getNodeIndex = (elm) => {
    let c = elm.parentNode.children,
    i = 0;
    for (; i < c.length; i++) if (c[i] == elm) return i;
}

const addClickEventsToGridItems = () => {
    let gridItems = document.getElementsByClassName("grid-box");
    for (let i = 0; i < gridItems.length; i++){
        gridItems[i].onclick = (e) => {
            let position = getGridElementsPosition(getNodeIndex(e.target));
            console.log(`Node position is row ${position.row}, column ${position.column}`);
        }
    }
}
addClickEventsToGridItems();

// Checks for horizontal values
const checkHori = () => {

}
// checkHori();

// Checks for vertical values
const checkVert = () => {

}

// Checks for diagonally values
const checkDiag = () => {

}


// Game over
const gameStatus = () => {

}

// Checks if boxes are full after click
const boxFilled = (event) => {
    
}



// Create skeleton of game structure
const gameBoardSetup = () => {
    for(let innerArray in gameBoard){
        let outerDiv = document.createElement("div");
        outerDiv.classList.add("grid-row");
        outerDiv.setAttribute("data-value", innerArray);
        // console.log(gameBoard[innerArray])
        for(let j in gameBoard[innerArray]){
            gameBoard[innerArray][j] = 0;
            // console.log(gameBoard[innerArray][j])
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("grid-box");
            innerDiv.setAttribute("data-value", j);
            innerDiv.addEventListener("click", (event) => {
                boxFilled(event);
            });
            outerDiv.appendChild(innerDiv);
        }
        board.appendChild(outerDiv);
    }
};
// console.log(gameBoardSetup())



// Adding window.onload to load game after DOM content is loaded 
window.onload = startGame = async () => {
    currentPlayer = generateRandomNumber(1,3);
    board.innerHTML = "";
    await gameBoardSetup();
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`
};
// console.log(startGame())

