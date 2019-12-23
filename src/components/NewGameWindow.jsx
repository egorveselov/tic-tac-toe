import React from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../actions/actions";
import CellState from "../enums/CellState";

Modal.setAppElement("#root");

function NewGameWindow() {
  const dispatch = useDispatch();
  const showNewGame = useSelector(state => state.modalReducer.showNewGame);

  let fieldSize = 3;
  let chainLength = 3;
  let playerOneName = "";
  let playerTwoName = "";

  const handleChange = event => {
    const target = event.target;
    switch (target.name) {
      case "fieldSize":
        fieldSize = target.value;
        break;
      case "chainLength":
        chainLength = target.value;
        break;
      case "playerOneName":
        playerOneName = target.value;
        break;
      case "playerTwoName":
        playerTwoName = target.value;
        break;
      default:
        break;
    }
  };

  const createArray = fieldSize => {
    const valueArray = [];
    for (let i = 0; i < fieldSize; i++) {
      valueArray[i] = [];
      for (let j = 0; j < fieldSize; j++) {
        valueArray[i][j] = CellState.EMPTY;
      }
    }
    return valueArray;
  };

  const startNewGame = () => {
    if (!checkParams()) {
      return;
    }

    let info = whoStarts();

    dispatch(actions.changeWhoseTurn(CellState.X));
    dispatch(actions.changeCounterValue(1));
    dispatch(actions.resetTimers());
    dispatch(
      actions.changeGameParams(
        createArray(fieldSize),
        fieldSize,
        chainLength,
        { name: playerOneName, sign: info[0] },
        { name: playerTwoName, sign: info[1] },
        1
      )
    );
    dispatch(actions.changeNewGameState(false));
  };

  const checkParams = () => {
    const result =
      fieldSize >= chainLength
        ? playerOneName !== ""
          ? playerTwoName !== ""
            ? true
            : false
          : false
        : false;
    return result;
  };

  const whoStarts = () => {
    let whoFirst = Math.round(Math.random());
    let info = [];
    whoFirst === 0
      ? (info = [CellState.O, CellState.X])
      : (info = [CellState.X, CellState.O]);
    return info;
  };

  return (
    <Modal isOpen={showNewGame}>
      <div>
        <h1>Game parameters</h1>
        <h3>Choose field size:</h3>
        <select name="fieldSize" onChange={handleChange}>
          <option value="3">3x3</option>
          <option value="9">9x9</option>
          <option value="27">27x27</option>
        </select>
        <div>Choose length of chain</div>
        <select name="chainLength" onChange={handleChange}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div>Enter name of first player</div>
        <input name="playerOneName" type="text" onChange={handleChange} />
        <div>Enter name of second player</div>
        <input name="playerTwoName" type="text" onChange={handleChange} />
        <button onClick={startNewGame}>Start </button>
        <button onClick={() => dispatch(actions.changeNewGameState(false))}>
          Cancel{" "}
        </button>
      </div>
    </Modal>
  );
}

export default NewGameWindow;
