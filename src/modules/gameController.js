import { Player } from './player';

function initializeGame(name = 'player') {
  const player = new Player();
  const computer = new Player();

  //player ships
  player.name = name;
  player.board.placeShip(5, [0, 0], 'horizontal', 'carrier');
  player.board.placeShip(4, [2, 0], 'vertical', 'Battleship');
  player.board.placeShip(3, [3, 3], 'horizontal', 'cruiser');
  player.board.placeShip(3, [7, 0], 'horizontal', 'submarine');
  player.board.placeShip(2, [8, 0], 'vertical', 'destroyer');

  //computer ships
  computer.name = 'computer';
  computer.board.placeShip(5, [0, 0], 'horizontal', 'carrier');
  computer.board.placeShip(4, [2, 0], 'vertical', 'Battleship');
  computer.board.placeShip(3, [3, 3], 'horizontal', 'cruiser');
  computer.board.placeShip(3, [7, 0], 'horizontal', 'submarine');
  computer.board.placeShip(2, [8, 0], 'vertical', 'destroyer');
  return [player, computer];
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
  } else {
    computerTurn(player[0].board);
  }
  return attack;
}

export { initializeGame, playerTurn };
