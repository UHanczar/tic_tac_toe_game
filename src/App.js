import React, { Component } from 'react';
import './App.css';

import Announcement from './components/Announcement.jsx';
import ResentButton from './components/ResetButton.jsx';

import Tile from './components/Tile.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'X',
      winner: null,
    };
  }

  updateBoard(loc, player) {
    console.log(loc, player);
    if (this.state.gameBoard[loc] === 'X' || this.state.gameBoard[loc] === 'O' || this.state.winner) {
      return;
    }

    const currentGameBoard = this.state.gameBoard;
    currentGameBoard.splice(loc, 1, this.state.turn);
    this.setState({
      gameBoard: currentGameBoard
    });

    const topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];
    if (topRow.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5];
    if (middleRow.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const bottomRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8];
    if (bottomRow.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];
    if (leftCol.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const middleCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];
    if (middleCol.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];
    if (rightCol.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8];
    if (leftDiag.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];
    if (rightDiag.match(/XXX|OOO/)) {
      this.setState({ winner: this.state.turn });
    }

    const moves = this.state.gameBoard.join('').replace(/ /g, '');
    console.log(moves);
    if (moves.length === 9) {
      this.setState({ winner: 'draw' })
    }

    this.setState({ turn: (this.state.turn === 'X') ? 'O' : 'X' });
    // const gameBoard = this.state.gameBoard.slice();
    // const turn = this.state.turn;
    // turn ? player = 'X' : player = '0';
    // gameBoard[loc] = player;
    //
    // this.setState({
    //   gameBoard: gameBoard,
    //   turn: !turn
    // })

  }

  resetBoard() {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'X',
      winner: null,
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='menu'>
          <h1>Tic-Tac-Toe Game</h1>
          <Announcement winner={this.state.winner} />
          <ResentButton reset={this.resetBoard.bind(this)} />
        </div>
        {this.state.gameBoard.map((value, i) => {
          return (<Tile
            key={i}
            loc={i}
            value={value}
            turn={this.state.turn}
            onUpdateBoard={this.updateBoard.bind(this)}
          />);
        })}
      </div>
    );
  }
}

export default App;
