const game = Chess();
const ai = ChessAi();
const ui = ChessUi();

game.set_board([
  ["00", "K1", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["P1", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["P2", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
]);
game.reset_board();
game.build_pieces();
game.log_board();
// game.log_moves(1,0);

// game.onMove(function(){
//   ui.displayBoard(game.board, game.pieces);
// })
ui.displayBoard(game.board, game.pieces);
