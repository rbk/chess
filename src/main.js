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

ai.setUser(1);

const gameManagement = {
  turn: 1,
  computerPlayerNumber: 1,
}

game.reset_board();
game.build_pieces();
ui.displayBoard(game.board, game.pieces);

let userPlayed = false;

setInterval(function(){
  if (gameManagement.turn == 1) {
    // console.log("computers turn...")
    userPlayed = false;
    let move = ai.getMove(game.pieces, gameManagement.computerPlayerNumber);
    if (move) {
      game.move(move.from, move.to);
      game.build_pieces();
      gameManagement.turn = 2;
      ui.displayBoard(game.board, game.pieces);
      // console.log("computers played")
    } else {
      // console.log(`No more moves for player ${gameManagement.computerPlayerNumber}`)
      gameManagement.turn = 2;
    }
  } else {
    // setTimeout(function(){
    //   userPlayed = true;
    // }, 5000)
    // if (userPlayed) {
      let move = ai.getMove(game.pieces, 2);
      if (move) {
        game.move(move.from, move.to);
        game.build_pieces();
        ui.displayBoard(game.board, game.pieces);
        gameManagement.turn = 1;
      } else {
        // console.log(`No more moves for player 2`)
        gameManagement.turn = 1;
      }
    // }
    // console.log('Waiting for user to go...');
  }
}, 5000)


document.body.addEventListener('click', function() {
  userPlayed = true;
})




// // game.log_moves(1,0);
// //
// // Move pawn up one
// game.move({y: 6, x: 0}, {y: 4, x:0});
// game.build_pieces();
// game.move({y: 7, x: 0}, {y: 5, x:0});
// game.build_pieces();
