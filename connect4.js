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
const alternateTurns = (min, max) =>
    Math.floor (Math.random() * (max-min)) + min;



// Access each row



// checkHori();

// Checks for vertical values
const checkVert = () => {

}

// Checks for diagonally values
const checkDiag = () => {

}


// Game status functions checks horizontal, vertical and diagonal values using a boolean expression matching the position with true if it is actually that position
const gameStatus = (row, column) => {
    return checkAdjacentRowValues(row)
    ? true
    : checkAdjacentRoColumnValues(column)
    ? true
    : checkAdjacentDiagonalValues(row, column)
    ? true
    : false;
};


// Placing checker at the exact point by accessing all the rows the findings using querySelector. Then create an if statement that that has decrement if the value is not equal to zero. Else, to add a currentPlayer where that row was selected. 
const placePiece = (startCount, columnVal) => {
    let rows = document.querySelectorAll(".grid-row");
    if (gameBoard[startCount][columnVal] != 0){
        startCount -= 1;
        placePiece(startCount, columnVal);
    } else {
        let currentRow = rows[startCount].querySelectorAll(".grid-box");
        currentRow[columnVal].classList.add("filled", `player${currentPlayer}`);
        if (winCheck(startCount, columnVal)) {
            message.innerHTML = `Player<span> ${currentPlayer}</span> wins`;
            startScreen.classList.remove("hide");
            return false;
        }
    }
    gameOver();
};
// console.log(placePiece)

// Checks if boxes are full after click
const boxFilled = (e) => {
    let columnVal = parseInt(e.target.getAttribute("data-value"));
    placePiece(5, columnVal);
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s turn`;
};
// console.log(currentPlayer)


// Make a function that would create the game board. Contains two loops 1) creates the arrays in the form of rows(6rows) 2) creates each element for each row (7 elements in each row). Finally append to ensure it is added to DOM
const gameBoardSetup = () => {
    for(let insideArr in gameBoard){
        let outerDiv = document.createElement("div");
        outerDiv.classList.add("grid-row");
        outerDiv.setAttribute("data-value", insideArr);
        // console.log(gameBoard[innerArray])
        for(let j in gameBoard[insideArr]){
            gameBoard[insideArr][j] = 0;
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

// Add window.onload using "async" and "await", so that my start menu would appear before the board does. Also, my message to appear who's turn is it currently.
window.onload = startGame = async () => {
    currentPlayer = alternateTurns(1,3);
    board.innerHTML = "";
    await gameBoardSetup();
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`
};
// console.log(startGame())

