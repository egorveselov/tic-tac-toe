import * as types from "./actionTypes";

export const resetTimers = () => {
  return ({
    type: types.RESET_TIMERS,
  })
}

export const changePlayerOneTime = (time) => {
  return ({
    type: types.CHANGE_PLAYER_ONE_TIME,
    time,
  })
}

export const changePlayerTwoTime = (time) => {
  return ({
    type: types.CHANGE_PLAYER_TWO_TIME,
    time,
  })
}

export const changeNewGameState = (state) => {
  return ({
    type: types.CHANGE_NEWGAME_STATE,
    state,
  });
}
export const changeResultsState = (state, isDraw, text) => {
  return ({
    type: types.CHANGE_RESULTS_STATE,
    states: {
      state: state,
      isDraw: isDraw,
      text: text
    },
  });
}

export const changeGameParams = (fieldArray, fieldSize, chainLength, playerOne, playerTwo) => {
  return ({
    type: types.CHANGE_GAME_PARAMS,
    gameParams: {
      fieldArray,
      fieldSize,
      chainLength,
      playerOne,
      playerTwo,
    },
  });
}

export const changeCounterValue = (value) => {
  return ({
    type: types.CHANGE_CLICK_COUNTER,
    value
  });
}

export const changeCellValue = (fieldArray) => {
  return ({
    type: types.CHANGE_CELL_VALUE,
    value: fieldArray,
  });
}

export const changeWhoseTurn = (value) => {
  return ({
    type: types.CHANGE_WHOSE_TURN,
    whoseTurn: value,
  });
}