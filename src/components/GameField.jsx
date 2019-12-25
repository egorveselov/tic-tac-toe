import React from "react";
import { useSelector } from "react-redux";
import Cell from "./Cell";
import "./GameField.scss";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

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
    let gap;
    let cellSize;
    switch (parseInt(size)) {
      case 3:
        cellSize = 250;
        break;
      case 9:
        cellSize = 85;
        break;
      case 27:
        cellSize = 28;
        break;
      default:
        break;
    }

    gap = cellSize === 28 ? 1 : 4;

    return {
      display: "grid",
      gridTemplateRows: "repeat(" + size + "," + cellSize + "px)",
      gridTemplateColumns: "repeat(" + size + "," + cellSize + "px)",
      gridGap: gap + "px",
      backgroundColor: "red",
      width: (size - 1) * gap + cellSize * size + "px"
    };
  };

  return (
    <Paper elevation={3}>
      <Box id="grid" style={changeSize()}>
        {createElements()}
      </Box>
    </Paper>
  );
}

export default GameField;
