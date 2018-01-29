function Chess(config)
{
  return {
    board: [],
    pieces: [],
    startingBoard: [
      ["R1", "K1", "B1", "W1", "Q1", "B1", "K1", "R1"],
      ["P1", "P1", "P1", "P1", "P1", "P1", "P1", "P1"],
      ["00", "00", "00", "00", "00", "00", "00", "00"],
      ["00", "00", "00", "00", "00", "00", "00", "00"],
      ["00", "00", "00", "00", "00", "00", "00", "00"],
      ["00", "00", "00", "00", "00", "00", "00", "00"],
      ["P2", "P2", "P2", "P2", "P2", "P2", "P2", "P2"],
      ["R2", "K2", "B2", "W2", "Q2", "B2", "K2", "R2"],
    ],
    coordinateBoard: [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
    ],
    // @TODO implment this method of adding pieces
    // Use the coordinate board to build the startingBoard
    addDefaultPieces: function() {
      let pieces = []
      pieces.push(new Queen(1, {x: 4, y: 0}));
      pieces.push(new Queen(2, {x: 4, y: 7}));
      // console.log(pieces)
    },
    // @TODO implement being in check and how that changes the possible moves for a player
    isPlayerInCheck: function(player) {

      let playerPieces = this.pieces.filter((piece) => {
        // return p
      })
      // get the kind for this player,
      // loop through all moves
      // if move can attach this king return true

      // console.log(king)
    },
    setBoard: function(board) {
      this.board = board;
      this.buildPieces(board);
    },
    buildPieces: function(board) {
      let all = [];
      board.map((row, y) => {
        row.map((p, x) => {
          let team_number = p.split("")[1]
          let direction = "";
          let name = "";
          let value = 0;
          if (team_number == "1") {
            direction = "+"
          } else if (team_number == 2){
            direction = "-"
          }
          if (p.match("P")) {
            name = "pawn";
            value = 1;
          }
          if (p.match("R")) {
            name = "rook";
            value = 3;
          }
          if (p.match("K")) {
            name = "knight";
            value = 3;
          }
          if (p.match("B")) {
            name = "bishop";
            value = 3;
          }
          if (p.match("Q")) {
            name = "queen";
            value = 5;
          }
          if (p.match("W")) {
            name = "king";
            value = 10;
          }
          if (name != "") {
            all.push({
              name : name,
              player : Number(team_number),
              direction : direction,
              coor : {x: x, y: y},
              advanced : false,
              moves : [],
              key: p,
              value : value,
              inDanger: false,
            })
          }
          x++
        })
        y++
      })
      this.pieces = this.calculateMoves(all);
      this.pieces = this.calculateDanger(this.pieces);
    },
    /**
     * Calculate danger level for each piece
     * @param  {array} pieces
     * @return {array} pieces with inDanger attribute
     */
    calculateDanger: function(pieces) {
      pieces.map((piece, index) => {
        let x = piece.coor.x;
        let y = piece.coor.y;
        pieces.map((piece2, index2) => {
          if (piece2.moves) {
            piece2.moves.map((move, index) => {
              if (move.coor.x == x && move.coor.y == y && move.capture) {
                // set to true if a piece can currently attack thie piece
                piece.inDanger = true;
              }
            })
          }
        });
      });
      return pieces;
    },
    calculateMoves: function(all) {
      all.map((piece) => {
        if (piece.name == "pawn") {
          piece.moves = this.pawn(piece)
        }
        if (piece.name == "rook") {
          piece.moves = this.rook(piece)
        }
        if (piece.name == "bishop") {
          piece.moves = this.bishop(piece)
        }
        if (piece.name == "knight") {
          piece.moves = this.knight(piece)
        }
        if (piece.name == "queen") {
          piece.moves = this.queen(piece)
        }
        if (piece.name == "king") {
          piece.moves = this.king(piece)
        }
      })
      return all;
    },
    allDiagonal: function(piece, limit) {

      let moves = [];
      let moveY;
      let moveX;
      let moveCount = 0;

      let directions = [
        {x: "+", y: "+"},
        {x: "-", y: "-"},
        {x: "-", y: "+"},
        {x: "+", y: "-"},
      ]

      directions.map((dir) => {

        moveCount = 0;
        moveY = piece.coor.y + parseInt(dir.y + 1);
        moveX = piece.coor.x + parseInt(dir.x + 1);

        while (this.isCoordinateValid(moveY, moveX) && moveCount < limit) {
          let move = this.getMove(moveY, moveX, piece);
          if (move) {
            moves.push(move);
          }
          if (!this.openSpace(moveY, moveX)) {
            break;
          }
          moveY = moveY + parseInt(dir.y + 1);
          moveX = moveX + parseInt(dir.x + 1);
          moveCount++;
        }
      })

      return moves

    },
    allLinear: function(piece, limit) {

      let moves = [];
      let moveY;
      let moveX;
      let moveCount = 0;

      let directions = [
        {x: null, y: "+"},
        {x: null, y: "-"},
        {x: "-", y: null},
        {x: "+", y: null},
      ]

      directions.map((dir) => {

        moveCount = 0;

        if (dir.y == null) {
          moveY = piece.coor.y;
          moveX = piece.coor.x + parseInt(dir.x + 1);
        } else {
          moveY = piece.coor.y + parseInt(dir.y + 1);
          moveX = piece.coor.x;
        }

        while (this.isCoordinateValid(moveY, moveX) && moveCount < limit) {
          let move = this.getMove(moveY, moveX, piece);
          if (move) {
            moves.push(move);
          }
          if (!this.openSpace(moveY, moveX)) {
            break;
          }
          if (dir.y == null) {
            moveX = moveX + parseInt(dir.x + 1);
          } else {
            moveY = moveY + parseInt(dir.y + 1);
          }
          moveCount++
        }
      })

      return moves;

    },
    knight: function(piece) {
      let moves = [];
      let moveY;
      let moveX;
      let directions = [
        {x: "+1", y: "+2"},
        {x: "-1", y: "-2"},
        {x: "+1", y: "-2"},
        {x: "-1", y: "+2"},
        {x: "+2", y: "+1"},
        {x: "-2", y: "-1"},
        {x: "+2", y: "-1"},
        {x: "-2", y: "+1"},
      ];
      directions.map((dir) => {
        moveY = piece.coor.y + parseInt(dir.y);
        moveX = piece.coor.x + parseInt(dir.x);
        let move = this.getMove(moveY, moveX, piece);
        if (move) {
          moves.push(move);
        }
      })
      return moves;
    },
    king: function(king) {
      let moves;
      let linearMoves = this.allLinear(king, 1);
      let diagonalMoves = this.allDiagonal(king, 1);
      moves = linearMoves.concat(diagonalMoves);
      return moves;
    },
    queen: function(queen) {
      let moves;
      let linearMoves = this.allLinear(queen, 14);
      let diagonalMoves = this.allDiagonal(queen, 14);
      moves = linearMoves.concat(diagonalMoves);
      return moves;
    },
    rook: function(rook) {
      return this.allLinear(rook, 14)
    },
    bishop: function(bishop) {
      return this.allDiagonal(bishop, 14)
    },
    pawn: function(pawn) {
      let moves = [];
      let moveY;
      let moveX;
      let canMoveTwoPlaces = true;

      moveY = pawn.coor.y + parseInt(pawn.direction + 1);
      moveX = pawn.coor.x;

      if (this.openSpace(moveY, moveX)) {
        moves.push({
          coor: {x: moveX, y: moveY},
          capture: false,
          check: false,
        })
      }

      if (pawn.direction == "+" && pawn.coor.y > 1)  {
        canMoveTwoPlaces = false;
      }

      if (pawn.direction == "-" && pawn.coor.y <= 5)  {
        canMoveTwoPlaces = false;
      }

      // IGNORE INITAL DOUBLE SPACE MOVE
      if (canMoveTwoPlaces) {
        moveY = pawn.coor.y + parseInt(pawn.direction + 2);
        moveX = pawn.coor.x;
        if (this.openSpace(moveY, moveX)) {
          moves.push({
            coor: {x: moveX, y: moveY},
            capture: false,
            check: false,
          })
        }
      }

      // diag right
      moveY = pawn.coor.y + parseInt(pawn.direction + 1);
      moveX = pawn.coor.x + 1;
      if (this.isOpponent(moveY, moveX, pawn.player)) {
        moves.push({
          coor: {x: moveX, y: moveY},
          capture: true,
          check: this.isKing(this.board[moveY][moveX]),
        })
      }

      // diag left
      moveY = pawn.coor.y + parseInt(pawn.direction + 1);
      moveX = pawn.coor.x - 1;
      if (this.isOpponent(moveY, moveX, pawn.player)) {
        moves.push({
          coor: {x: moveX, y: moveY},
          capture: true,
          check: this.isKing(this.board[moveY][moveX]),
        })
      }

      return moves

    },
    reachedOpponent: function(y, x, player) {
      if (!this.isCoordinateValid(y,x)) {
        return false;
      }
      if (!this.board[y][x].match(player)) {
        return false;
      }
      return false;
    },
    isCoordinateValid: function(y, x) {
      if (this.board[y] && this.board[y][x]) {
        return true;
      }
      return false;
    },
    openSpace: function(y, x) {
      if (!this.isCoordinateValid(y,x)) {
        return false;
      }
      if (this.board[y][x] != "00") {
        return false;
      }
      return true;
    },
    isOpponent: function(y, x, player) {
      if (!this.isCoordinateValid(y,x)) {
        return false;
      }
      if (this.board[y][x].match(player)) {
        return false;
      }
      if (this.board[y][x].match("00")) {
        return false;
      }
      return true;
    },
    isKing: function(piece) {
      if (piece.match('W')) {
        return true;
      }
      return false;
    },
    /**
     * Get possible move given a piece and corrdinates
     * @param  {integer} moveY Coordinate
     * @param  {integer} moveX Coordinate
     * @param  {object} piece
     * @return {object} Returns false if move is not valid
     */
    getMove: function(moveY, moveX, piece) {
      let moveObject = {}
      if (this.isOpponent(moveY, moveX, piece.player)) {
        let attack = this.board[moveY][moveX];
        moveObject.coor = {x: moveX, y: moveY};
        moveObject.capture = true;
        moveObject.check = false;
        if (this.isKing(attack)) {
          moveObject.check = true;
        }
        return moveObject;
      } else if (this.openSpace(moveY, moveX)){
        moveObject.coor = {x: moveX, y: moveY};
        moveObject.capture = false;
        moveObject.check = false;
        return moveObject;
      } else {
        return false;
      }
    },
    log_moves: function(y, x) {
      console.clear();
      let boardClone = JSON.stringify(this.board);
      boardClone = JSON.parse(boardClone)
      this.pieces.map((piece) => {
        if (piece.coor.y == y && piece.coor.x == x) {
          if (!piece.moves) {
            return false;
          }
          piece.moves.map((move) => {
            if (move.capture) {
              let attack = boardClone[move.coor.y][move.coor.x]
              boardClone[move.coor.y][move.coor.x] = "{"+attack+"}"
            } else {
              boardClone[move.coor.y][move.coor.x] = "{m}"
            }
          })
        }
      })
      boardClone.map((row) => {
        // console.log(row)
      })
    },
    remove_piece: function(y,x) {
      let newArray = this.pieces.filter((piece) => {
        if (piece.coor.y == y && piece.coor.x == x) {
          this.board[piece.coor.y][piece.coor.x] = "00"
        } else {
          return piece;
        }
      })
      this.pieces = newArray;
    },
    move: function(from, to) {
      let pieceExists = this.pieces.filter((obj) => {
        if (obj.coor.x == from.x && obj.coor.y == from.y) {
          return obj;
        }
        return false;
      })
      if (pieceExists.length > 0) {
        let piece = pieceExists[0];
        let moves = piece.moves;
        // validate move
        moves.forEach((obj) => {
          if (obj.coor.x == to.x && obj.coor.y == to.y) {
            // update this.board with piece key
            this.board[to.y][to.x] = piece.key;
            // update from coor to be empty
            this.board[from.y][from.x] = "00";
          }
        })
      }
      // Rebuild all pieces to calculate possible moves again
      console.log(this.board)
      this.buildPieces(this.board);
    },
    getBoard: function() {
      let cloneBoard = JSON.stringify(this.board);
      return JSON.parse(cloneBoard);
    },
    getPieces: function() {
      this.buildPieces(this.board);
      return this.pieces;
    },
    init: function() {
      this.buildPieces(this.startingBoard);
    }
  }
}
