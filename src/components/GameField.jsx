import React from "react";
import { useSelector } from "react-redux";
import Cell from "./Cell";
import "./GameField.scss";

function GameField() {
  const fieldArray = useSelector(state => state.paramsReducer.fieldArray);

  const createElements = () => {
    const cellArray = [];

    for (let i = 0; i < fieldArray.length; i++) {
      const row = fieldArray[i];
      cellArray[i] = [];

      for (let j = 0; j < row.length; j++) {
        cellArray[i].push(
          <Cell key={i.toString() + j.toString()} x={i} y={j} />
        );
      }
    }
    return cellArray;
  };

  const changeSize = () => {
    const size = fieldArray.length;
    let cellSize;
    switch (parseInt(size)) {
      case 3:
        cellSize = 75;
        break;
      case 9:
        cellSize = 50;
        break;
      case 27:
        cellSize = 25;
        break;
      default:
        break;
    }

    return {
      display: "grid",
      gridTemplateRows: "repeat(" + size + "," + cellSize + "px)",
      gridTemplateColumns: "repeat(" + size + "," + cellSize + "px)",
      gridGap: "0.2vw",
      backgroundColor: "black",
      width: cellSize * size + "px"
    };
  };

  return (
    <div id="grid" style={changeSize()}>
      {createElements()}
    </div>
  );
}

export default GameField;
