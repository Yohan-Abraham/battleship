# Battleship

A browser-based implementation of the classic Battleship game built with vanilla JavaScript, featuring a ship placement phase, turn-based combat, and a computer opponent.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

🎮 **[Play Live](https://yohan-abraham.github.io/battleship/)**

---

## Features

- **Ship placement phase** — place 5 ships of varying lengths on your board with horizontal or vertical orientation
- **Live hover preview** — see exactly where your ship will land before placing, with valid/invalid highlighting
- **Turn-based combat** — attack the computer's board and watch hits and misses render in real time
- **Computer opponent** — randomized AI that attacks your board each turn
- **Win detection** — modal announcement when all of either side's ships are sunk
- **Play again** — restart the game without refreshing the page

---

## Built With

- **Vanilla JavaScript (ES6+)** — modular architecture with classes for Ship, GameBoard, and Player
- **Webpack** — module bundling and asset management
- **Jest** — unit tests covering core game logic
- **CSS Grid** — 10x10 game board layout
- **HTML5** — semantic structure throughout

---

## Architecture

The project follows a clear separation of concerns:

```
src/
├── index.js          # DOM rendering and event listeners
├── style.css
└── modules/
    ├── ship.js        # Ship class — tracks length, hits, and sunk state
    ├── gameboard.js   # GameBoard class — placement, attack logic, state
    ├── player.js      # Player class — wraps name and board
    └── gameController.js  # Game initialization and turn logic
```

Game logic lives entirely in the modules layer. The DOM layer in `index.js` only reads from and renders state — it never mutates it directly.

---

## Getting Started

```bash
git clone https://github.com/yohan-abraham/battleship.git
cd battleship
npm install
npm start
```

To run tests:

```bash
npm test
```

---

## How to Play

1. Enter your name
2. Select a direction (horizontal or vertical) and click squares to place your 5 ships
3. Click **Start Game** once all ships are placed
4. Attack the computer's board by clicking squares on the right
5. The computer attacks your board automatically after each turn
6. First player to sink all opponent ships wins

---

## Testing

Unit tests written with Jest cover the core game logic:

- Ship hit tracking and sunk detection
- GameBoard ship placement validation (out of bounds, overlapping)
- Attack handling — hits, misses, and invalid repeat attacks
- All ships sunk detection

---

*Built as part of [The Odin Project](https://www.theodinproject.com/) Full Stack JavaScript curriculum.*
