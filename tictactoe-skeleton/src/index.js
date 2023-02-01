// assigning classes from other script files to variables
const Game = require("./game.js")
const View = require("./ttt-view.js")

document.addEventListener("DOMContentLoaded", () => { // when the document-content is loaded
  // making instances of the above classes
  const containerElement = document.querySelector('.ttt')
  const game = new Game();
  new View(game, containerElement);

}); 

