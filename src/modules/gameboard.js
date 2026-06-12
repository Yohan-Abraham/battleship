import { Ship } from './ship';

const BOARD_SIZE = 10;
class GameBoard {
  currentShips = 0;
  constructor() {
    this.board = Array(BOARD_SIZE)
      .fill()
      .map(() => Array(BOARD_SIZE).fill(null));
  }

  validatePlacement(length, coordinates, direction) {
    const [startRow, startCol] = coordinates;

    for (let i = 0; i < length; i++) {
      const row = direction === 'vertical' ? startRow + i : startRow;
      const col = direction === 'horizontal' ? startCol + i : startCol;

      if (row < 0 || row >= 10 || col < 0 || col >= 10) {
        return false;
      }

      if (this.board[row][col] !== null) {
        return false;
      }
    }

    return true;
  }

  getShipLength() {
    if (this.currentShips == 0) {
      return 5;
    }
    if (this.currentShips == 1) {
      return 4;
    }
    if (this.currentShips == 2 || this.currentShips == 3) {
      return 3;
    }
    if (this.currentShips == 4) {
      return 2;
    } else {
      return 'startGame';
    }
  }

  placeShip(shipLength, coordinates, direction = 'horizontal', name) {
    if (!this.validatePlacement(shipLength, coordinates, direction)) {
      return 'invalid';
    }
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
    return 'placed';
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
