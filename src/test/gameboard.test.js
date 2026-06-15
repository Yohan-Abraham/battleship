import { experiments } from 'webpack';
import { GameBoard } from '../modules/gameboard';

test('Place ship on grid vertically', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'vertical', 'cruise');
  expect(game.board[0][0].obj).toEqual({
    hits: 0,
    length: 2,
    sunk: false,
  });
  expect(game.board[1][0].obj).toEqual({
    hits: 0,
    length: 2,
    sunk: false,
  });
});

test('Place ship on grid horizontally', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'horizontal', 'cruise');
  expect(game.board[0][0].obj).toEqual({
    hits: 0,
    length: 2,
    sunk: false,
  });
  expect(game.board[0][1].obj).toEqual({
    hits: 0,
    length: 2,
    sunk: false,
  });
});

test('Attack on coordinates', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'vertical', 'cruise');
  expect(game.receiveAttack([0, 0])).toBe('hit');
});

test('Attack on null', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'vertical', 'cruise');
  expect(game.receiveAttack([1, 1])).toBe('miss');
});

test('Attack on already played square', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'vertical', 'cruise');
  game.receiveAttack([0, 0]);
  expect(game.receiveAttack([0, 0])).toBe('invalid');
});

test('Attack on already missed square returns invalid', () => {
  const game = new GameBoard();

  game.receiveAttack([1, 1]);

  expect(game.receiveAttack([1, 1])).toBe('invalid');
});

test('Reports all ships sunk after all ship coordinates are hit', () => {
  const game = new GameBoard();

  game.placeShip(2, [0, 0], 'vertical', 'destroyer');

  game.receiveAttack([0, 0]);
  game.receiveAttack([1, 0]);

  expect(game.allShipsSunk()).toBe(true);
});

test('Reports all ships sunk false when ships are still on grid', () => {
  const game = new GameBoard();

  game.placeShip(2, [0, 0], 'vertical', 'destroyer');

  game.receiveAttack([0, 0]);

  expect(game.allShipsSunk()).toBe(false);
});

test('Cant place ships out of bounds', () => {
  const game = new GameBoard();
  expect(game.placeShip(2, [10, 12], 'vertical', 'destroyer')).toBe('invalid');
});

test('Cant place one ship over another', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'vertical', 'destroyer');
  expect(game.placeShip(2, [0, 0], 'vertical', 'destroyer')).toBe('invalid');
});

test('test validate placement out of bound', () => {
  const game = new GameBoard();

  expect(game.validatePlacement(2, [10, 12], 'vertical', 'destroyer')).toBe(
    false,
  );
});

test('test validate placement out of bound', () => {
  const game = new GameBoard();
  game.placeShip(2, [0, 0], 'horizontal', 'destroyer');
  expect(game.validatePlacement(2, [0, 0], 'horizontal', 'destroyer')).toBe(
    false,
  );
});
