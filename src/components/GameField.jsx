import React from "react";
import PropTypes from "prop-types";
import "./GameField.scss";

import Cell from "./Cell";

class GameField extends React.Component {
  createElements() {
    const { fieldArray, onCellClick } = this.props;

    const cellArray = [];

    for (let i = 0; i < fieldArray.length; i++) {
      const row = fieldArray[i];
      cellArray[i] = [];

      for (let j = 0; j < row.length; j++) {
        cellArray[i].push(
          <Cell
            x={i}
            y={j}
            changeCellValue={onCellClick}
            value={fieldArray[i][j]}
          />
        );
      }
    }

    return cellArray;
  }

  render() {
    return <div id="grid">{this.createElements()}</div>;
  }
}

GameField.propTypes = {
  fieldArray: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default GameField;
