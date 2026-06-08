import { Ship } from '../modules/ship';

test('Ship is hit', () => {
  const ship = new Ship(4);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('Ship is sunk', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
