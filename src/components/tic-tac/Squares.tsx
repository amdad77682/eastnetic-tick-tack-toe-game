import React from "react";
import "./square.scss";
import { useTicTac } from "./useTicTac";
const turns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const rows = [
  {
    value: 0,
    positionVertical: " top",
  },
  {
    value: 1,
    positionVertical: " center",
  },
  {
    value: 2,
    positionVertical: " bottom",
  },
];
const colums = [
  { value: 0, positionHorizontal: " left" },
  {
    value: 1,
    positionHorizontal: " middle",
  },
  {
    value: 2,
    positionHorizontal: " right",
  },
];
export default function Squares() {
  const { currentStepNumber, handleClick, isTheWinnerBlock } = useTicTac();
  const renderSquare = (block, row, col) => {
    console.log(block);

    let player = "1";
    if (block % 2 == 0) player = "2";
    return (
      <>
        <input
          key={block}
          className={`${
            isTheWinnerBlock(block) ? "winner" : "player-" + player
          }${col.positionHorizontal}${row.positionVertical} turn-${block}`}
          id={`block${block}-${row.value}-${col.value}`}
          type="radio"
          onClick={() => handleClick(block)}
        />
        <label
          className={`turn-${block}`}
          htmlFor={`block${block}-${row.value}-${col.value}`}
        ></label>
      </>
    );
  };

  const createBoard = (row, col) => {
    const board = [];
    let cellCounter = 0;

    for (let i = 0; i < row; i += 1) {
      for (let j = 0; j < col; j += 1) {
        board.push(renderSquare(cellCounter++, rows[i], colums[j]));
      }
    }

    return board;
  };
  return (
    <div>
      <div className="tic-tac-toe">{createBoard(3, 3)}</div>
    </div>
  );
}
