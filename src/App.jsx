import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Flex, Divider } from 'antd'
import { ReloadOutlined } from '@ant-design/icons';

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={ onSquareClick }
    >
      { value }
    </button>
  );
}

function Board({playerName, isX, xIsNext, squares, onPlay, handleWin}) {
  function handleClick(i) {
    if (!squares[i] && !calculateWinner(squares) && isX == xIsNext) {
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? "X" : "O";
      onPlay(nextSquares)
    }
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1>{ playerName }</h1>
      <h2>You are {isX ? 'X' : 'O'}</h2>
      <div className='status'>{ status }</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function GamesResults({ results, setResults, currentSquares }) {
  const indicators = results.map((game, game_num) => {
    return <h1 key={game_num}>{ game }</h1>;
  })
  return (
    <>
    <h1>Games Results</h1>
    <div className='scores'>
      {indicators}
    </div>
    </>
  );
}

export default function Game() {
  const location = useLocation();
  const { player1Name, player2Name } = location.state || {};

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 == 0;
  const currentSquares = history[currentMove];
  
  const [results, setResults] = useState([]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    let winner = calculateWinner(nextSquares)
    if (winner) {
      handleWin(winner == 'X' ? player1Name : player2Name)
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
  }

  function handleWin(winner) {
    setResults([...results, winner])
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <Button key={move} type="primary" onClick={() => jumpTo(move)}>{description}</Button>
    );
  });

  return (
    <>
    <div className='game'>
      <div className='game-board'>
        <Board playerName={player1Name} isX={true} xIsNext={ xIsNext } squares={ currentSquares } onPlay={ handlePlay } />
      </div>
      <div>
        <div className='game-info'>
          <Flex vertical gap="small">{ moves }</Flex>
          <Divider style={{  borderColor: '#000' }}></Divider>
          <Button className='restart' onClick={restart} shape='circle' icon={ <ReloadOutlined /> } type='primary' danger/>
        </div>
      </div>
      <div className='game-board'>
        <Board playerName={player2Name}  isX={false} xIsNext={ xIsNext } squares={ currentSquares } onPlay={ handlePlay } />
      </div>
    </div>
    <GamesResults results={ results } setResults={setResults} currentSquares={currentSquares}/>
    </>
  );
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}