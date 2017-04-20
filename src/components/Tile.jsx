import React, { Component } from 'react';

import './../tile.css';

export default class Tile extends Component {
  tileClick(props) {
    this.props.onUpdateBoard(props.loc, props.turn);
  }
  render() {
    return (
      <div className='tile' onClick={() => this.tileClick(this.props)}>
        <p>{this.props.value}</p>
      </div>
    );
  }
}
