function ChessAi(player)
{

  function thinkAhead(game) {

    let pieces = game.getPieces();
    let board = game.getBoard();

    // calculate possibilites after imagining a certain move
    // What is the outcome?

    // what is board state?
    //  - list of pieces and grid
    // How do I change the state of board temporarily?
    //  - clone board
    //  - make the move on this clone
    //  - create a new board
    //  - get danger rating of this move
    //  - add this rating to the move rate

    // make a move in head, then determine if the outcome is worth it
    // Based on a possible move, recalculate the moves Rating

    // filter moves to return the best possible moves
    pieces.filter((piece, index) => {
      return calulateMoveStrengths(piece) > piece.strength
    })

  }

  function calulateMoveStrengths(piece) {

    let moveRating = 0;

    var newBoard = Chess()

    newBoard.setState(boardState);

    piece.moves.map((p, index) => {

      var dangerLevel = newBoard.getPieceDanger(piece)

      // for each move, simulate move
      // Is the piece in danger
      // How much is the danger

      // newBoard.move(move.from, move.to);
    })
    return moveRating;
  }

  return {
    user: 0,
    setUser: function(number) {
      this.user = number;
    },
    getMove: function(pieces, player) {

      // console.log(pieces)

      // build array of pieces that can move for player
      let players = pieces.filter((p)=>{
        if (p.player == player && p.moves.length > 0) {
          return true;
        }
      })

      // console.log()
      // select on at random
      let randomPiece = players[Math.floor(Math.random()*players.length)];

      if (!randomPiece) {
        return false;
      }
      // console.log(Math.floor(Math.random()*randomPiece.moves.length))
      // select one of the moves at random
      let randomMove = randomPiece.moves[Math.floor(Math.random()*randomPiece.moves.length)];
      // console.log(randomMove)
      // return the coordinates of "to" and "from"

      return {
        from: {y: randomPiece.coor.y, x: randomPiece.coor.x},
        to: {y: randomMove.coor.y, x: randomMove.coor.x}
      }
    },
    calculate_move_strength: function(all) {
      // console.log(all)
      all.map((piece, index) => {
        // console.log(piece)
      })
      /*
      - DANGER move puts piece in danger (-2)
      - COST move captures a lower valued piece (-1)
      - PROTECTION move provides protection (+2)
      - COST+PROTECTION Captures lower piece, but provides protection (+3)
      - HIGH VALUE - High value pieces like Queen and King take less risks
      - IN DANGER - is the piece currently in danger and if so, what is the value of that piece
      */
      let q = all[0];
      let dangerLevel = 0;

      let inDangerNow = this.can_any_piece_attack_here(
        q.coor.y,
        q.coor.x,
        q.player
      );
      console.log(`Danger now: ${inDangerNow}`)
      if (inDangerNow) {
        dangerLevel = q.value + 1;
      }

      /*
        Rating is higher value, when it is a better move
       */

      // console.log(q.moves)
      q.moves.map((move) => {

        // console.log(move)

        // default move rating
        move.rating = 0;

        // Can opponent attack this piece
        // If a high value piece in danger,
        // give higher move rating to all moves
        move.rating = dangerLevel;

        // If move can capture, increase rating
        if (move.capture) {
          move.rating++;
        }
        // Found the gold!
        // Caputre then what can opponent do
        // Simulate 1 move ahead to test against
        // Create a new rating after move
        // Best case, ability to test 10 move ahead.
        // With that said, calculate most probable move (Machine learning concepts help here)

        // !!!!! "rebuilding pieces" runs this function?!?! problem...
        //  - I cannot simulate a move here

        let capturePutsPieceInDanger = this.can_any_piece_attack_here(
          move.coor.y,
          move.coor.x,
          q.player
        );

        // simulate move by setting the piece in the place on "grid"
        // get the get the knowledge from that move (can i be caputed)
        // reset board to what it was before
        // then i can adjust the move rating here

        // console.log(capturePutsPieceInDanger)
        if (capturePutsPieceInDanger) {
          console.log(`Danger in future: ${capturePutsPieceInDanger}`)
          console.log(move)
          move.rating = move.rating - q.value;
        }

        // Moves
        // - How many opponents can attack this position? (where I am about to move)
        // - Simulate 1 move ahead,
        //  - right now, I would have to

        // let inDangerNow = this.can_any_piece_attack_here(q.coor.y, q.coor.x, q.player);
        // console.log(`Danger now: ${inDangerNow}`)
        // if (inDangerNow) {
        //   move.rating = move.rating + 1 + q.value;
        // }
        // Will the resulting move put it in danger
      })
      // console.log(q.moves[0])

      return all;
    },
  }

}
