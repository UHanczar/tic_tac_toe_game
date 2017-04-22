import React, { Component } from 'react';
import './App.css';

import Announcement from './components/Announcement';
import ResentButton from './components/ResetButton';

import Tile from './components/Tile';

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
      maxPlayer: 'X',
      minPlayer: 'O'
    };
  }

  tie(board) {
    const moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    } else {
      return false;
    }
  }

  winner(board, player) {
    if (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    } else {
      return null;
    }
  }

  copyBoard(board) {
    return board.slice(0);
  }

  validMove(move, player, board) {
    const newBoard = this.copyBoard(board);
    if (newBoard[move] === ' ') {
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  }

  findAIMove(board) {
    let bestMoveScore = 100;
    let move = null;
    // test all possible moves if game not over
    if (this.winner(board, 'X') || this.winner(board, 'O') || this.tie(board)) {
      return null;
    }

    for (let i = 0; i < board.length; i++) {
      const newBoard = this.validMove(i, this.state.minPlayer, board);
      if (newBoard) {
        const moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }

    return move;
  }

  minScore(board) {
    if (this.winner(board, 'X')) {
      return 10;
    } else if (this.winner(board, 'O')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = 100;
      for (let i = 0; i < board.length; i++) {
        const newBoard = this.validMove(i, this.state.minPlayer, board);
        if (newBoard) {
          const predictedMovieValue = this.maxScore(newBoard);
          if (predictedMovieValue < bestMoveValue) {
            bestMoveValue = predictedMovieValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  maxScore(board) {
    if (this.winner(board, 'X')) {
      return 10;
    } else if (this.winner(board, 'O')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      let bestMoveValue = -100;
      for (let i = 0; i < board.length; i++) {
        const newBoard = this.validMove(i, this.state.maxPlayer, board);
        if (newBoard) {
          const predictedMovieValue = this.minScore(newBoard);
          if (predictedMovieValue > bestMoveValue) {
            bestMoveValue = predictedMovieValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  gameLoop(move) {
    let player = this.state.turn;
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);

    if (this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }

    if (this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'Draw'
      });
    }

    player = 'O';
    currentGameBoard = this.validMove(this.findAIMove(currentGameBoard), player, currentGameBoard);

    if (this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }

    if (this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'Draw'
      });
    }

    this.setState({
      gameBoard: currentGameBoard
    });
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
      maxPlayer: 'X',
      minPlayer: 'O'
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
            gameLoop={this.gameLoop.bind(this)}
          />);
        })}
      </div>
    );
  }
}

export default App;
