import { Player } from './player';

function initializeGame(name = 'player', board) {
  const player = new Player();
  const computer = new Player();

  //player ships
  player.name = name;
  player.board = board;
  //computer ships
  computer.name = 'computer';
  computer.board = generateComputerBoard(computer.board);
  console.log(computer.board);
  return [player, computer];
}

function createPlayer() {
  return new Player();
}

function generateComputerBoard(board) {
  while (board.currentShips !== 5) {
    let direction = Math.floor(Math.random() * 2);
    if (direction == 0) {
      direction = 'horizontal';
    } else {
      direction = 'vertical';
    }
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    board.validatePlacement(board.getShipLength(), [row, col], direction);
    board.placeShip(board.getShipLength(), [row, col], direction, 'carrier');
  }
  return board;
}

function computerTurn(player) {
  let attackRow = Math.floor(Math.random() * 10);
  let attackCol = Math.floor(Math.random() * 10);
  let attack = player.receiveAttack([attackRow, attackCol]);
  while (attack == 'invalid') {
    attackRow = Math.floor(Math.random() * 10);
    attackCol = Math.floor(Math.random() * 10);
    attack = player.receiveAttack([attackRow, attackCol]);
  }
}

function playerTurn(player, row, col) {
  let attack = player[1].board.receiveAttack([row, col]);
  console.log(attack);
  if (attack === 'invalid') {
    return 'invalid';
  }
  if (player[1].board.allShipsSunk()) {
    return {
      result: attack,
      computerSunk: player[1].board.allShipsSunk() ? true : false,
      playerSunk: player[0].board.allShipsSunk() ? true : false,
      playerName: player[0].name,
    };
  } else {
    computerTurn(player[0].board);
  }
  return {
    result: attack,
    computerSunk: player[1].board.allShipsSunk() ? true : false,
    playerSunk: player[0].board.allShipsSunk() ? true : false,
    playerName: player[0].name,
  };
}

export { initializeGame, playerTurn, createPlayer };
