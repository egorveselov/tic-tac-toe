import React from "react";
import "./App.css";
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

    const targetCellState = playerTurn === 0 ? CellState.X : CellState.O;
    fieldArray[x][y] = targetCellState;
    this.setState({ fieldArray: fieldArray, playerTurn: 1 - playerTurn });
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
