import React, { useEffect, useState } from "react";
import { randomInt } from "../randomNum";

import "./Board.css";

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

class Cell {
  constructor(row, col, value) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
}

const BOARD_SIZE = 10;

const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT",
};

const Board = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [foodCell, setFoodCell] = useState(48);
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(new LinkedListNode(new Cell(4, 3, 44)));
  const [direction, setDireaction] = useState(Direction.RIGHT);

  useEffect(() => {
    setInterval(() => {
      //
      //
      //
      //
    }, 1000);

    window.addEventListener("keydown", (e) => {
      const newDirection = getDirectionFromKey(e.key);
      const isValidDirection = newDirection !== "";
      if (isValidDirection) setDireaction(newDirection);
    });
  }, []);

  function moveSnake() {
    const currentHeadCoords = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };

    const nextHeadCoords = getNextHeadCoords(currentHeadCoords, direction);
    const nextHeadValue = board[nextHeadCoords.row][nextHeadCoords.col];

    if (nextHeadValue === foodCell) handeFoodConsumption();

    const newHead = new LinkedListNode(
      new Cell(nextHeadCoords.row, nextHeadCoords.col, nextHeadValue)
    );

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail.value.value);
    newSnakeCells.add(nextHeadValue);

    snake.head = newHead;
    snake.tail = snake.tail.next;
    if (snake.tail === null) snake.tail = snake.head;

    setSnakeCells(newSnakeCells);
  }

  const getNextHeadCoords = (currentHeadCoords, direction) => {
    if (direction === Direction.UP) {
      return {
        row: currentHeadCoords.row - 1,
        col: currentHeadCoords.col,
      };
    }
    if (direction === Direction.RIGHT) {
      return {
        row: currentHeadCoords.row,
        col: currentHeadCoords.col + 1,
      };
    }
    if (direction === Direction.DOWN) {
      return {
        row: currentHeadCoords.row + 1,
        col: currentHeadCoords.col,
      };
    }
    if (direction === Direction.LEFT) {
      return {
        row: currentHeadCoords.row,
        col: currentHeadCoords.col - 1,
      };
    }
  };

  const handeFoodConsumption = () => {
    const maxPossibleCellValue = BOARD_SIZE * BOARD_SIZE;
    let nextFoodCell;
    while (true) {
      nextFoodCell = randomInt(1, maxPossibleCellValue);
      if (snakeCells.has(nextFoodCell) || foodCell === nextFoodCell) continue;
      break;
    }

    setFoodCell(nextFoodCell);
  };

  return (
    <>
      <button onClick={() => moveSnake()}>Move Manually</button>
      <div className="board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => (
              <div
                key={cellIdx}
                className={`cell ${
                  snakeCells.has(cellValue) ? "snake-cell" : ""
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

const createBoard = (BOARD_SIZE) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

const getDirectionFromKey = (key) => {
  if (key === "ArrowUp") return Direction.UP;
  if (key === "ArrowRight") return Direction.Right;
  if (key === "ArrowDown") return Direction.Down;
  if (key === "ArrowLeft") return Direction.Left;
  return "";
};

export default Board;
