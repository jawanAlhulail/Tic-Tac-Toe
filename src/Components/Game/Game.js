import React from "react";
import Border from "../Border/Board";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  restart = () => {
    this.setState({
      stepNumber: 0,
    });
  };
  onClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "🥕" : "🍅";
    this.setState({
      history: history.concat({ squares: squares }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner && winner !== "Draw") {
      status = "The winner is " + winner;
    } else if (winner && winner === "Draw") {
      status = "It's a " + winner;
    } else {
      status = "Next player is " + (this.state.xIsNext ? "Jzr" : "Tomato");
    }
    return (
      <div className="game">
        <span className="game-info">{status}</span>
        <div className="game-board">
          <Border onClick={(i) => this.onClick(i)} squares={current.squares} />
        </div>
        <button
          className="restart"
          onClick={() => {
            this.restart();
          }}
        >
          Restart
        </button>
      </div>
    );
  }
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    } else if (!squares.includes(null)) {
      return "Draw";
    }
  }
  return null;
}
export default Game;
