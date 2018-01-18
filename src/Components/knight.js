import React, { Component } from 'react';

export default class Knight extends Component {

  constructor(props) {
    super(props);
  }

  symbol = "K"

  render() {
    return (
      <td><span>{this.symbol}</span></td>
    )
  }

}
