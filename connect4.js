// console.log('project 1')

// Setup variables to access classes and ids to prepare functionalities
const board = document.querySelector(".board");
const playerTurn = document.getElementById("playerTurn");
const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("start-Game");
const winnerMessage = document.getElementById("winner-message");
// console.log(board);
// console.log(playerTurn);
// console.log(startScreen);
// console.log(startButton);
// console.log(winnerMessage);

// Setup game object, not working turned into array
let game = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
]
// console.log(game)

// Adding window.onload to load game after DOM content is loaded 
window.onload = startGame = async () => {

}