import React from "react";
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

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winnerRow: lines[i] };
    }
  }

  return { winner: null, winnerRow: null };
};

const getLocation = (move) => {
  const locationMap = {
    0: "row: 1, col: 1",
    1: "row: 1, col: 2",
    2: "row: 1, col: 3",
    3: "row: 2, col: 1",
    4: "row: 2, col: 2",
    5: "row: 2, col: 3",
    6: "row: 3, col: 1",
    7: "row: 3, col: 2",
    8: "row: 3, col: 3",
  };

  return locationMap[move];
};
export function useTicTac(): {
  handleClick: (i: number) => void;
  isTheWinnerBlock: (i: number) => boolean;
  currentStepNumber: number;
  current: any;
  winner: string;
  isDraw: boolean;
  reset: () => void;
} {
  const [History, setHisTory] = React.useState([
    {
      squares: Array(9).fill(null),
      currentLocation: null,
      stepNumber: 9,
    },
  ]);
  const [currentStepNumber, setCurrentStepNumber] = React.useState(0);
  const [xIsNext, setxIsNext] = React.useState<boolean>(true);
  const [winnerSquares, setwinnerSquares] = React.useState([]);
  const [winner, setwinners] = React.useState("");
  const [isDraw, setisDraw] = React.useState(false);

  console.log(History, winnerSquares);
  React.useEffect(() => {
    const winnerFind = () => {
      const history = History.slice(0, currentStepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const { winner, winnerRow } = calculateWinner(squares);
      setwinnerSquares(winnerRow);
      setwinners(winner);
      if (History.length == 10) {
        setisDraw(true);
      }
    };
    winnerFind();
  }, [History]);

  const handleClick = (i: number) => {
    const history = History.slice(0, currentStepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const { winner, winnerRow } = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHisTory(
      history.concat([
        {
          squares,
          currentLocation: getLocation(i),
          stepNumber: history.length,
        },
      ])
    );
    setCurrentStepNumber(History.length);
    setxIsNext(!xIsNext);
  };
  const isTheWinnerBlock = (i: number) => {
    return winnerSquares &&
      (winnerSquares[0] === i ||
        winnerSquares[1] === i ||
        winnerSquares[2] === i)
      ? true
      : false;
  };
  const reset = () => {
    setHisTory([
      {
        squares: Array(9).fill(null),
        currentLocation: null,
        stepNumber: 9,
      },
    ]);
    setCurrentStepNumber(0);
  };

  return {
    handleClick,
    currentStepNumber,
    isTheWinnerBlock,
    current: History[History.length - 1].squares,
    winner,
    isDraw,
    reset,
  };
}
