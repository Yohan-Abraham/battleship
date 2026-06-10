import { initializeGame } from './modules/gameController';
import './style.css';

function createNavBar() {
  return `<nav>
      <div>BattleShip</div>
    </nav>`;
}

function createPlayerCard(player) {
  return `<div class="player-card">
        <div class="player-name">${player.name}</div>
        ${createPlayerBoard(player.board)}
      </div>`;
}

function createBoardCell(type) {
  return `<button class='board-cell' id='${type}' data-cell=0>

    </button>`;
}

function createPlayerBoard(player) {
  let string = ``;
  console.log(player.board);
  for (let i = 0; i < player.board.length; i++) {
    for (let j = 0; j < player.board.length; j++) {
      if (player.board[i][j] == 'hit') {
        string += createBoardCell('hit');
      } else if (player.board[i][j] == 'miss') {
        string += createBoardCell('miss');
      } else if (player.board[i][j] !== null) {
        string += createBoardCell('ship');
      } else {
        string += createBoardCell('water');
      }
    }
  }
  return `<div class="board">${string}</div>`;
}

//grid object contains [player, computer] array with
// name and game board
function createGameScreen(grid) {
  return `<div id="game-screen">
      ${createPlayerCard(grid[0])}
      ${createPlayerCard(grid[1])}
    </div>`;
}

function initializeDom() {
  const body = document.querySelector('body');
  const startingGrid = initializeGame();

  body.innerHTML = `
    ${createNavBar()}
    ${createGameScreen(startingGrid)}
    `;
}

initializeDom();
