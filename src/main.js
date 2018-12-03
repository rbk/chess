const game = Chess(); // Logic of chess, enforce rules
const ai = ChessAi(); // AI to play against
const ui = ChessUi(); // User interactive layer
const gameManagement = {} // Connect the UI with the Chess API?

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

game.updateGame([
  ["00", "00", "00", "W1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "00"],
  ["00", "K1", "00", "00", "00", "00", "00", "00"],
  ["00", "00", "P1", "Q1", "00", "00", "00", "00"],
  ["00", "00", "00", "00", "P2", "00", "00", "00"],
  ["00", "00", "00", "00", "00", "P2", "00", "00"],
  ["00", "00", "00", "00", "00", "00", "00", "R2"],
  ["00", "00", "00", "00", "W2", "00", "00", "00"],
]);

var message = document.getElementById('message');
var player = document.getElementById('player');
var next_move_from = document.getElementById('next-move-from');
var next_move_to = document.getElementById('next-move-to');


game.updateGame(game.startingBoard)
player.value = 1
message.value = "Player one needs to move."
game.setTurn("player1");
game.move({"x":"4","y":"4"}, {"x":"3","y":"3"})
ui.displayBoard(game);

gameManagement.reset = function(){
  document.getElementById('next-move-from').value = "";
  document.getElementById('next-move-to').value = "";
}
gameManagement.init = function(){
  setTimeout(function(){
    var next_move_from = document.getElementById('next-move-from').value;
    var next_move_to = document.getElementById('next-move-to').value;
    if (next_move_from != "" && next_move_to != "") {
      console.log('move')

      /*

        The game.move function should be the messager.
        Send game codes back to manager.
        Example:
          - Player 1 moved rook from [0,0] to [0,1].
          - Player 1 captures player 2 queen.
          - Cannot move. Player 2 is in check.
      */

      next_move_from = JSON.parse(next_move_from);
      next_move_to = JSON.parse(next_move_to);
      console.log(next_move_from, next_move_to)
      game.move(next_move_from, next_move_to);
      game.updateGame(game.board);
      game.setTurn("player2");
      ui.displayBoard(game);
      gameManagement.reset();
    }
    gameManagement.init();
  }, 100)
}
gameManagement.init();

// Wait for move?
// GET MOVE?
// UPDATE GAME
// game.move({x:0,y:1}, {x:0, y:3});
// game.updateGame(game.board);
// game.setTurn("player2");
// ui.displayBoard(game);


// console.log('pieces', game.pieces)
// console.log('board', game.board)

// game.updateGame(game.startingBoard)

//
// game.move({x:3,y:3}, {x:6, y:3});
// game.updateGame(game.board);
// ui.displayBoard(game);
//
// game.setTurn("player2");
// game.move({x:3,y:7}, {x:2, y:6});
// game.updateGame(game.board);
// ui.displayBoard(game);


// console.log(game.turn)


// ui.displayBoard(game);
// console.log("AFTER MOVE FUNC")
// game.updateGame(game.board)
// ui.displayBoard(game);


// console.log(`Player 1 check status: ${game.player1.inCheck}`)
// console.log(`Player 2 check status: ${game.player2.inCheck}`)
// console.log(game.player2)



// log which move moves are the best
// console.log(ai.player);
