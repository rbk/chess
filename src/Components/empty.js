import React, { Component } from 'react';

export default class Empty extends Component {

  constructor(props) {
    super(props);
  }

  symbol = ""

  render() {
    return (
      <td><span>{this.symbol}</span></td>
    )
  }

}
