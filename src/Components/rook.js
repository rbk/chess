import React, { Component } from 'react';

export default class Rook extends Component {

  constructor(props) {
    super(props);
  }

  symbol = "R"

  render() {
    return (
      <td><span>{this.symbol}</span></td>
    )
  }

}
