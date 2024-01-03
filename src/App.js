import { useState } from "react";

function App() {
  return (
    <div className="m-36">
      <Game> </Game>
    </div>
  );
}
function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moves, setMoves] = useState(0);
  const state = moves % 2 === 0;
  const currentSquares = history[moves];
  function Reset() {
    setHistory([Array(9).fill(null)]);
    setMoves(0);
  }
  function jumpToMove(i) {
    setMoves(i);
  }

  function handleClick(newSquares) {
    const nextHistory = [...history.slice(0, moves + 1), newSquares];
    setHistory(nextHistory);
    setMoves(moves + 1);
  }

  const moveObject = history.map((squares, move) => {
    let desc;
    if (move > 0) {
      desc = "Go to move #" + move;
    } else {
      desc = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpToMove(move)}>{desc}</button>
      </li>
    );
  });
  return (
    <div>
      <div>
        <Board
          state={state}
          squares={currentSquares}
          onPlay={handleClick}
          reset={Reset}
        ></Board>
      </div>
      <div>{moveObject}</div>
    </div>
  );
}
function Board({ state, squares, onPlay, reset }) {
  function HandleClick(i) {
    if (squares[i] || HandleWinnder(squares)) {
      return;
    }
    const newSquares = squares.slice();
    if (state) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares);
  }
  const winner = HandleWinnder(squares);
  let status;
  if (winner) {
    status = "winner is " + winner + "!";
  } else {
    status = "The turn is on: " + (state ? "X" : "0");
  }
  return (
    <>
      <p>{status}</p>
      <div>
        <Button val={squares[0]} handleClick={() => HandleClick(0)}></Button>
        <Button val={squares[1]} handleClick={() => HandleClick(1)}></Button>
        <Button val={squares[2]} handleClick={() => HandleClick(2)}></Button>
      </div>
      <div>
        <Button val={squares[3]} handleClick={() => HandleClick(3)}></Button>
        <Button val={squares[4]} handleClick={() => HandleClick(4)}></Button>
        <Button val={squares[5]} handleClick={() => HandleClick(5)}></Button>
      </div>
      <div>
        <Button val={squares[6]} handleClick={() => HandleClick(6)}></Button>
        <Button val={squares[7]} handleClick={() => HandleClick(7)}></Button>
        <Button val={squares[8]} handleClick={() => HandleClick(8)}></Button>
      </div>
      <button className="mt-8 border-red-300 border-2" onClick={reset}>
        Reset
      </button>
    </>
  );
}

function Button({ val, handleClick }) {
  return (
    <button
      className="w-8 h-8 border-red-700 border-2 border-collapse"
      onClick={handleClick}
    >
      {val}
    </button>
  );
}

function HandleWinnder(squares) {
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
    if (
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] != null
    ) {
      return squares[a];
    }
  }
  return null;
}

export default App;
