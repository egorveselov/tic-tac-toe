import * as types from "../actions/actionTypes";
const initialState = {
  totalTime: {
    playerOne: 0,
    playerTwo: 0
  },
};

const timeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_PLAYER_TWO_TIME:
      return ({
        totalTime: {
          ...state.totalTime,
          playerTwo: action.time
        }
      })
    case types.CHANGE_PLAYER_ONE_TIME:
      return ({
        totalTime: {
          ...state.totalTime,
          playerOne: action.time
        }
      })
    case types.RESET_TIMERS:
      return ({
        ...initialState
      })
    default:
      return state;
  }
}

export default timeReducer;