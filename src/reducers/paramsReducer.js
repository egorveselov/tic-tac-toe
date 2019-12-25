import * as types from "../actions/actionTypes";
import CellState from "../enums/CellState";

const initialState = {
  fieldArray: [["", "", ""], ["", "", ""], ["", "", ""]],
  whoseTurn: CellState.X,
  playerOne: {
    name: "",
    sign: ""
  },
  playerTwo: {
    name: "",
    sign: ""
  },
  clickCounter: 1,
}

const paramsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_GAME_PARAMS:
      return ({
        ...state,
        fieldArray: action.gameParams.fieldArray,
        fieldSize: action.gameParams.fieldSize,
        chainLength: action.gameParams.chainLength,
        playerOne: action.gameParams.playerOne,
        playerTwo: action.gameParams.playerTwo,
      });
    case types.CHANGE_CELL_VALUE:
      return ({
        ...state,
        fieldArray: action.value,
      });
    case types.CHANGE_WHOSE_TURN:
      return ({
        ...state,
        whoseTurn: action.whoseTurn,
      });
    case types.CHANGE_CLICK_COUNTER:
      return ({
        ...state,
        clickCounter: action.value,
      });
    default:
      return state;
  }
}

export default paramsReducer;