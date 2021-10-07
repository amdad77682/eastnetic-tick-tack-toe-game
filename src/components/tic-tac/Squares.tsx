import React from "react";
import "./square.scss";
import { useTicTac } from "./useTicTac";
import { rows, colums } from "./helper";
import "styled-components/macro";

export default function Squares() {
  const {
    History,
    currentStepNumber,
    current,
    isDraw,
    winner,
    handleClick,
    isTheWinnerBlock,
  } = useTicTac();
  /**
   *
   * @param block current block number
   * @param row speciffied row propertery defined previously
   * @param col speciffied col propertery defined previously
   * @returns
   */
  const renderSquare = (block, row, col) => {
    return (
      <>
        <input
          disabled={Boolean(winner)}
          key={block}
          className={`${col.positionHorizontal}${row.positionVertical} turn-${block} `} //like left top position turn number-1
          id={`block${block}-${row.value}-${col.value}`} //like bolck1-0-1
          type="radio"
          onClick={() => handleClick(block)}
          css={`
            :checked + label {
              background-color: ${isTheWinnerBlock(block)
                ? "#047857"
                : current[block] === "O"
                ? "#ecaf4f"
                : "#dc685a"};
            }
          `}
        />
        <label
          className={`turn-${block} text-6xl font-extrabold`}
          htmlFor={`block${block}-${row.value}-${col.value}`} //like bolck1-0-1
          css={`
            &:after {
              content: ${current[block]};
              color: #fff;
              opacity: 1;
            }
          `}
        >
          {current[block]}
        </label>
      </>
    );
  };
  /**
   *
   * @param row 3
   * @param col 3
   * @returns
   */
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
  const renderAllmoves = () => {
    return History.map((step, move) => {
      const currentLocation = step.currentLocation
        ? `(${step.currentLocation})`
        : "";
      const desc = step.stepNumber ? `Go to move #${step.stepNumber}` : "";
      const classButton = move === currentStepNumber ? "text-green-600" : "";

      return (
        <li key={move}>
          <button
            className={`${classButton} button`}
            onClick={() => this.jumpTo(move)}
          >
            {`${desc} ${currentLocation}`}
          </button>
        </li>
      );
    });
  };
  return (
    <div>
      <div className="tic-tac-toe ">
        {/* 
          create 3*3  tic tac toe square board
         */}
        {createBoard(3, 3)}
        {/* 
          Make decition based on user turns and after finish the the game reset it
         */}
        <div
          css={`
            background: transparent;
            bottom: 5px;
            color: green;
            display: ${winner || isDraw ? "block" : "none"};
            left: 5px;
            padding-top: 55px;
            position: absolute;
            right: 5px;
            top: 5px;
            text-align: center;
            z-index: 11;
            @media (min-width: 450px) {
              padding-top: 110px;
            }
          `}
        >
          <h3
            css={`
              font-size: 30px;
              font-weight: 300;

              @media (min-width: 450px) {
                font-size: 40px;
              }
            `}
          >
            {isDraw && !winner ? "It is a tie!" : `Winner is ${winner}`}
          </h3>
          <button
            onClick={() => {
              window.location.reload();
            }}
            css={`
              background-color: #3d4250;
              border-radius: 4px;
              color: #fff;
              padding: 14px 45px;
              text-decoration: none;
              &:hover {
                background-color: #262934;
                cursor: pointer;
              }
            `}
          >
            Restart
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ol>{renderAllmoves()}</ol>
      </div>
    </div>
  );
}
