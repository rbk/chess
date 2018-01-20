function ChessUi()
{

  const armyMap = [
    { key: "00", display: "" },
    { key: "P", display: "i" },
    { key: "R", display: "R" },
    { key: "K", display: "Kn" },
    { key: "B", display: "B" },
    { key: "W", display: "K" },
    { key: "Q", display: "Q" },
  ];

  function getIcon(key) {
    let newKey = key
    armyMap.forEach((obj) => {
      console.log(obj)
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

  function buildTable(board, pieces) {
    console.log(armyMap)
    let html = "<table>";
    board.map((row,rowIndex) => {
      html += "<tr>";
      row.map((col, colIndex) => {
        let pieceDisplay = getPieceDisplay(col);
        html += "<td class='"+pieceDisplay.color+"'>" +pieceDisplay.icon+ "</td>";
      });
      html += "</tr>";
    });
    html += "</table>";
    return html;
  }

  function appendTable(html) {
    let chessElement = document.getElementById('chess');
    chessElement.innerHTML = html;
  }

  return {
    displayBoard: function(board, pieces) {
      let tableHtml = buildTable(board, pieces);
      appendTable(tableHtml)
    }
  }

}
