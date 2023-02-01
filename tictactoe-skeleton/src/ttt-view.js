const Game = require("./game.js")

class View {
  constructor(game, element) {
    this.game = game;
    this.element = element;// the ttt container
    this.playing = true;

    this.setupBoard() // render the board on the browser
    this.handleClick = this.handleClick.bind(this);
    this.bindEvents()
    this.renderCurrentPlayer(this.game.currentPlayer)

  }

  renderCurrentPlayer(player){
    // set the document
    const targetH5 = document.querySelector('.current-player')
    targetH5.textContent = `Current player: ${player}`
  }

  setupBoard() {
    // sets the container's styling
    const board = document.createElement("ul");
    board.style.display = "flex";
    board.style.width = "300px";
    board.style.height = "300px";
    board.style.flexWrap = "wrap";
    board.style.listStyleType = "none";

    // for every cell in the tic-tac-toe 3x3 box, its creating a cell with dimensions that would fit the container
    for (let i = 0; i < 9; i++) { // making the li cells
      const cell = document.createElement("li");
    
      cell.style.width = "98px";
      cell.style.height = "100px";

      // setting cell style
      cell.style.backgroundColor = "gray";
      cell.style.border = "1px solid black";

      // setting cell position
      if ( i < 3 ) { // row 0
        cell.dataset.position = JSON.stringify([0, i])
      } else if (i > 2 && i < 6) { // row 1
        cell.dataset.position = JSON.stringify([1, i - 3])
      } else if (i > 5) { // row 2
        cell.dataset.position = JSON.stringify([2, i - 6])
      }

      cell.addEventListener("mouseenter", () => {

        if (cell.style.backgroundColor !== "white") {
          cell.style.backgroundColor = "yellow";
        }
      });

      cell.addEventListener("mouseleave", () => {
        if (cell.style.backgroundColor !== "white") {
          cell.style.backgroundColor = "gray";
        }
      });

      // pushing the newly created cell to the board
      board.appendChild(cell);
    }
    this.element.appendChild(board);
  }

  bindEvents() {
    this.element.addEventListener("click", this.handleClick); // event listeners auto invoke the function with e
  }

  handleClick(e) { // e == THE event object
    if (this.playing) {
      const position = e.target.dataset.position;
      console.log(e.target);

      
      if(!e.target.textContent) {
        // styling the cell
        e.target.style.backgroundColor = "white";
        e.target.style.fontSize = "100px";
        e.target.textContent = this.game.currentPlayer; // this fills the cell with the current player
      }
      
      this.game.playMove(JSON.parse(position)); // raw game logic / backend shit
      this.renderCurrentPlayer(this.game.currentPlayer); // handles the current player label

      // when game is over, make a giant label saying current player won
      if (this.game.board.isOver()) {
        this.playing = false
        console.log("Someone won")

        // render the current player winning screen (a giant label on the bottom)
        const winningLabel = document.createElement("h1")
        winningLabel.height = 100
        winningLabel.width = 300
        winningLabel.style.fontSize = "100px";
        // if (this.game.currentPlayer === "x") {
        //   winningLabel.textContent = `O WINS!`
        // } else if (this.game.currentPlayer === "o"){
        //   winningLabel.textContent = `X WINS!`
        // } else{
        //   winningLabel.textContent = `Nobody wins and you both`;
        // }

        const winner = this.game.board.winner();  
        if (winner === null) {
          winningLabel.textContent = "nobody wins, yall suck hard"
        } else {
          winningLabel.textContent = `THE WINNER IS ${winner.toUpperCase()}`
        }
        this.element.appendChild(winningLabel)
      }
    }
  }

  
}

module.exports = View;
