let currentPlayer = null;
let winner = null;
let roundStart = null;
let endRound = null;
let playerRotation = null;
let tableCells = document.querySelectorAll('td');
let playerTurn = document.getElementById('nextTurn');
let startRestartButton = document.getElementById('startAndRestart');
let playAgainButton = document.getElementById('playAgain');
let typeGame = document.getElementsByName('gameType');
let timer = document.getElementById('timer');
startRestartButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', playAgain);
playerTurn.textContent = '';

for (let i = 0; i < typeGame.length; i++) {
  typeGame[i].addEventListener('change', gameType);
}

function gameType() {
  if (document.querySelector('input[name="gameType"]:checked').value === 'PVC') {

    for (let i = 0; i < tableCells.length; i++) {
      tableCells[i].addEventListener('click', onClick);
    }

    function onClick() {
      if (this.textContent) {
        return;
      }

      this.textContent = 'X';

      if (checkingWinner()) {
        endRound = new Date();
        roundTime = endRound - roundStart;
        minutes = Math.floor(roundTime / 60000);
        seconds = Math.floor((roundTime - (minutes * 60000)) / 1000);
        winner = currentPlayer;
        alert('X' + ' Won The Game In ' + (minutes > 0 ? minutes + ' minute(s)' + ' and ' : '') + seconds + ' second(s)');
        playAgainButton.disabled = false;
        return;
      }

      if (checkingTie()) {
        endRound = new Date();
        roundTime = endRound - roundStart;
        minutes = Math.floor(roundTime / 60000);
        seconds = Math.floor((roundTime - (minutes * 60000)) / 1000);
        alert("tie! The game was done in " + (minutes > 0 ? minutes + ' minute(s)' + ' and ' : '') + seconds + ' second(s)');
        playAgainButton.disabled = false;
        return;
      }

      playerRotation = currentPlayer === 'X' ? 'O' : 'X';
      currentPlayer = 'X';
      playerTurn.textContent = "It's " + currentPlayer + "'s turn";
      AiMove();
    }

    function AiMove() {
      unusedCells = fillUnusedCells();
      if (winner !== null) {
        return;
      }

      if (unusedCells.length === 0) {
        return;
      }

      randomIndex = Math.floor(Math.random() * unusedCells.length);
      cellIndex = unusedCells[randomIndex];
      tableCells[cellIndex].textContent = 'O';

      if (checkingWinner()) {
        endRound = new Date();
        roundTime = endRound - roundStart;
        minutes = Math.floor(roundTime / 60000); // .floor used to return the greatest integer less than or equal to its numeric argument.
        seconds = Math.floor((roundTime - (minutes * 60000)) / 1000);
        winner = currentPlayer;
        alert('O (The Computer)' + ' Won The Game In ' +
          (minutes > 0 ? minutes + ' minute(s)' + ' and ' : '') + seconds + ' second(s)');
        playAgainButton.disabled = false;
        return;
      }

      if (checkingTie()) {
        endRound = new Date();
        roundTime = endRound - roundStart;
        minutes = Math.floor(roundTime / 60000);
        seconds = Math.floor((roundTime - (minutes * 60000)) / 1000);
        alert("tie! The game was done in  " + (minutes > 0 ? minutes + ' minute(s)' + ' and ' : '') + seconds + ' second(s)');
        playAgainButton.disabled = false;
        return;
      }
      playerRotation = currentPlayer === 'O' ? 'X' : 'X';
    }

    function checkingWinner() {
      return inspectTable(0, 0, 0, 1, 0, 2) ||
        inspectTable(1, 0, 1, 1, 1, 2) ||
        inspectTable(2, 0, 2, 1, 2, 2) ||
        inspectTable(0, 0, 1, 1, 2, 2) ||
        inspectTable(0, 2, 1, 1, 2, 0) ||
        inspectTable(0, 0, 1, 0, 2, 0) ||
        inspectTable(0, 1, 1, 1, 2, 1) ||
        inspectTable(0, 2, 1, 2, 2, 2);
    }

    function inspectTable(firstRow, firstColumn, secondRow, secondColumn, thirdRow, thirdColumn) {
      return tableCells[firstRow * 3 + firstColumn].textContent === playerRotation &&
        tableCells[secondRow * 3 + secondColumn].textContent === playerRotation &&
        tableCells[thirdRow * 3 + thirdColumn].textContent === playerRotation;
    }
  }
}

function fillUnusedCells() { // the AI will just flii in  any available cell that isn't filled
  unusedCells = [];
  for (i = 0; i < tableCells.length; i++) {
    if (tableCells[i].textContent === '') {
      unusedCells.push(i);
    }
  }
  return unusedCells;
}

function startGame() {
  for (let i = 0; i < tableCells.length; i++) {  // clear the table 
    tableCells[i].textContent = '';
    tableCells[i].addEventListener('click', onClick);
  }
  winner = null;
  currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
  playerTurn.textContent = "It's " + currentPlayer + "'s turn";
  playAgainButton.disabled = true;
  roundStart = new Date();
  endRound = null;
  timer.textContent = '00:00';
  setInterval(updateTimer, 1000); // 1000 miliseconds per second (increments during round)
}

function playAgain() {
  startGame();
}

function updateTimer() {
  if (roundStart && !endRound) { // if round has been started but the end of the round isn't defined yet
    roundTime = new Date() - roundStart;
    minutes = Math.floor(roundTime / 60000);
    seconds = Math.floor((roundTime - (minutes * 60000)) / 1000); //60000 miliseconds per minute
    timer.textContent = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  }
}

function onClick() {
  if (document.querySelector('input[name="gameType"]:checked').value === 'PVP') {
    if (this.textContent) {
      return;
    }

    this.textContent = currentPlayer;

    if (checkingWinner()) {
      winner = currentPlayer;
      endRound = new Date();
      roundTime = endRound - roundStart;
      minutes = Math.floor(roundTime / 60000);
      seconds = Math.floor((roundTime - (minutes * 60000)) / 1000);
      alert('O (The Computer)' + ' Won The Game In ' +
      (minutes > 0 ? minutes + ' minute(s)' + ' and ' : '') + seconds + ' second(s)');
      playAgainButton.disabled = false;
      return;
    }

    if (checkingTie()) {
      endRound = new Date();
      roundTime = endRound - roundStart;
      minutes = Math.floor(roundTime / 60000);
      seconds = Math.floor((roundTime - (minutes * 60000)) / 1000);
      alert("tie! The game was done in  " + (minutes > 0 ? minutes + ' minute(s)' + ' and ' : '') + seconds + ' second(s)');
      playAgainButton.disabled = false;
      return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = "It's " + currentPlayer + "'s turn";
  }
}

function checkingWinner() {
  return inspectTable(0, 0, 0, 1, 0, 2) ||
    inspectTable(1, 0, 1, 1, 1, 2) ||
    inspectTable(2, 0, 2, 1, 2, 2) ||
    inspectTable(0, 0, 1, 0, 2, 0) ||
    inspectTable(0, 0, 1, 1, 2, 2) ||
    inspectTable(0, 2, 1, 1, 2, 0) ||
    inspectTable(0, 1, 1, 1, 2, 1) ||
    inspectTable(0, 2, 1, 2, 2, 2);
}

function inspectTable(firstRow, firstColumn, secondRow, secondColumn, thirdRow, thirdColumn) {
  return tableCells[firstRow * 3 + firstColumn].textContent === currentPlayer &&
    tableCells[secondRow * 3 + secondColumn].textContent === currentPlayer &&
    tableCells[thirdRow * 3 + thirdColumn].textContent === currentPlayer;
}

function checkingTie() { // if all the cells are filled and the program has determined no tie or winner yet
  for (i = 0; i < tableCells.length; i++) {
    if (tableCells[i].textContent === '') {
      return false;
    }
  }
  return true;
}

