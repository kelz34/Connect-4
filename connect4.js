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

let currentPlayer;

// Randomize player turn
const alternateTurns = (min, max) =>
    Math.floor (Math.random() * (max-min)) + min;

// This function checks to see if the currentPlayer has 4 in a row.
const verifyArray = (arrayElement) => {
    let bool = false;
    let elementCount = 0;
    arrayElement.forEach((element, index) => {
        if (element == currentPlayer) {
            elementCount += 1;
            if (elementCount == 4) {
                bool = true;
            }
        } else {
            elementCount = 0;
        }
    });
    return bool;
};

// This function checks to see if the game is over and if show winner on start screen window.
const gameOver = () => {
    let truthCount = 0;
    for (let innerArray of gameBoard) {
        if (innerArray.every((val) => val != 0)){
            truthCount += 1;
        } else {
            return false;
        }
    }
    if (truthCount == 6) {
        winnerMessage.innerText = "Game Over";
        startScreen.classList.remove("hide");
    }
};


// Checks for horizontal values
const checkAdjacentRowValues = (row) => {
    return verifyArray(gameBoard[row]);
};
// console.log(checkAdjacentRowValues);

// Checks for vertical values
const checkAdjacentColumnValues = (column) => {
    let colWinCount = 0,
    colWinBool = false;
    gameBoard.forEach((element, index) => {
        if(element[column] == currentPlayer){
            colWinCount += 1;
            if (colWinCount == 4) {
                colWinBool = true;
            }
        } else {
            colWinCount = 0;
        }
    })
    return colWinBool;
};


// Create a function the captures a win when the checkers are in a right diagonal alignment
const getRightDiagonal = (row, column, rowLength, columnLength) => {
    let rowCount = row;
    let columnCount = column;
    let rightDiagonal = [];
    while (rowCount > 0) {
        if (columnCount >= columnLength - 1){
            break;
        }
        rowCount -= 1;
        columnCount += 1;
        rightDiagonal.unshift(gameBoard[rowCount][columnCount]);
    }
   rowCount = row;
   columnCount = column;
   while(rowCount < rowLength){
    if(columnCount < 0){
        break;
    }
    rightDiagonal.push(gameBoard[rowCount][columnCount]);
    rowCount += 1;
    columnCount -= 1;
   }
   return rightDiagonal;
};

// Create a function the captures a win when the checkers are in a left diagonal alignment
const getLeftDiagonal = (row, column, rowLength, columnLength) => {
    let rowCount = row;
    let columnCount = column;
    let leftDiagonal = [];
    while (rowCount > 0){
        if (columnCount <= 0){
            break;
        }
        rowCount -= 1;
        columnCount -= 1;
        leftDiagonal.unshift(gameBoard[rowCount][columnCount]);
    }
   rowCount = row;
   columnCount = column;
   while(rowCount < rowLength){
    if(columnCount >= columnLength){
        break;
    }
    leftDiagonal.push(gameBoard[rowCount][columnCount]);
    rowCount += 1;
    columnCount += 1;
   }
   return leftDiagonal;
};

// Checks for diagonal values
const checkAdjacentDiagonalValues = (row, column) => {
    let diagWinBool = false;
    let tempChecks = {
        leftTop: [],
        rightTop: [],
    };
    let columnLength = gameBoard[row].length;
    let rowLength = gameBoard.length;

    tempChecks.leftTop = [
        ...getLeftDiagonal(row, column, rowLength, columnLength),
    ];

    tempChecks.rightTop = [
        ...getRightDiagonal(row, column, rowLength, columnLength),
    ];

    diagWinBool = verifyArray(tempChecks.rightTop);
    if (!diagWinBool) {
        diagWinBool = verifyArray(tempChecks.leftTop)
    }
    return diagWinBool;
};


// Game status functions checks horizontal, vertical and diagonal values using a boolean expression matching the position with true if it is actually that position
const gameStatus = (row, column) => {
    return checkAdjacentRowValues(row)
    ? true
    : checkAdjacentColumnValues(column)
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
        gameBoard[startCount][columnVal] = currentPlayer;
        if (gameStatus(startCount, columnVal)) {
            winnerMessage.innerHTML = `Player<span> ${currentPlayer}</span> wins!!!`;
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
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
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
    currentPlayer = alternateTurns(1, 3);
    board.innerHTML = "";
    await gameBoardSetup();
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
};
// console.log(startGame())

// Game window start menu  
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    startGame();
});