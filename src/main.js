const game = Chess();
const ai = ChessAi();
const ui = ChessUi();

game.reset_board();
game.build_pieces();
game.print_moves(2,0);
