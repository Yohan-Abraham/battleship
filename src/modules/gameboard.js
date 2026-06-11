import { Ship } from './ship';

const BOARD_SIZE = 10;
class GameBoard {
  currentShips = 0;
  constructor() {
    this.board = Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(null));
  }

  placeShip(shipLength, coordinates, direction = 'horizontal', name) {
    const ship = new Ship(shipLength);
    const shipReference = {
      name: name,
      obj: ship,
    };
    this.currentShips++;
    if (direction === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        this.board[coordinates[0]][coordinates[1] + i] = shipReference;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < shipLength; i++) {
        this.board[coordinates[0] + i][coordinates[1]] = shipReference;
      }
    }
  }

  allShipsSunk() {
    return this.currentShips == 0 ? true : false;
  }

  receiveAttack(coordinates) {
    if (this.board[coordinates[0]][coordinates[1]] == null) {
      this.board[coordinates[0]][coordinates[1]] = 'miss';
      return this.board[coordinates[0]][coordinates[1]];
    }
    if (typeof this.board[coordinates[0]][coordinates[1]] == 'object') {
      this.board[coordinates[0]][coordinates[1]].obj.hit();
      if (this.board[coordinates[0]][coordinates[1]].obj.isSunk()) {
        this.currentShips--;
      }
      this.board[coordinates[0]][coordinates[1]] = 'hit';
      return this.board[coordinates[0]][coordinates[1]];
    }
    if (
      this.board[coordinates[0]][coordinates[1]] == 'miss' ||
      this.board[coordinates[0]][coordinates[1]] == 'hit'
    ) {
      return 'invalid';
    }
  }
}

export { GameBoard };
