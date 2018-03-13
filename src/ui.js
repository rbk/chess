function ChessUi()
{

  // https://en.wikipedia.org/wiki/Chess_symbols_in_Unicode#Unicode_codepoints_and_HTML
  const armyMap = [
    { key: "00", display: "" },
    { key: "P", display: "&#9823;" },
    { key: "R", display: "&#9820;" },
    { key: "K", display: "&#9822;" },
    { key: "B", display: "&#9821;" },
    { key: "W", display: "&#9818;" },
    { key: "Q", display: "&#9819;" },
  ];

  function getIcon(key) {
    let newKey = key
    armyMap.forEach((obj) => {
      if (key.match(obj.key)) {
        newKey = obj.display;
      }
    })
    return newKey;
  }

  function getPieceDisplay(key) {
    let color;
    if (key.match("1")) {
      color = "color-black";
    } else {
      color = "color-white";
    }

    let newKey = getIcon(key);

    return {
      color: color,
      icon: newKey
    };
  }

  function getPieceObj(y,x,pieces) {
    let obj = {}
    let found = pieces.filter((piece) => {
      if (piece.coor.x == x && piece.coor.y == y) {
        return true;
      }
    });
    if (found.length) {
      return found[0];
    } else {
      return {}
    }
  }

  function buildTable(game) {
    let pieces = game.pieces;
    let board = game.board;
    // console.log(board)
    let html = "<table>";
    board.map((row,rowIndex) => {
      html += "<tr>";
      row.map((col, colIndex) => {
        let pieceDisplay = getPieceDisplay(col);
        let pieceData = getPieceObj(rowIndex, colIndex, pieces)
        let pieceDataString = JSON.stringify(pieceData);
        html += `<td
          x='${colIndex}'
          y='${rowIndex}'
          data='${pieceDataString}'
          class='chess-piece board-tile ${pieceDisplay.color}'>${pieceDisplay.icon}</td>`;
      });
      html += "</tr>";
    });
    html += "</table>";
    return html;
  }

  function setOnClickEvent() {
    let pieces = document.querySelectorAll('.chess-piece');
    let tiles = document.querySelectorAll('.board-tile');
    pieces.forEach(function(piece) {
      piece.addEventListener('click', function() {
        pieces.forEach(function(p){
          p.classList.remove('selected')
          p.classList.remove('possible')
        })
        let obj = JSON.parse(this.getAttribute('data'));
        this.classList.toggle("selected")
        // console.log(obj.moves)
        if (obj.moves) {
          tiles.forEach(function(tile) {
            let x = tile.getAttribute('x')
            let y = tile.getAttribute('y')
            obj.moves.forEach(function(move){
              if (x == move.coor.x && y == move.coor.y) {
                tile.classList.add('possible')
              }
            })
          })
        }
      })
    })
  }

  function appendTable(html) {
    let chessElement = document.getElementById('chess');
    chessElement.innerHTML = chessElement.innerHTML + html;
    // chessElement.innerHTML = html;
  }

  return {
    displayBoard: function(board, pieces) {
      let tableHtml = buildTable(board, pieces);
      appendTable(tableHtml)
      this.setEvents();
    },
    setEvents: function() {
      setOnClickEvent();
    }
  }

}
