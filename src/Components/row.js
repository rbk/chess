import React, { Component } from 'react';

import Pawn from './pawn.js'
import Rook from './rook.js'
import Bishop from './bishop.js'
import King from './king.js'
import Queen from './queen.js'
import Knight from './knight.js'
import Empty from './empty.js'

export default class Row extends Component {

  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      "row" : [],
    };

  }

  setupRow() {
    var rows = [];
    var user = 1;
    var user1 = []
    var user2 = []
    var x = 0;
    var y = 0;
    for (var i = 0; i < this.props.pieces.length; i++) {
      if (this.props.pieces[i] == 0) {
        rows.push(<Empty key={Math.random()} obj={this.props.pieces[i]} />);
        continue;
      }
      if (this.props.pieces[i].name == "pawn") {
        rows.push(<Pawn key={Math.random()} obj={this.props.pieces[i]} handle={this.getPossibleMoves.bind(this)} />);
      }
      if (this.props.pieces[i].name == "rook") {
        rows.push(<Rook key={Math.random()} obj={this.props.pieces[i]} />);
      }
      if (this.props.pieces[i].name == "knight") {
        rows.push(<Knight key={Math.random()} obj={this.props.pieces[i]} />);
      }
      if (this.props.pieces[i].name == "bishop") {
        rows.push(<Bishop key={Math.random()} obj={this.props.pieces[i]} />);
      }
      if (this.props.pieces[i].name == "king") {
        rows.push(<King key={Math.random()} obj={this.props.pieces[i]} />);
      }
      if (this.props.pieces[i].name == "queen") {
        rows.push(<Queen key={Math.random()} obj={this.props.pieces[i]} />);
      }
      x++;
      y++;
    }
    return rows;
  }

  getPossibleMoves() {
  }

  componentWillMount() {
    this.setState({
      "row" : this.setupRow(),
    })
  }

  render() {
    return (
      <tr>
        {this.state.row}
      </tr>
    )
  }

}
