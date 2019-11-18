function ChessUi()
{

  var turn = 0;

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
    let html = `
      <div class="status">
        Turn: Player ${game.turn.num} (${game.turn.color}) | In Check: ${game.turn.inCheck}
      </div>
    `;
    // console.log(game.turn)
    html += "<table>";
    board.map((row,rowIndex) => {
      html += "<tr>";
      row.map((col, colIndex) => {
        let pieceDisplay = getPieceDisplay(col);
        let pieceData = getPieceObj(rowIndex, colIndex, pieces)
        let pieceDataString = JSON.stringify(pieceData);
        var extraClass = "";
        if ("name" in pieceData) {
          extraClass = "chess-piece";
        }
        html += `<td
          x='${colIndex}'
          y='${rowIndex}'
          data='${pieceDataString}'
          class='${extraClass} board-tile ${pieceDisplay.color}'>
            ${pieceDisplay.icon}
            <span class="debug-piece-coor">[${colIndex}, ${rowIndex}]</span>
          </td>`;
      });
      html += "</tr>";
    });
    html += "</table>";
    return html;
  }

  // Show available moves
  function setOnClickEvent() {
    let tiles = document.querySelectorAll('.chess-piece');
    tiles.forEach(function(piece) {
      piece.addEventListener('click', function() {
        tiles.forEach(function(p){
          p.classList.remove('selected')
          p.classList.remove('possible')
        })
        let obj = JSON.parse(this.getAttribute('data'));
        this.classList.toggle("selected")
        // console.log(obj)
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

  function resetTiles() {
    let tiles = document.querySelectorAll('.board-tile');
    tiles.forEach(function(p){
      p.classList.remove('selected')
      p.classList.remove('possible')
    });
  }

  // Store selected,
  // if stored, check move
  function setClickTwo(){

    var next_move_from = document.getElementById('next-move-from');
    var next_move_to = document.getElementById('next-move-to');
    var x, y, data, coors;

    let tiles = document.querySelectorAll('.board-tile');
    tiles.forEach(function(tile){
      tile.addEventListener('click', function(e){
        var el = tile;
        // Selected piece or current piece
        // Reset highlights and from move
        if (el.className.match('chess-piece') && el.className.match('selected') && !el.className.match('possible')) {
          resetTiles()
          next_move_from.value = ""
          return;
        }

        if (el.className.match('possible')) {
          let x = el.getAttribute('x')
          let y = el.getAttribute('y')
          var next_move_to = document.getElementById('next-move-to');
          next_move_to.value = JSON.stringify({x: x, y: y});
          let tiles = document.querySelectorAll('.board-tile');
          tiles.forEach(function(p){
            p.classList.remove('selected')
            p.classList.remove('possible')
          });
          return;
        }

        // If piece
        if (
          next_move_from.value == "" &&
          !el.className.match('possible') &&
          el.className.match('chess-piece')
        ) {
          data = JSON.parse(e.target.attributes.data.nodeValue)
          x = e.target.attributes.x.nodeValue;
          y = e.target.attributes.y.nodeValue;
          coors = {"x":x, "y":y}
          next_move_from.value = JSON.stringify(coors);
          let tiles = document.querySelectorAll('.board-tile');
          tiles.forEach(function(p){
            p.classList.remove('selected')
            p.classList.remove('possible')
          });
          el.classList.toggle("selected")
          let obj = JSON.parse(el.getAttribute('data'));
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
        }
      });
    });
  }

  function appendTable(html) {
    let chessElement = document.getElementById('chess');
    // chessElement.innerHTML = chessElement.innerHTML + html;
    chessElement.innerHTML = html;
  }

  return {
    displayBoard: function(board, pieces) {
      let tableHtml = buildTable(board, pieces);
      appendTable(tableHtml)
      this.setEvents();
    },
    setEvents: function() {
      // setOnClickEvent();
      setClickTwo();
    }
  }

}
