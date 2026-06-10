import { GameBoard } from './gameboard';

class Player {
  constructor(name) {
    this.name = name;
    this.board = new GameBoard();
  }
}

export { Player };
