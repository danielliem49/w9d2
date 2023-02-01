/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const MoveError = __webpack_require__(/*! ./moveError */ \"./src/moveError.js\");\n\nclass Board {\n  constructor() {\n    this.grid = Board.makeGrid();\n  }\n\n  isEmptyPos(pos) {\n    if (!Board.isValidPos(pos)) {\n      throw new MoveError('Is not valid position!');\n    }\n\n    return (this.grid[pos[0]][pos[1]] === null);\n  }\n\n  isOver() {\n    if (this.winner() != null) {\n      return true;\n    }\n\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        if (this.isEmptyPos([rowIdx, colIdx])) {\n          return false;\n        }\n      }\n    }\n\n    return true;\n  }\n\n  placeMark(pos, mark) {\n    if (!this.isEmptyPos(pos)) {\n      throw new MoveError('Is not an empty position!');\n    }\n\n    this.grid[pos[0]][pos[1]] = mark;\n  }\n\n  print() {\n    const strs = [];\n    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {\n      const marks = [];\n      for (let colIdx = 0; colIdx < 3; colIdx++) {\n        marks.push(\n          this.grid[rowIdx][colIdx] ? this.grid[rowIdx][colIdx] : \" \"\n        );\n      }\n      strs.push(`${marks.join('|')}\\n`);\n    }\n\n    console.log(strs.join('-----\\n'));\n  }\n\n  winner() {\n    const posSeqs = [\n      // horizontals\n      [[0, 0], [0, 1], [0, 2]],\n      [[1, 0], [1, 1], [1, 2]],\n      [[2, 0], [2, 1], [2, 2]],\n      // verticals\n      [[0, 0], [1, 0], [2, 0]],\n      [[0, 1], [1, 1], [2, 1]],\n      [[0, 2], [1, 2], [2, 2]],\n      // diagonals\n      [[0, 0], [1, 1], [2, 2]],\n      [[2, 0], [1, 1], [0, 2]]\n    ];\n\n    for (let i = 0; i < posSeqs.length; i++) {\n      const winner = this.winnerHelper(posSeqs[i]);\n      if (winner != null) {\n        return winner;\n      }\n    }\n\n    return null;\n  }\n\n  winnerHelper(posSeq) {\n    for (let markIdx = 0; markIdx < Board.marks.length; markIdx++) {\n      const targetMark = Board.marks[markIdx];\n      let winner = true;\n      for (let posIdx = 0; posIdx < 3; posIdx++) {\n        const pos = posSeq[posIdx];\n        const mark = this.grid[pos[0]][pos[1]];\n\n        if (mark != targetMark) {\n          winner = false;\n        }\n      }\n\n      if (winner) {\n        return targetMark;\n      }\n    }\n\n    return null;\n  }\n\n  static isValidPos(pos) {\n    return (0 <= pos[0]) &&\n    (pos[0] < 3) &&\n    (0 <= pos[1]) &&\n    (pos[1] < 3);\n  }\n\n  static makeGrid() {\n    const grid = [];\n\n    for (let i = 0; i < 3; i++) {\n      grid.push([]);\n      for (let j = 0; j < 3; j++) {\n        grid[i].push(null);\n      }\n    }\n\n    return grid;\n  }\n}\n\nBoard.marks = ['x', 'o'];\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\nconst MoveError = __webpack_require__(/*! ./moveError */ \"./src/moveError.js\");\n\nclass Game {\n  constructor() {\n    this.board = new Board();\n    this.currentPlayer = Board.marks[0];\n  }\n\n  isOver() {\n    return this.board.isOver();\n  }\n\n  playMove(pos) { // pos should be [x, y]\n    console.log(`playmove pos: ${pos}`)\n    this.board.placeMark(pos, this.currentPlayer);\n    this.swapTurn();\n  }\n\n  promptMove(reader, callback) {\n    const game = this;\n\n    this.board.print();\n    console.log(`Current Turn: ${this.currentPlayer}`);\n\n    reader.question('Enter rowIdx: ', rowIdxStr => {\n      const rowIdx = parseInt(rowIdxStr);\n      reader.question('Enter colIdx: ', colIdxStr => {\n        const colIdx = parseInt(colIdxStr);\n        callback([rowIdx, colIdx]);\n      });\n    });\n  }\n\n  run(reader, gameCompletionCallback) {\n    this.promptMove(reader, move => {\n      try {\n        this.playMove(move);\n      } catch (e) {\n        if (e instanceof MoveError) {\n          console.log(e.msg);\n        } else {\n          throw e;\n        }\n      }\n\n      if (this.isOver()) {\n        this.board.print();\n        if (this.winner()) {\n          console.log(`${this.winner()} has won!`);\n        } else {\n          console.log('NO ONE WINS!');\n        }\n        gameCompletionCallback();\n      } else {\n        // continue loop\n        this.run(reader, gameCompletionCallback);\n      }\n    });\n  }\n\n  swapTurn() {\n    if (this.currentPlayer === Board.marks[0]) {\n      this.currentPlayer = Board.marks[1];\n    } else {\n      this.currentPlayer = Board.marks[0];\n    }\n  }\n\n  winner() {\n    return this.board.winner();\n  }\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// assigning classes from other script files to variables\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst View = __webpack_require__(/*! ./ttt-view.js */ \"./src/ttt-view.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => { // when the document-content is loaded\n  // making instances of the above classes\n  const containerElement = document.querySelector('.ttt')\n  const game = new Game();\n  new View(game, containerElement);\n\n}); \n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moveError.js":
/*!**************************!*\
  !*** ./src/moveError.js ***!
  \**************************/
/***/ ((module) => {

eval("\nconst MoveError = function (msg) { this.msg = msg; };\n\n// MoveError really should be a child class of the built in Error object provided\n// by Javascript, but since we haven't covered inheritance yet, we'll just\n// let it be a vanilla Object for now!\n\nmodule.exports = MoveError;\n\n\n//# sourceURL=webpack:///./src/moveError.js?");

/***/ }),

/***/ "./src/ttt-view.js":
/*!*************************!*\
  !*** ./src/ttt-view.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\nclass View {\n  constructor(game, element) {\n    this.game = game;\n    this.element = element;// the ttt container\n    this.playing = true;\n\n    this.setupBoard() // render the board on the browser\n    this.handleClick = this.handleClick.bind(this);\n    this.bindEvents()\n    this.renderCurrentPlayer(this.game.currentPlayer)\n\n  }\n\n  renderCurrentPlayer(player){\n    // set the document\n    const targetH5 = document.querySelector('.current-player')\n    targetH5.textContent = `Current player: ${player}`\n  }\n\n  setupBoard() {\n    // sets the container's styling\n    const board = document.createElement(\"ul\");\n    board.style.display = \"flex\";\n    board.style.width = \"300px\";\n    board.style.height = \"300px\";\n    board.style.flexWrap = \"wrap\";\n    board.style.listStyleType = \"none\";\n\n    // for every cell in the tic-tac-toe 3x3 box, its creating a cell with dimensions that would fit the container\n    for (let i = 0; i < 9; i++) { // making the li cells\n      const cell = document.createElement(\"li\");\n    \n      cell.style.width = \"98px\";\n      cell.style.height = \"100px\";\n\n      // setting cell style\n      cell.style.backgroundColor = \"gray\";\n      cell.style.border = \"1px solid black\";\n\n      // setting cell position\n      if ( i < 3 ) { // row 0\n        cell.dataset.position = JSON.stringify([0, i])\n      } else if (i > 2 && i < 6) { // row 1\n        cell.dataset.position = JSON.stringify([1, i - 3])\n      } else if (i > 5) { // row 2\n        cell.dataset.position = JSON.stringify([2, i - 6])\n      }\n\n      cell.addEventListener(\"mouseenter\", () => {\n\n        if (cell.style.backgroundColor !== \"white\") {\n          cell.style.backgroundColor = \"yellow\";\n        }\n      });\n\n      cell.addEventListener(\"mouseleave\", () => {\n        if (cell.style.backgroundColor !== \"white\") {\n          cell.style.backgroundColor = \"gray\";\n        }\n      });\n\n      // pushing the newly created cell to the board\n      board.appendChild(cell);\n    }\n    this.element.appendChild(board);\n  }\n\n  bindEvents() {\n    this.element.addEventListener(\"click\", this.handleClick); // event listeners auto invoke the function with e\n  }\n\n  handleClick(e) { // e == THE event object\n    if (this.playing) {\n      const position = e.target.dataset.position;\n      console.log(e.target);\n\n      \n      if(!e.target.textContent) {\n        // styling the cell\n        e.target.style.backgroundColor = \"white\";\n        e.target.style.fontSize = \"100px\";\n        e.target.textContent = this.game.currentPlayer; // this fills the cell with the current player\n      }\n      \n      this.game.playMove(JSON.parse(position)); // raw game logic / backend shit\n      this.renderCurrentPlayer(this.game.currentPlayer); // handles the current player label\n\n      // when game is over, make a giant label saying current player won\n      if (this.game.board.isOver()) {\n        this.playing = false\n        console.log(\"Someone won\")\n\n        // render the current player winning screen (a giant label on the bottom)\n        const winningLabel = document.createElement(\"h1\")\n        winningLabel.height = 100\n        winningLabel.width = 300\n        winningLabel.style.fontSize = \"100px\";\n        // if (this.game.currentPlayer === \"x\") {\n        //   winningLabel.textContent = `O WINS!`\n        // } else if (this.game.currentPlayer === \"o\"){\n        //   winningLabel.textContent = `X WINS!`\n        // } else{\n        //   winningLabel.textContent = `Nobody wins and you both`;\n        // }\n\n        const winner = this.game.board.winner();  \n        if (winner === null) {\n          winningLabel.textContent = \"nobody wins, yall suck hard\"\n        } else {\n          winningLabel.textContent = `THE WINNER IS ${winner.toUpperCase()}`\n        }\n        this.element.appendChild(winningLabel)\n      }\n    }\n  }\n\n  \n}\n\nmodule.exports = View;\n\n\n//# sourceURL=webpack:///./src/ttt-view.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;