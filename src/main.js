const game = Chess();
const ai = ChessAi();
const ui = ChessUi();
const gameManagement = {}

game.init({
  player1: {
    color: "black",
    user: "computer"
  },
  player2: {
    color: "white",
    user: "human"
  }
});

game.setBoard([
  ["00", "00", "00", "W1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "K1", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "P1", "Q1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "P2", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "P2", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "W2", "00", "00", "00", "R2"],
]);

// game.setBoard(game.startingBoard)

// console.log('pieces', game.pieces)
// console.log('board', game.board)

// ui.displayBoard(game);

// game.setTurn("player2");
ui.displayBoard(game);

// console.log(`Player 1 check status: ${game.player1.inCheck}`)
// console.log(`Player 2 check status: ${game.player2.inCheck}`)
// console.log(game.player2)



// log which move moves are the best
// console.log(ai.player);
