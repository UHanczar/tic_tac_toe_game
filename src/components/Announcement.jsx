import React, { Component } from 'react';

import './../announcement.css';

export default class Announcement extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
        <h1>{this.props.winner}</h1>
      </div>
    );
  }
}
