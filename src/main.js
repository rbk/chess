const game = Chess({});
const ai = ChessAi(1);
const ui = ChessUi();
const gameManagement = {}

game.init();

game.setBoard([
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "Q1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "P2", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "P2", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
]);

console.log('pieces', game.pieces)
console.log('board', game.board)

ui.displayBoard(game.board, game.pieces);

// log which move moves are the best
ai.thinkAhead(game);
