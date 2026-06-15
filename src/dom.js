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

function showWinModal(winnerName) {
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.innerHTML = `
    <div class="modal">
      <h2>Game Over</h2>
      <p>${winnerName} wins the battle!</p>
      <button id="play-again">Play Again</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.querySelector('#play-again').addEventListener('click', () => {
    overlay.remove();
    startPage();
  });
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
      showWinModal(attack.playerName);
      return;
    }
    if (attack.playerSunk) {
      showWinModal('computer');
      return;
    }
    //computer turn
    const playerBoard = document.querySelector(`#${players[0].name}`);
    const newPlayerBoard = createPlayerBoard(players[0].board);
    playerBoard.innerHTML = newPlayerBoard;
  });
}

function initializeDom(name, playerBoard) {
  const body = document.querySelector('body');
  const startingGrid = initializeGame(name, playerBoard);

  body.innerHTML = `
    ${createNavBar()}
    ${createGameScreen(startingGrid)}
    `;
  setupEventListeners(startingGrid);
}

function previewShip(shipLength, row, col, direction, temp) {
  const valid = temp.board.validatePlacement(shipLength, [row, col], direction);

  for (let i = 0; i < shipLength; i++) {
    const previewRow = direction === 'vertical' ? row + i : row;
    const previewCol = direction === 'horizontal' ? col + i : col;

    const square = document.querySelector(
      `[data-row="${previewRow}"][data-col="${previewCol}"]`,
    );

    if (!square) continue;

    square.classList.add(valid ? 'preview-valid' : 'preview-invalid');
  }
}

function removePreview(shipLength, row, col, direction) {
  for (let i = 0; i < shipLength; i++) {
    const previewRow = direction === 'vertical' ? row + i : row;
    const previewCol = direction === 'horizontal' ? col + i : col;

    const square = document.querySelector(
      `[data-row="${previewRow}"][data-col="${previewCol}"]`,
    );

    if (!square) continue;

    square.classList.remove('preview-valid', 'preview-invalid');
  }
}

function startPageListeners(temp) {
  function checkStartReady() {
    const name = document.querySelector('#playerName');
    const startBtn = document.querySelector('#start-game');
    const allPlaced = temp.board.currentShips === 5;
    const hasName = name.value.trim() !== '';

    if (allPlaced && hasName) {
      startBtn.classList.add('ready');
      startBtn.disabled = false;
    } else {
      startBtn.classList.remove('ready');
      startBtn.disabled = true;
    }
  }

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

    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    const currentDirection = direction.textContent.toLowerCase();
    const shipLength = temp.board.getShipLength();

    previewShip(shipLength, row, col, currentDirection, temp);
  });

  playerboard.addEventListener('mouseout', (e) => {
    if (!e.target.classList.contains('board-cell')) return;

    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    const currentDirection = direction.textContent.toLowerCase();
    const shipLength = temp.board.getShipLength();

    removePreview(shipLength, row, col, currentDirection);
  });

  playerboard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('board-cell')) return;

    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    const currentDirection = direction.textContent.toLowerCase();
    const shipLength = temp.board.getShipLength();

    const result = temp.board.placeShip(
      shipLength,
      [row, col],
      currentDirection,
      'ship',
    );

    if (result === 'invalid') return;
    const name = document.querySelector('#playerName');
    playerboard.innerHTML = createPlayerBoard(temp.board);
    checkStartReady();
  });

  document
    .querySelector('#playerName')
    .addEventListener('input', checkStartReady);

  document.querySelector('#start-game').addEventListener('click', () => {
    const name = document.querySelector('#playerName');
    initializeDom(name.value, temp.board);
  });
}

function startPage() {
  const body = document.querySelector(`body`);
  const temp = createPlayer();
  body.innerHTML = `${createNavBar()}
  <div id="playerProfile">
  <div><h3>Whats your name, Admiral?</h3></div>
  <div><input id="playerName" placeholder='Garp' required></div>
    <div id='placement'>Place your ships</div>
    <div>Direction: <button id='direction'>Horizontal</button></div>
    <div class='board'>
        ${createPlayerBoard(temp.board)}
    </div>
    <button id="start-game" disabled>Start Game</button>
  </div>
  `;

  startPageListeners(temp);
}

startPage();
