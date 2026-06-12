import {
  initializeGame,
  playerTurn,
  createPlayer,
} from './modules/gameController';
import './style.css';

function createNavBar() {
  return `<nav>
      <div>BattleShip</div>
    </nav>`;
}

function createPlayerCard(player) {
  return `<div class="player-card">
        <div class="player-name">${player.name}</div>
        <div class="board" id="${player.name}">
        ${createPlayerBoard(player.board)}</div>
      </div>`;
}

function createBoardCell(type, row, col) {
  return `<button class='board-cell ${type}' data-row='${row}' data-col='${col}'></button>`;
}

function createPlayerBoard(player) {
  let string = ``;
  for (let i = 0; i < player.board.length; i++) {
    for (let j = 0; j < player.board.length; j++) {
      if (player.board[i][j] == 'hit') {
        string += createBoardCell('hit', i, j);
      } else if (player.board[i][j] == 'miss') {
        string += createBoardCell('miss', i, j);
      } else if (player.board[i][j] !== null) {
        string += createBoardCell('ship', i, j);
      } else {
        string += createBoardCell('water', i, j);
      }
    }
  }
  return `${string}`;
}

//grid object contains [player, computer] array with
// name and game board
function createGameScreen(grid) {
  return `<div id="game-screen">
      ${createPlayerCard(grid[0])}
      ${createPlayerCard(grid[1])}
    </div>`;
}

//work on player attacking logic
function setupEventListeners(players) {
  const computerBoard = document.querySelector('#computer');
  computerBoard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('board-cell')) return;
    let row = Number(e.target.dataset.row);
    let col = Number(e.target.dataset.col);
    const attack = playerTurn(players, row, col);
    if (attack == 'invalid') {
      return;
    }
    const computerBoard = document.querySelector('#computer');
    const newComputerBoard = createPlayerBoard(players[1].board);
    computerBoard.innerHTML = newComputerBoard;
    if (attack.computerSunk) {
      alert(`${attack.playerName} wins`);
    }
    if (attack.playerSunk) {
      alert(`computer wins`);
    }
    //computer turn
    const playerBoard = document.querySelector(`#${players[0].name}`);
    const newPlayerBoard = createPlayerBoard(players[0].board);
    playerBoard.innerHTML = newPlayerBoard;
  });
}

function initializeDom() {
  const body = document.querySelector('body');
  const startingGrid = initializeGame();

  body.innerHTML = `
    ${createNavBar()}
    ${createGameScreen(startingGrid)}
    `;
  setupEventListeners(startingGrid);
}

function startPageListeners(temp) {
  const direction = document.querySelector('#direction');
  direction.addEventListener('click', () => {
    if (direction.textContent == 'Horizontal') {
      direction.textContent = 'Vertical';
    } else {
      direction.textContent = 'Horizontal';
    }
  });

  const playerboard = document.querySelector('.board');

  playerboard.addEventListener('mouseover', (e) => {
    if (!e.target.classList.contains('board-cell')) return;

    function displayShip(shipLength, row, col, direction) {
      const valid = temp.board.validatePlacement(
        shipLength,
        [row, col],
        direction,
      );

      for (let i = 0; i < shipLength; i++) {
        const previewRow = direction === 'vertical' ? row + i : row;
        const previewCol = direction === 'horizontal' ? col + i : col;

        const square = document.querySelector(
          `[data-row="${previewRow}"][data-col="${previewCol}"]`,
        );

        if (!square) continue;

        square.style.backgroundColor = valid ? 'white' : 'red';
      }
    }

    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    const currentDirection = direction.textContent.toLowerCase();
    if (temp.board.currentShips == 0) {
      displayShip(5, row, col, currentDirection);
    }
    if (temp.board.currentShips == 1) {
      displayShip(4, row, col, currentDirection);
    }
    if (temp.board.currentShips == 2 || temp.board.currentShips == 3) {
      displayShip(5, row, col, currentDirection);
    }
    if (temp.board.currentShips == 4) {
      displayShip(2, row, col, currentDirection);
    }
  });

  playerboard.addEventListener('mouseout', (e) => {
    if (!e.target.classList.contains('board-cell')) return;

    function removeDisplay(shipLength, row, col, direction) {
      for (let i = 0; i < shipLength; i++) {
        const previewRow = direction === 'vertical' ? row + i : row;
        const previewCol = direction === 'horizontal' ? col + i : col;

        const square = document.querySelector(
          `[data-row="${previewRow}"][data-col="${previewCol}"]`,
        );

        if (!square) continue;

        square.style.backgroundColor = '#162033';
      }
    }

    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    const currentDirection = direction.textContent.toLowerCase();
    if (temp.board.currentShips == 0) {
      removeDisplay(5, row, col, currentDirection);
    }
    if (temp.board.currentShips == 1) {
      removeDisplay(4, row, col, currentDirection);
    }
    if (temp.board.currentShips == 2 || temp.board.currentShips == 3) {
      removeDisplay(5, row, col, currentDirection);
    }
    if (temp.board.currentShips == 4) {
      removeDisplay(2, row, col, currentDirection);
    }
  });

  playerboard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('board-cell')) return;
    let row = Number(e.target.dataset.row);
    let col = Number(e.target.dataset.col);
  });
}

function startPage() {
  const body = document.querySelector(`body`);
  const temp = createPlayer();
  body.innerHTML = `${createNavBar()}
  <div id="playerProfile">
  <div><h3>Whats your name, Admiral?</h3></div>
  <div><input id="playerName" placeholder='Garp'></div>
    <div id='placement'>Place your ships</div>
    <div>Direction: <button id='direction'>Horizontal</button></div>
    <div class='board'>
        ${createPlayerBoard(temp.board)}
    </div>
  </div>
  `;

  startPageListeners(temp);
}

startPage();
