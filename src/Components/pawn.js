import React, { Component } from 'react';

export default class Pawn extends Component {

  constructor(props) {
    super(props);
    // console.log(props)
  }

  symbol = "P"

  render() {
    return (
      <td user="1" onClick={this.props.handle}><span>{this.symbol}</span></td>
    )
  }

}
