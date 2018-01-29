const game = Chess({});
const ai = ChessAi();
const ui = ChessUi();
const gameManagement = {}

game.init();

game.setBoard([
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "K1", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "Q1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "P2", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "P2", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "W2", "00", "00", "00", "R2"],
]);

// game.setBoard(game.startingBoard)

// console.log('pieces', game.pieces)
// console.log('board', game.board)

ui.displayBoard(game.board, game.pieces);

// log which move moves are the best
ai.player = 2;
ai.thinkAhead(game);
