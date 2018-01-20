function ChessAi()
{

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
    }
  }

}
