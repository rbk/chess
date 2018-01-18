import React, { Component } from 'react';
import Row from './row.js';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "user1" : [],
      "user2" : [],
      "current_board" : []
    }
  }

  user1_pieces = [
    { name: "pawn", y:1, x:0, user: 1 },
    { name: "pawn", y:1, x:1, user: 1 },
    { name: "pawn", y:1, x:2, user: 1 },
    { name: "pawn", y:1, x:3, user: 1 },
    { name: "pawn", y:1, x:4, user: 1 },
    { name: "pawn", y:1, x:5, user: 1 },
    { name: "pawn", y:1, x:6, user: 1 },
    { name: "pawn", y:1, x:7, user: 1 },
    { name: "rook", y:0, x:0, user: 1 },
    { name: "knight", y:0, x:1, user: 1 },
    { name: "bishop", y:0, x:2, user: 1 },
    { name: "queen", y:0, x:3, user: 1 },
    { name: "king", y:0, x:4, user: 1 },
    { name: "bishop", y:0, x:5, user: 1 },
    { name: "knight", y:0, x:6, user: 1 },
    { name: "rook", y:0, x:7, user: 1 },
  ];

  user2_pieces = [
    { name: "pawn", y:6, x:0, user: 2 },
    { name: "pawn", y:6, x:1, user: 2 },
    { name: "pawn", y:6, x:2, user: 2 },
    { name: "pawn", y:6, x:3, user: 2 },
    { name: "pawn", y:6, x:4, user: 2 },
    { name: "pawn", y:6, x:5, user: 2 },
    { name: "pawn", y:6, x:6, user: 2 },
    { name: "pawn", y:6, x:7, user: 2 },
    { name: "rook", y:7, x:0, user: 2 },
    { name: "knight", y:7, x:1, user: 2 },
    { name: "bishop", y:7, x:2, user: 2 },
    { name: "queen", y:7, x:3, user: 2 },
    { name: "king", y:7, x:4, user: 2 },
    { name: "bishop", y:7, x:5, user: 2 },
    { name: "knight", y:7, x:6, user: 2 },
    { name: "rook", y:7, x:7, user: 2 },

  ];

  board_empty = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
  ];

  board = [
    [2,3,4,5,6,4,3,2],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [2,3,4,5,6,4,3,2],
  ];


  putPiecesOnBoard() {

    let new_board = []
    let current_coordinate = []

    for (var i = 0; i < 8; i++) {
      let row = []
      for (var c = 0; c < 8; c++) {
        row[c] = 0
      }
      new_board.push(row)
    }
    for (var i = 0; i < this.user1_pieces.length; i++) {
      new_board[this.user1_pieces[i].y][this.user1_pieces[i].x] = this.user1_pieces[i]
    }
    for (var i = 0; i < this.user2_pieces.length; i++) {
      new_board[this.user2_pieces[i].y][this.user2_pieces[i].x] = this.user2_pieces[i]
    }
    return new_board

  }

  componentWillMount() {
    this.setState({
      "user1" : [],
      "user2" : [],
      "current_board" : this.putPiecesOnBoard()
    });
  }


  setupRows() {
    var rows = []
    for (var i = 0; i < this.state.current_board.length; i++) {
      rows.push(<Row key={Math.random()} pieces={this.state.current_board[i]} />)
    }
    return rows;
  }

  render() {
    let state = this.state
    let rows = this.setupRows()
    return (
      <div>
        <table border="1">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}
