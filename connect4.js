// console.log('project 1')

// Setup variables to access classes and ids to prepare functionalities
const board = document.querySelector(".board");
const playerTurn = document.getElementById("playerTurn");
const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("start-game");
const winnerMessage = document.getElementById("winner-message");
// console.log(board);
// console.log(playerTurn);
// console.log(startScreen);
// console.log(startButton);
// console.log(winnerMessage);

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
// console.log(game)

// Randomize player turn
const generateRandomNumber = (min, max) => {
    Math.floor (Math.random() * (max-min)) + min;
}





// Create skeleton of game structure
const gameBoardSetup = () => {
    for(let innerArray in gameBoard){
        let outerDiv = document.createElement('div');
        outerDiv.classList.add("grid-row");
        outerDiv.setAttribute("data-value", innerArray);
        // console.log(gameBoard[innerArray])
        for(let j in gameBoard[innerArray]){
            gameBoard[innerArray][j] = 0;
            // console.log(gameBoard[innerArray][j])
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("grid-box");
            innerDiv.setAttribute("data-value", j);
            innerDiv.addEventListener("click", (e) => {
                fillBox(e);
            });
            outerDiv.appendChild(innerDiv);
        }
        board.appendChild(outerDiv);
    }
};
// console.log(gameBoardSetup())



// Adding window.onload to load game after DOM content is loaded 
window.onload = startGame = async () => {
    currentPlayer = generateRandomNumber(1,2);
    board.innerHTML = "";
    await gameBoardSetup();
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`
}
console.log(startGame())

