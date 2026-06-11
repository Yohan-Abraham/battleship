import { initializeGame, playerTurn } from './modules/gameController';
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
  //   console.log(player.board);
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
    if (players[1].board.allShipsSunk()) {
      alert(`${players[0].name} wins`);
      initializeDom();
    }
    //computer turn
    const playerBoard = document.querySelector(`#${players[0].name}`);
    const newPlayerBoard = createPlayerBoard(players[0].board);
    playerBoard.innerHTML = newPlayerBoard;
    if (players[0].board.allShipsSunk()) {
      alert(`${players[1].name} wins`);
      initializeDom();
    }
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

initializeDom();
