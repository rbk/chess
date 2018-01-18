import React, { Component } from 'react';

export default class Bishop extends Component {

  constructor(props) {
    super(props);
  }

  symbol = "B"

  render() {
    return (
      <td><span>{this.symbol}</span></td>
    )
  }

}
