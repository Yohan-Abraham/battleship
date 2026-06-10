import { Player } from './player';

function initializeGame(name) {
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

export { initializeGame };
