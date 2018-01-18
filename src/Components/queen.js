import React, { Component } from 'react';

export default class Queen extends Component {

  constructor(props) {
    super(props);
  }

  symbol = "Q"

  render() {
    return (
      <td><span>{this.symbol}</span></td>
    )
  }

}
