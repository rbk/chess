function Chess()
{
  return {
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
    // in_danger: false, // FACT - check whole board for possible attack??
    // place_opponent_in_check: false, // FACT- How???? If can attack
    // protected: false, // FACT
    log_board: function() {
      console.clear();
      this.board.map((row) => {
        console.log(row)
      })
    },
    calculate_moves: function() {},
    calculate_other_properties: function() {},
    reset_board: function(board) {
      this.board = this.startingBoard;
    },
    set_board: function(board) {
      this.board = board;
    },
    build_pieces: function() {
      let all = [];
      this.board.map((row, y) => {
        row.map((p, x) => {
          let team_number = p.split("")[1]
          let direction = "";
          let name = "";
          if (team_number == "1") {
            direction = "+"
          } else if (team_number == 2){
            direction = "-"
          }
          if (p.match("P")) {
            name = "pawn";
          }
          if (p.match("R")) {
            name = "rook";
          }
          if (p.match("K")) {
            name = "knight";
          }
          if (p.match("Q")) {
            name = "queen";
          }
          if (p.match("W")) {
            name = "king";
          }
          if (p.match("B")) {
            name = "bishop";
          }
          if (name != "") {
            all.push({
              "name" : name,
              "player" : Number(team_number),
              "direction" : direction,
              "coor" : {x: x, y: y},
              "advanced" : false,
              "moves" : [],
              "key": p
            })
          }
          x++
        })
        y++
      })
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
      this.pieces = all;
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
          if (this.isOpponent(moveY, moveX, piece.player)) {
            let attack = this.board[moveY][moveX]
            moves.push({
              coordinates: {x: moveX, y: moveY},
              capture: true
            })
            break;
          } else if (this.openSpace(moveY, moveX)){
            moves.push({
              coordinates: {x: moveX, y: moveY},
              capture: false
            })
          } else {
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
          if (this.isOpponent(moveY, moveX, piece.player)) {
            let attack = this.board[moveY][moveX]
            moves.push({
              coordinates: {x: moveX, y: moveY},
              capture: true
            })
            break;
          } else if (this.openSpace(moveY, moveX)){
            moves.push({
              coordinates: {x: moveX, y: moveY},
              capture: false
            })
          } else {
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

        if (this.isOpponent(moveY, moveX, piece.player)) {
          let attack = this.board[moveY][moveX]
          moves.push({
            coordinates: {x: moveX, y: moveY},
            capture: true
          })
        } else if (this.openSpace(moveY, moveX)){
          moves.push({
            coordinates: {x: moveX, y: moveY},
            capture: false
          })
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
          coordinates: {x: moveX, y: moveY},
          capture: false
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
            coordinates: {x: moveX, y: moveY},
            capture: false
          })
        }
      }

      // diag right
      moveY = pawn.coor.y + parseInt(pawn.direction + 1);
      moveX = pawn.coor.x + 1;
      if (this.isOpponent(moveY, moveX, pawn.player)) {
        moves.push({
          coordinates: {x: moveX, y: moveY},
          capture: true
        })
      }

      // diag left
      moveY = pawn.coor.y + parseInt(pawn.direction + 1);
      moveX = pawn.coor.x - 1;
      if (this.isOpponent(moveY, moveX, pawn.player)) {
        moves.push({
          coordinates: {x: moveX, y: moveY},
          capture: true
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
              let attack = boardClone[move.coordinates.y][move.coordinates.x]
              boardClone[move.coordinates.y][move.coordinates.x] = "{"+attack+"}"
            } else {
              boardClone[move.coordinates.y][move.coordinates.x] = "{m}"
            }
          })
        }
      })
      boardClone.map((row) => {
        console.log(row)
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
        console.log(pieceExists[0].moves)
      }
      // validate move
      // update this.board with piece key
      // update from coor to be empty
    }
  }
}
