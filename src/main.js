const game = Chess();
const ai = ChessAi();
const ui = ChessUi();

game.set_board([
  ["00", "K1", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["P1", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "Q1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["P2", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
]);
game.reset_board();
game.build_pieces();
game.log_board();
// game.log_moves(1,0);

// ui.displayBoard(game.board, game.pieces);

// Move pawn up one
game.move({y: 6, x: 0}, {y: 4, x:0});
game.build_pieces();
game.move({y: 7, x: 0}, {y: 5, x:0});
game.build_pieces();

game.reset_board();
ui.displayBoard(game.board, game.pieces);
