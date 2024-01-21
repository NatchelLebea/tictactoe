import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const calculatedWinner = calculateWinner(newBoard);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };

  const renderBoxes = () => {
    return board.map((value, index) => (
      <div key={index} className="boxes" onClick={() => handleClick(index)}>
        {value === 'X' && <img src={cross_icon} alt="cross" />}
        {value === 'O' && <img src={circle_icon} alt="circle" />}
      </div>
    ));
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  return (
    <div className="container">
      <h1 className="title">
        {winner ? `Congratulations: Player ${winner} won!` : 'Tic Tac Toe Game In React'}
      </h1>
      <div className="board">
        <div className="row1">{renderBoxes().slice(0, 3)}</div>
        <div className="row2">{renderBoxes().slice(3, 6)}</div>
        <div className="row3">{renderBoxes().slice(6, 9)}</div>
      </div>
      <button className="reset" onClick={resetBoard}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;
