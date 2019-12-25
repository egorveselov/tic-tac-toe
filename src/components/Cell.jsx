import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CellState from "../enums/CellState";
import * as actions from "../actions/actions";
import "./Cell.scss";

function Cell(props) {
  const dispatch = useDispatch();
  const fieldArray = useSelector(state => state.paramsReducer.fieldArray);
  const whoseTurn = useSelector(state => state.paramsReducer.whoseTurn);
  const fieldSize = useSelector(state => state.paramsReducer.fieldSize);
  const chainLength = useSelector(state => state.paramsReducer.chainLength);
  const playerOne = useSelector(state => state.paramsReducer.playerOne);
  const playerTwo = useSelector(state => state.paramsReducer.playerTwo);
  const clickCounter = useSelector(state => state.paramsReducer.clickCounter);

  const setPlayerData = (name, win) => {
    let playerData = JSON.parse(localStorage.getItem(name));
    if (playerData === null) {
      playerData = { games: 0, wins: 0 };
      localStorage.setItem(name, JSON.stringify(playerData));
    }
    playerData.games += 1;
    playerData.wins += win;

    localStorage.setItem(name, JSON.stringify(playerData));
  };

  const checkLine = (x, y, symbol, type) => {
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

    while (x <= fieldSize - 1 && y <= fieldSize - 1) {
      isTrue &= fieldArray[x][y] === symbol;
      isTrue ? count++ : (count = 0);
      if (count === chainLength) {
        let text;
        if (playerOne.sign === whoseTurn) {
          text = playerOne.name;
          setPlayerData(playerOne.name, 1);
          setPlayerData(playerTwo.name, 0);
        } else {
          text = playerTwo.name;
          setPlayerData(playerOne.name, 0);
          setPlayerData(playerTwo.name, 1);
        }
        text = text + " is winner! Congrats!";
        dispatch(actions.changeResultsState(true, false, text));
        return true;
      }
      x += xSign;
      y += ySign;
      isTrue = 1;
    }
    return false;
  };

  const findEndPoints = (x, y, symbol) => {
    let currentX;
    let currentY;

    if (checkLine(x, 0, symbol, "horizontal")) {
      return;
    }
    if (checkLine(0, y, symbol, "vertical")) {
      return;
    }

    currentX = x;
    currentY = y;
    while (currentX !== 0 && currentY !== 0) {
      currentX--;
      currentY--;
    }
    if (checkLine(currentX, currentY, symbol, "lefttoright")) {
      return;
    }

    currentX = x;
    currentY = y;
    while (currentX !== 0 && currentY !== fieldSize - 1) {
      currentX--;
      currentY++;
    }
    if (checkLine(currentX, currentY, symbol, "righttoleft")) {
      return;
    }

    if (clickCounter === fieldSize ** 2) {
      setPlayerData(playerOne.name, 0);
      setPlayerData(playerTwo.name, 0);
      dispatch(actions.changeResultsState(true, true, "Draw!"));
    }
  };

  const onCellClick = (x, y) => {
    if (fieldArray[x][y] !== CellState.EMPTY) {
      return;
    }
    let nextTurn;
    if (whoseTurn === CellState.X) {
      fieldArray[x][y] = "images/cross.png";
      nextTurn = CellState.O;
    } else {
      fieldArray[x][y] = "images/circle.png";
      nextTurn = CellState.X;
    }

    dispatch(actions.changeWhoseTurn(nextTurn));
    dispatch(actions.changeCounterValue(clickCounter + 1));
    dispatch(actions.changeCellValue(fieldArray));
    findEndPoints(x, y, fieldArray[x][y]);
  };

  return (
    <div onClick={() => onCellClick(props.x, props.y)}>
      <img src={fieldArray[props.x][props.y]} alt="" />
    </div>
  );
}

export default Cell;
