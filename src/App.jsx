import React from "react";
import "./App.scss";
import GameField from "./components/GameField";
import CellState from "./enums/CellState";

const DEFAULT_FIELD_SIZE = 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: 0,
      fieldSize: DEFAULT_FIELD_SIZE,
      fieldArray: this.createArray(DEFAULT_FIELD_SIZE)
    };

    this.onCellClick = this.onCellClick.bind(this);
    this.findEndPoints = this.findEndPoints.bind(this);
    this.checkLine = this.checkLine.bind(this);
  }

  createArray(fieldSize) {
    const valueArray = [];

    for (let i = 0; i < fieldSize; i++) {
      valueArray[i] = [];

      for (let j = 0; j < fieldSize; j++) {
        valueArray[i][j] = CellState.EMPTY;
      }
    }

    return valueArray;
  }

  onCellClick(x, y) {
    const { playerTurn, fieldArray } = this.state;

    if (fieldArray[x][y] !== CellState.EMPTY) {
      return;
    }

    const targetCellState = playerTurn === 0 ? CellState.X : CellState.O;
    fieldArray[x][y] = targetCellState;
    this.setState({ fieldArray: fieldArray, playerTurn: 1 - playerTurn });
    this.findEndPoints(x, y, fieldArray[x][y]);
  }

  findEndPoints(x, y, symbol) {
    let currentX;
    let currentY;

    const { fieldSize } = this.state;

    this.checkLine(x, 0, symbol, "horizontal");
    this.checkLine(0, y, symbol, "vertical");

    currentX = x;
    currentY = y;
    while (currentX !== 0 && currentY !== 0) {
      currentX--;
      currentY--;
    }
    this.checkLine(currentX, currentY, symbol, "lefttoright");

    currentX = x;
    currentY = y;
    while (currentX !== 0 && currentY !== fieldSize - 1) {
      currentX--;
      currentY++;
    }
    this.checkLine(currentX, currentY, symbol, "righttoleft");
  }

  checkLine(x, y, symbol, type) {
    let isTrue = 1;
    let count = 0;
    let xSign;
    let ySign;

    switch (type) {
      case "horizontal":
        xSign = 0;
        ySign = 1;
        break;
      case "vertical":
        xSign = 1;
        ySign = 0;
        break;
      case "lefttoright":
        xSign = 1;
        ySign = 1;
        break;
      case "righttoleft":
        xSign = 1;
        ySign = -1;
        break;
      default:
        break;
    }

    const { fieldSize, fieldArray, playerTurn } = this.state;

    while (x <= fieldSize - 1 && y <= fieldSize - 1) {
      isTrue &= fieldArray[x][y] === symbol;
      isTrue ? count++ : (count = 0);
      if (count === 3) {
        const targetCellState = playerTurn === 0 ? CellState.X : CellState.O;
        console.log("Player " + targetCellState + " is winner");
        return;
      }
      x += xSign;
      y += ySign;
      isTrue = 1;
    }
  }

  render() {
    const { fieldArray } = this.state;

    return (
      <>
        <GameField fieldArray={fieldArray} onCellClick={this.onCellClick} />
      </>
    );
  }
}

export default App;
