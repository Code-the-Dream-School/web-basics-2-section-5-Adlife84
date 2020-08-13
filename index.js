
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.


//Global variable
const howManyShips = 4;

///Step 1: Create Players

// Create Player1 object 
let player1 = {
  name: '',
  shipCount: howManyShips,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};

// Create Player2 object
let player2 = {
  name: '',
  shipCount: howManyShips,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
};


// Ask user names of players 
askNamePlayers = () => {
  player1.name = prompt("Give me name a first player.");
  player2.name = prompt("Give me name a second second player.")
}

askNamePlayers();

//Function that generate random 4 ships on the player board. Pass player object into the function
addShipsToBoard = (player) => {
  console.log(player.gameBoard);
  //Reset game board all cells for 0
  player.gameBoard.map(element => element * 0);
  console.log(player.gameBoard);
  //Generate a random number from 0 to 3
  genRandomNum = () => {
    //return Math.floor(Math.random() * (max - min + 1) + min);
    return Math.floor(Math.random() * 4);
  }

  for (let i = 0; i < player.shipCount; i++) {
    let x = genRandomNum();
    let y = genRandomNum();

    if (player.gameBoard[x][y] !== 1) {
      player.gameBoard[x][y] = 1
    } else {
      i--;
    };
  }
  console.log(player.gameBoard);
};

//Generate ships on the board for each player
addShipsToBoard(player1);
addShipsToBoard(player2);

//Show gameBoard of player in console
console.log(player1.gameBoard);
console.log(player2.gameBoard);



// Get element from html 
const board_Player1 = document.getElementById('board_player1');
const board_Player2 = document.getElementById('board_player2');
const resetButton = document.getElementById('resetBtn'); // Reset button 
const newButton = document.getElementById('newGameBtn'); // New game button
let infoBoard = document.getElementById('infoBoard'); // info board
let turn_Player = document.getElementById('turn_player');
let currentPlayer = player1;
let loser = player2;
let strike;
let roundCounter = 0;


//Change turn name player
turn_Player.textContent = currentPlayer.name;


//Player 1 Dashboard
const name_player1 = document.getElementById('name_player1');
const playerBoard1 = document.getElementById('player1');


name_player1.textContent = player1.name;

let ships_player1 = document.getElementById('ships_player1');


//Player 2 Dashboard
const name_player2 = document.getElementById('name_player2');
const playerBoard2 = document.getElementById('player2');

name_player2.textContent = player2.name;

let ships_player2 = document.getElementById('ships_player2');


//Reset game function
resetGame = () => {
  currentPlayer = player1;
  board_Player1.innerHTML = '';
  board_Player2.innerHTML = '';

  name_player1.textContent = player1.name;
  name_player2.textContent = player2.name;

  player1.shipCount = howManyShips;
  player2.shipCount = howManyShips;

  askNamePlayers();

  addShipsToBoard(player1);
  addShipsToBoard(player2);

  renderBoard(board_Player1);
  renderBoard(board_Player2);
}

// New game function
newGame = () => {
  console.log('Click new game');
  currentPlayer = player1;
  board_Player1.innerHTML = '';
  board_Player2.innerHTML = '';

  name_player1.textContent = player1.name;
  name_player2.textContent = player2.name;

  //Set counter of ships 1 or 100
  player1.shipCount = howManyShips;
  player2.shipCount = howManyShips;

  addShipsToBoard(player1); //Add ships on the board for Player 1
  addShipsToBoard(player2); //Add ships on the board for Player 2

  renderBoard(board_Player1); //Render new player1 board on the DOM
  renderBoard(board_Player2); //Render new player1 board on the DOM
}

// Add Event Listner for buttons reset game and new game
resetButton.addEventListener('click', resetGame);
newButton.addEventListener('click', newGame);


//Declaration function Color board wich is active now
colorBoard = (currentPlayer) => {
  if (currentPlayer === player1) {
    playerBoard1.classList.remove('activePlayer');
    playerBoard2.classList.add('activePlayer');
  } else {
    playerBoard2.classList.remove('activePlayer');
    playerBoard1.classList.add('activePlayer');
  }
}

//Declaration function Determine if the Player Sunk their Opponent's Ship
didYouHitShip = (player, strikeX, strikeY, cell) => {

  if (player.gameBoard[strikeX][strikeY] === 1) {
    alert("Congratulation! You hit a ship! :)");
    infoBoard.textContent = "Congratulation! You hit a ship! :)";
    player.gameBoard[strikeX][strikeY] = 0; //remove ship from the board
    player.shipCount--; //Decrise shipCounter
    //change color cell for red
    cell.style.background = "red";
    cell.style.border = "2px solid red";
  } else {
    infoBoard.textContent = "Sorry you miss. Maybe next time. :(";
    // cell.style.background = "purple";
    cell.style.visibility = 'hidden';
  }
}

//Change active board
colorBoard(currentPlayer);


//This function create player board in the DOM
renderBoard = (player) => {
  for (var x = 0; x < 4; x++) {

    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell


      //this function adds the click event to each cell
      cell.addEventListener('click', (e) => {

        let cell = e.target; // get the element clicked
        // console.log(cell.textContent);
        //display the coordinates in the console
        // cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
        // console.log(player.id);

        //Get coordinate cell -> Convert cell.textContent from string to array of numbers
        strike = cell.textContent.split(',').map(element => parseInt(element));


        // gameLogicTest(player, cell);


        gameLogic(player, cell);

        //Sound effect onClick
        var snd = new Audio("file.wav"); // buffers automatically when created
        snd.play();

      });

      li.appendChild(cell); //adding each cell into the row number x
    }

    player.appendChild(li); //adding each row into the board
  }

};


//Main logic of game
gameLogic = (player, cell) => {
  if (player.id === "board_player1" && currentPlayer === player2) {
    didYouHitShip(player1, strike[0], strike[1], cell);
    if (player1.shipCount > 0) {
      currentPlayer = player1;
    } else {
      alert(`You Win:  ${player2.name}`);
      resetGame(); //reset game
    }

  } else if (player.id === "board_player2" && currentPlayer === player1) {
    didYouHitShip(player2, strike[0], strike[1], cell);
    if (player2.shipCount > 0) {
      currentPlayer = player2
    } else {
      alert(`You Win:  ${player1.name}`);
      resetGame(); //reset game
    }

  } else {
    alert("It is wrong board, please click on your opponent board");
  }

  //Change name of current player on the DOM
  turn_Player.textContent = currentPlayer.name;

  //Change active board
  colorBoard(currentPlayer);

  //Change counter of ships in the DOM 
  ships_player1.textContent = player1.shipCount;
  ships_player2.textContent = player2.shipCount;

  console.log(currentPlayer.name);
  roundCounter++;
  console.log("GameLogic roundCounter: ", roundCounter);
};




renderBoard(board_Player1);
renderBoard(board_Player2);















