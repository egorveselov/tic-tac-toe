import * as types from "../actions/actionTypes";

const initialState = {
  showNewGame: true,
  showResults: {
    state: false,
    isDraw: false,
    text: ""
  }
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_NEWGAME_STATE:
      return ({
        ...state,
        showNewGame: action.state
      });
    case types.CHANGE_RESULTS_STATE:
      return ({
        ...state,
        showResults: action.states
      });
    default:
      return state;
  }
}

export default modalReducer;